from flask import Blueprint, jsonify, request
import requests

adzuna = Blueprint('adzuna', __name__)

API_ID = 'a82ea61b'
API_KEY = '3a29dd0904da17f39871902ec3617911'
API_URL = 'https://api.adzuna.com/v1/api/jobs'

@adzuna.route('/jobs', methods=['GET'])
def get_jobs():
    location = request.args.get('location', 'london')
    keywords = request.args.get('keywords', 'python')  # Get keywords from the query string
    country = request.args.get('country', 'gb')
    page = request.args.get('page', 1)
    results_per_page = request.args.get('results_per_page', 5)

    response = requests.get(
        f'{API_URL}/{country}/search/{page}',
        params={
            'app_id': API_ID,
            'app_key': API_KEY,
            'what': keywords,  # Keywords used for job search
            'where': location,
            'results_per_page': results_per_page,
            'content-type': 'application/json'
        }
    )

    if response.status_code == 200:
        return jsonify(response.json().get('results', []))  # Return the job listings
    else:
        return jsonify({'error': 'Failed to fetch jobs'}), response.status_code

