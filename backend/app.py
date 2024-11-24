from flask import Flask
from flask_cors import CORS
from utils.logging_config import setup_logging
from routes.adzuna import adzuna

from routes.assessment import assessment

app = Flask(__name__)
CORS(app)

# Initialize database, security, and JWT
logger = setup_logging()

# Register blueprints
app.register_blueprint(adzuna, url_prefix='/api')
app.register_blueprint(assessment, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True, port=5500)
