# Orbium-Detectio-A-World-Away-Hunting-for-Exoplanets-with-AI
Project for the NASA Space App Challenge: Automated detection of exoplanets from transit data (Kepler, K2, TESS). This repository contains an AI/ML model for classifying exoplanets and a web interface for interacting with the data. The goal is to make analysis easier for both researchers and beginners.

---

## Features

### Main Features

* **CSV File Upload**: Upload new transit data.
* **Real-Time Analysis**: Instant predictions via the trained model.
* **Result Visualization**: Charts (confusion matrix, precision curves) and statistics.

### Advanced Features

* **Model Update**: Retrain with new data.
* **Hyperparameter Tuning**: Adjust model parameters for advanced users.
* **Export Results**: Download predictions in CSV or PDF format.

---

## Installation

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone <HTTP or SSH link to repository>
   cd nasa-space-app-exoplanets
   ```

2. **Create a Python virtual environment (recommended):**
   Using 'venv' as the environment name:

   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**

   * On **Linux/MacOS**:

     ```bash
     source venv/bin/activate
     ```
   * On **Windows**:

     ```bash
     venv\Scripts\activate
     ```

4. **Install Python dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

---

## Usage

### Launch the backend (Flask)

1. Go to the backend folder:

   ```bash
   cd src/web_app
   ```

2. Launch the Flask application:

   ```bash
   python app.py
   ```

   * The application will be accessible at [http://127.0.0.1:5000](http://127.0.0.1:5000).

---

## Project Structure

```
nasa-space-app-exoplanets/
├── data/                  # Datasets from Kepler, K2, and TESS missions
├── notebooks/             # Jupyter notebooks for exploration and development
├── src/
│   ├── models/            # AI/ML models
│   └── web_app/           # Web interface (Flask)
├── docs/                  # Project documentation
├── tests/                 # Unit and integration tests
├── .gitignore             # Files ignored by Git
├── CONVENTIONS.md         # Project writing conventions
├── LICENSE                # Project license (MIT)
├── README.md              # General instructions
└── requirements.txt       # Required libraries
```

---

## License

This project is licensed under **MIT**. See the [LICENSE](LICENSE) file for more details.

---

## **?** FAQ

### How do I create a Python environment?

To isolate your project dependencies, it is recommended to create a virtual environment:

```bash
python -m venv environment_name
```

### How do I activate or deactivate a Python environment?

* **Activate**:

  * On **Linux/MacOS**:

    ```bash
    source environment_name/bin/activate
    ```
  * On **Windows**:

    ```bash
    environment_name\Scripts\activate
    ```
* **Deactivate**:

  ```bash
  deactivate
  ```

### How do I install Python dependencies?

Once the environment is activated, install dependencies with:

```bash
pip install -r requirements.txt
```

### How do I run the tests?

To run unit tests:

```bash
cd tests
pytest
```

### How do I launch the web application?

* Go to the root of the repository
* Activate the virtual environment

```
source venv/bin/activate
```

(for Linux, otherwise see above)

* Run the following command

```
python src/web_app/app.py
```

* Open the URL: [http://127.0.0.1:5000](http://127.0.0.1:5000)

### How do I contribute to the project?

1. Fork the repository.
2. Create a branch for your feature.
3. Make your changes and commit them.
4. Push the branch to your fork.
5. Open a Pull Request to the main repository.

See more details in CONVENTIONS.md

### How do I resolve common errors?

* **Error: ModuleNotFoundError**: Make sure the virtual environment is activated and dependencies are installed.
* **Error: Port already in use**: Change the port in `app.py` or stop the process using the port.
* **Error: Invalid CSV file**: Check that the file is in CSV format and contains the expected columns.

