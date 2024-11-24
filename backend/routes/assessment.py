# This file contains API endpoints for the Career Advicer Assessment feature.

# Import dependencies
from flask import Blueprint, request, jsonify
import numpy as np
import logging
import tensorflow as tf

# Create blueprint
assessment = Blueprint('assessment', __name__)
logger = logging.getLogger('assessment_api')

# Load the .keras model
model = tf.keras.models.load_model('/home/alfred/Desktop/Career Prediction Platform/model_data/final_model.keras')

# Define career categories
career_categories = [
    "Business and Financial Operations",
    "Arts, Design, Entertainment, Sports, and Media",
    "Computer and Mathematical",
    "Healthcare Practitioners and Technical",
    "Educational Instruction and Library",
    "Production",
    "Legal",
    "Management",
    "Sales and Related",
    "Architecture and Engineering",
    "Farming, Fishing, and Forestry",
    "Life, Physical, and Social Science",
    "Military Specific",
    "Transportation and Material Moving",
    "Installation, Maintenance, and Repair",
    "Personal Care and Service",
    "Protective Service",
    "Food Preparation and Serving Related",
    "Office and Administrative Support",
    "Construction and Extraction",
    "Building and Grounds Cleaning and Maintenance",
    "Community and Social Service",
    "Healthcare Support"
]

# API endpoint to predict the top 3 career categories for a user
@assessment.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data
        data = request.get_json()
        if data is None:
            return jsonify({"message": "Invalid JSON data"}), 400

        # Convert data into model input format
        model_input = np.array([[
            data.get('Selective_Attention', 0),
            data.get('Monitoring', 0),
            data.get('Medicine_and_Dentistry', 0),
            data.get('Time_Sharing', 0),
            data.get('Biology', 0),
            data.get('Economics_and_Accounting', 0),
            data.get('Active_Listening', 0),
            data.get('Extent_Flexibility', 0),
            data.get('Psychology', 0),
            data.get('Fluency_of_Ideas', 0),
            data.get('Mathematics', 0),
            data.get('Computers_and_Electronics', 0),
            data.get('Stamina', 0),
            data.get('Static_Strength', 0),
            data.get('English_Language', 0),
            data.get('Chemistry', 0),
            data.get('Memorization', 0),
            data.get('Telecommunications', 0),
            data.get('Foreign_Language', 0),
            data.get('Mathematical_Reasoning', 0),
            data.get('Geography', 0),
            data.get('Design', 0),
            data.get('Active_Learning', 0),
            data.get('Critical_Thinking', 0),
            data.get('Oral_Expression', 0),
            data.get('Law_and_Government', 0),
            data.get('Physics', 0)
        ]])

        # Perform prediction
        predictions = model.predict(model_input)[0]

        # Get the indices of the top 3 career categories
        top_3_indices = np.argsort(predictions)[-3:][::-1]
        top_3_careers = [career_categories[i] for i in top_3_indices]

        return jsonify({"careers": top_3_careers})

    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}")
        return jsonify({"message": "Internal server error"}), 500

