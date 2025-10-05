import sys
import pandas as pd
import numpy as np
from sklearn.model_selection import KFold, cross_val_predict, GridSearchCV
from sklearn.ensemble import AdaBoostClassifier, RandomForestClassifier, StackingClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, accuracy_score, recall_score, precision_score, f1_score
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
import json
import traceback

def log(message):
    print(json.dumps({'log': message}))
    sys.stdout.flush()

def load_and_prepare_data(csv_file):
    try:
        log("Chargement et préparation des données...")
        df = pd.read_csv(csv_file, comment='#', header=0)
        if 'koi_disposition' not in df.columns:
            raise ValueError("La colonne 'koi_disposition' est manquante dans le fichier CSV.")

        df = df[df['koi_disposition'].isin(['CONFIRMED', 'CANDIDATE'])]
        df['koi_disposition'] = df['koi_disposition'].map({'CONFIRMED': 0, 'CANDIDATE': 1}).astype(float)

        log("Filtres appliqués et données préparées.")

        dropped_cols = ['koi_disposition', 'kepid', 'kepoi_name', 'kepler_name', 'koi_pdisposition', 'koi_tce_delivname']
        features = df.drop(dropped_cols, axis=1, errors='ignore')

        X = features.select_dtypes(include=[np.number])
        columns_with_all_nan = X.columns[X.isna().all()].tolist()
        X = X.drop(columns=columns_with_all_nan, errors='ignore')

        log("Colonnes non numériques et NaN supprimées.")

        imputer = SimpleImputer(strategy='mean')
        scaler = StandardScaler()
        X = pd.DataFrame(imputer.fit_transform(X), columns=X.columns)
        X = pd.DataFrame(scaler.fit_transform(X), columns=X.columns)

        log("Imputation et normalisation des données terminées.")

        y = df['koi_disposition']

        return X, y
    except Exception as e:
        traceback.print_exc()
        log(f"Erreur lors du chargement et de la préparation des données: {str(e)}")
        raise Exception(f"Erreur lors du chargement et de la préparation des données: {str(e)}")

def evaluate_model(model, X, y, params_initial, params_tuned=None, model_name=None):
    try:
        log(f"Évaluation du modèle {model_name}...")
        cv = KFold(n_splits=5, shuffle=True, random_state=42)
        y_pred_initial = cross_val_predict(model.set_params(**params_initial), X, y, cv=cv)
        cm_initial = confusion_matrix(y, y_pred_initial)
        metrics_initial = {
            'accuracy': accuracy_score(y, y_pred_initial),
            'sensitivity': recall_score(y, y_pred_initial),
            'specificity': recall_score(y, y_pred_initial, pos_label=0),
            'precision': precision_score(y, y_pred_initial),
            'f1': f1_score(y, y_pred_initial),
            'confusion_matrix': cm_initial.tolist()
        }

        log(f"Modèle {model_name} évalué avec les paramètres initiaux.")

        metrics_tuned = None
        if params_tuned:
            log(f"Optimisation des hyperparamètres pour le modèle {model_name}...")
            grid_search = GridSearchCV(model, params_tuned, cv=3, scoring='accuracy')
            grid_search.fit(X, y)
            best_model = grid_search.best_estimator_
            y_pred_tuned = cross_val_predict(best_model, X, y, cv=cv)
            cm_tuned = confusion_matrix(y, y_pred_tuned)
            metrics_tuned = {
                'accuracy': accuracy_score(y, y_pred_tuned),
                'sensitivity': recall_score(y, y_pred_tuned),
                'specificity': recall_score(y, y_pred_tuned, pos_label=0),
                'precision': precision_score(y, y_pred_tuned),
                'f1': f1_score(y, y_pred_tuned),
                'confusion_matrix': cm_tuned.tolist(),
                'best_params': grid_search.best_params_
            }
            log(f"Modèle {model_name} optimisé avec les meilleurs paramètres: {grid_search.best_params_}.")

        return metrics_initial, metrics_tuned
    except Exception as e:
        traceback.print_exc()
        log(f"Erreur lors de l'évaluation du modèle {model_name}: {str(e)}")
        raise Exception(f"Erreur lors de l'évaluation du modèle: {str(e)}")

def predict(csv_file):
    try:
        log("Début du traitement des données...")
        X, y = load_and_prepare_data(csv_file)

        models = {
            'AdaBoost': (
                AdaBoostClassifier(random_state=42),
                {'n_estimators': 50, 'learning_rate': 1.0},
                {'n_estimators': [50, 100, 500], 'learning_rate': [1.0, 0.5, 0.1]}
            ),
            'RandomForest': (
                RandomForestClassifier(random_state=42),
                {'n_estimators': 100},
                {'n_estimators': [100, 600], 'max_features': ['sqrt'], 'criterion': ['entropy']}
            ),
            'Stacking': (
                StackingClassifier(
                    estimators=[
                        ('rf', RandomForestClassifier()),
                        ('gb', GradientBoostingClassifier())
                    ],
                    final_estimator=LogisticRegression(max_iter=1000),
                    cv=3,
                    passthrough=True
                ),
                {'rf__n_estimators': 100, 'gb__n_estimators': 100},
                {'rf__n_estimators': [100, 160], 'gb__n_estimators': [100, 160], 'gb__learning_rate': [0.1, 0.5]}
            )
        }

        results = {}
        for name, (model, params_init, params_tuned) in models.items():
            try:
                initial, tuned = evaluate_model(model, X, y, params_init, params_tuned, name)
                results[name] = {'initial': initial, 'tuned': tuned}
            except Exception as e:
                traceback.print_exc()
                results[name] = {'error': str(e)}

        log("Traitement terminé avec succès.")

        # Sauvegarder les résultats dans un fichier
        result_file = csv_file + '.result'
        with open(result_file, 'w') as f:
            json.dump(results, f)

        return results
    except Exception as e:
        traceback.print_exc()
        log(f"Erreur lors de la prédiction: {str(e)}")
        raise Exception(f"Erreur lors de la prédiction: {str(e)}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({'error': 'Usage: python predict.py <csv_file>'}))
        sys.exit(1)

    csv_file = sys.argv[1]
    try:
        results = predict(csv_file)
        print(json.dumps(results))
    except Exception as e:
        print(json.dumps({'error': str(e)}))
