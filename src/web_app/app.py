from flask import Flask, render_template, request, jsonify, Response, stream_with_context
import subprocess
import json
import os
import traceback
import time

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("accueil.html")

@app.route("/analyse")
def analyse():
    return render_template("analyse.html")

@app.route("/compte")
def compte():
    return render_template("compte.html")

@app.route("/a-propos")
def apropos():
    return render_template("a-propos.html")

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'Aucun fichier téléchargé'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Aucun fichier sélectionné'}), 400

    if file:
        # Sauvegarde temporaire du fichier
        temp_path = os.path.join('data', file.filename)
        file.save(temp_path)

        return jsonify({'status': 'processing', 'temp_path': temp_path})

@app.route('/process/<path:temp_path>')
def process(temp_path):
    def generate():
        try:
            # Obtenir le chemin absolu du projet
            project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))

            # Utiliser le chemin absolu pour appeler le script
            script_path = os.path.join(project_root, 'src', 'models', 'predict.py')

            # Appeler le script Python et capturer les logs
            process = subprocess.Popen(['python', script_path, temp_path],
                                        stdout=subprocess.PIPE,
                                        stderr=subprocess.PIPE,
                                        text=True)

            while True:
                output = process.stdout.readline()
                if output == '' and process.poll() is not None:
                    break
                if output:
                    yield f"data: {output}\n\n"

            # Vérifier le code de retour
            return_code = process.poll()
            if return_code != 0:
                error = process.stderr.read()
                yield f"data: Erreur lors du traitement: {error}\n\n"
            else:
                # Lire le résultat final
                with open(temp_path + '.result', 'r') as f:
                    result = f.read()
                yield f"data: {result}\n\n"

        except Exception as e:
            traceback.print_exc()
            yield f"data: Erreur: {str(e)}\n\n"

    return Response(stream_with_context(generate()), mimetype='text/event-stream')

if __name__ == "__main__":
    app.run(debug=True, threaded=True)
