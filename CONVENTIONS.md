# Conventions ASTRA-FC

---

## 1. Conventions de nommage

### C/C++
| Élément          | Convention          | Exemple                     |
|------------------|---------------------|-----------------------------|
| Variables        | `snake_case`        | `max_value`                 |
| Constantes       | `UPPER_SNAKE_CASE`  | `MAX_CONNECTIONS`           |
| Fonctions        | `snake_case`        | `calculate_average()`       |
| Structures       | `snake_case`        | `struct student_record`     |
| Typedefs         | `PascalCase`        | `typedef struct ... StudentRecord;` |
| Classes          | `PascalCase`        | `class DataProcessor`       |
| Fichiers         | `snake_case`        | `data_processor.c`          |
| Namespaces       | `PascalCase`        | `namespace DataProcessing`  |

### Python
| Élément          | Convention          | Exemple                     |
|------------------|---------------------|-----------------------------|
| Variables        | `snake_case`        | `user_name`                 |
| Constantes       | `UPPER_SNAKE_CASE`  | `MAX_RETRIES`               |
| Fonctions        | `snake_case`        | `def get_user_data()`       |
| Classes          | `PascalCase`        | `class UserProfile`         |
| Fichiers         | `snake_case`        | `user_profile.py`           |
| Modules          | `snake_case`        | `import data_processing`    |

### JavaScript/TypeScript
| Élément          | Convention          | Exemple                     |
|------------------|---------------------|-----------------------------|
| Variables        | `camelCase`         | `userName`                  |
| Constantes       | `UPPER_SNAKE_CASE`  | `MAX_USERS`                 |
| Fonctions        | `camelCase`         | `function getUserData()`    |
| Classes          | `PascalCase`        | `class UserManager`          |
| Fichiers         | `kebab-case`        | `user-manager.js`           |

---

## 2. Conventions d'indentation et de style

### Indentation
- Utiliser des **tabulations** configurées pour **4 espaces**.

### Accolades
- Style "Allman" (accolades à la ligne) :
  ```c
  if (condition)
  {
      statement;
  }
  ```

### Fichiers de configuration
#### `.editorconfig`
```ini
root = true

[*]
indent_style = tab
indent_size = 4
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

#### `.vscode/settings.json`
```json
{
  "editor.tabSize": 4,
  "editor.insertSpaces": false,
  "editor.detectIndentation": false
}
```

---

## 3. Structure d'une librairie

### Fichiers obligatoires
```
library-name/
├── src/
│   ├── library_name.h
│   └── library_name.c
├── include/
├── tests/
│   └── test_library_name.c
├── docs/
│   └── README.md
├── CMakeLists.txt
├── README.md
└── LICENSE
```

### Fonctions obligatoires dans une librairie
- `library_init()` : Initialise les ressources.
- `library_cleanup()` : Libère les ressources.
- `library_get_version()` : Retourne la version sous forme de chaîne.
- `library_get_last_error()` : Retourne le dernier code d'erreur.

---

## 4. Structure d'un fichier de code

### Fichiers C/C++
```c
// =============================================
// Fichier : library_name.c
// Description : Implémentation de la librairie.
// Auteur : [Nom]
// Date : [Date]
// =============================================

#include "library_name.h"
#include <stdlib.h>

// =============================================
// Définitions de types et constantes
// =============================================
#define MAX_BUFFER_SIZE 1024

// =============================================
// Variables globales (si nécessaire)
// =============================================
static int global_counter = 0;

// =============================================
// Fonctions privées
// =============================================
static void private_function()
{
    // Implémentation
}

// =============================================
// Fonctions publiques
// =============================================
void public_function()
{
    // Implémentation
}
```

### Fichiers Python
```python
#!/usr/bin/env python3
# =============================================
# Fichier : library_name.py
# Description : Implémentation de la librairie.
# Auteur : [Nom]
# Date : [Date]
# =============================================

# =============================================
# Imports
# =============================================
import os

# =============================================
# Constantes
# =============================================
MAX_BUFFER_SIZE = 1024

