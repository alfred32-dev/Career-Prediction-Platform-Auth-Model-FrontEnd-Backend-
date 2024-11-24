from flask import Blueprint, jsonify, request
import requests

adzuna = Blueprint('adzuna', __name__)

API_ID = 'a82ea61b'
API_KEY = '3a29dd0904da17f39871902ec3617911'
API_URL = 'https://api.adzuna.com/v1/api/jobs'

# Get job listings for the given location, keywords, country, and page
@adzuna.route('/jobs', methods=['GET'])
def get_jobs():
    location = request.args.get('location', 'london')  # Default location is London
    keywords = request.args.get('keywords', 'python')  # Default keywords are Python
    country = request.args.get('country', 'gb')  # Default country is the UK
    page = request.args.get('page', 1)  # Default page is 1
    results_per_page = request.args.get('results_per_page', 5)  # Default results per page is 5

    response = requests.get(
        f'{API_URL}/{country}/search/{page}',
        params={
            'app_id': API_ID,  # Adzuna API ID
            'app_key': API_KEY,  # Adzuna API key
            'what': keywords,  # Keywords used for job search
            'where': location,  # Location used for job search
            'results_per_page': results_per_page,  # Number of results to return
            'content-type': 'application/json'  # Content type of the response
        }
    )

    if response.status_code == 200:
        return jsonify(response.json().get('results', []))  # Return the job listings
    else:
        return jsonify({'error': 'Failed to fetch jobs'}), response.status_code  # Return an error message and the status code