# =============================================
# Fonctions privées
# =============================================
def _private_function():
    """Description de la fonction privée."""
    pass

# =============================================
# Fonctions publiques
# =============================================
def public_function():
    """Description de la fonction publique."""
    pass
```

---

## 5. Conventions pour les tests unitaires

- **Structure** :
  - Dossier `/tests` à la racine.
  - Un fichier de test par fichier source (ex. : `test_library_name.c`).

- **Contenu minimal** :
  - Tests pour chaque fonction.
  - Tests de bordures (valeurs nulles, limites).

---

## 6. Conventions pour la documentation

### README.md
```
# Nom de la Librairie/Projet

## Description
[Description claire et concise.]

## Installation
### Dépendances
- Liste des dépendances (ex. : `libssl-dev`, `Python 3.8+`).
- Commandes d'installation :
  ``bash
  sudo apt-get install libssl-dev
  pip install -r requirements.txt
  ``

## Exemples d'utilisation
``c
#include "library_name.h"

int main() {
    library_init();
    // Exemple d'utilisation
    library_cleanup();
    return 0;
}
``

## Documentation technique
- [Lien vers la documentation générée]
```

---

## 7. Convention de langue

- **Anglais uniquement** pour :
  - Code (noms de variables, fonctions, commentaires).
  - Documentation (`README.md`, commentaires, issues).

---

## 8. Conventions de commits et de gestion de version

### Messages de commit (Conventional Commits)
1. **Description** :
   - Utilisez l'**impératif présent** (ex. : "add" au lieu de "added").
   - Gardez la description **courte et claire** (max. 72 caractères pour la première ligne).

2. **Scope** :
   - Le scope est **optionnel** mais recommandé pour les projets complexes.
   - Exemples : `api`, `parser`, `ui`, `config`.

3. **Corps du commit** :
   - Utilisez-le pour expliquer **le pourquoi** et **le comment** si nécessaire.

4. **Les types**

| Type     | Description                                      |
|----------|--------------------------------------------------|
| `feat`   | Ajout d'une nouvelle fonctionnalité.             |
| `fix`    | Correction d'un bug.                             |
| `docs`   | Modification de la documentation.                |
| `style`  | Changements de style (indentation, formatage).   |
| `refactor` | Refactorisation du code.                        |
| `test`   | Ajout ou modification de tests.                  |
| `chore`  | Tâches de maintenance.                           |

### Branches
- **Noms** :
  - `feature/nom-de-la-fonctionnalite` (ex. : `feature/add-csv-parser`).
  - `fix/nom-du-bug` (ex. : `fix/memory-leak`).
- **Branche principale** : `main` (protégée, revues de code obligatoires).

### Versionnage
- **Tags Git** : `vMAJOR.MINOR.PATCH` (ex. : `v1.0.0`).
- **Releases GitHub** : Notes de version en anglais.

---

## 9. Convention de sécurité

- **Secrets** :
  - **Jamais** dans le code ou les fichiers de configuration.
  - Utiliser `.env` (exclu via `.gitignore`) ou **GitHub Secrets**.

- **Exemple de `.gitignore`** :
  ```
  # Secrets
  .env
  *.pem
  ```

---

## 10. Conventions pour les projets collaboratifs

### Modèle de Pull Request
```markdown
## Description
[Expliquer le but de la PR et les changements apportés.]

## Changements
- Ajout de la fonctionnalité X.
- Correction du bug Y.

## Tests
[Décrivez les tests effectués.]
```

### Modèle d'Issue
```markdown
## Description
[Décrivez le bug ou la fonctionnalité demandée.]

## Étapes pour reproduire (si bug)
1. ...
2. ...

## Contexte
[Pourquoi cette issue est importante.]
```

### Modèle de DECISIONS.md
```markdown
# Décisions Techniques

## [Date] - [Titre de la décision]
### Contexte
[Expliquer le problème ou le besoin.]

### Options envisagées
1. Option A : [Description]
2. Option B : [Description]

### Décision
[Option choisie et justification.]

### Conséquences
[Impact sur le projet.]
```
