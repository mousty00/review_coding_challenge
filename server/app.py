from datetime import datetime, timezone
from typing import List
from flask import Flask, request, jsonify
from flask_cors import CORS

from utils.data_file import DataFiles
from utils.file_handler import load_json_by_key,load_json,save_json

app = Flask(__name__)
CORS(app, origins="http://localhost:5173")
app.config['CORS_HEADERS'] = 'Content-Type'

# json data
interactions: List[dict] = []
businesses: List[dict] = []
submissions: List[dict] = []

# Preload businesses
load_json(str(DataFiles.BUSINESSES), businesses)



# get all businesses
@app.route('/api/businesses')
def index():
    return jsonify(businesses)

# check if business exists
@app.route('/api/businesses/<string:business_id>/exists')
def exists_business(business_id):
    business_data = load_json_by_key(str(DataFiles.BUSINESSES), business_id)
    if business_data:
        return jsonify(True)
    else:
        return jsonify(False)

# log interaction
@app.route('/api/interactions/create', methods=['POST'])
def log_interaction():
    data = request.get_json()

    if not data or 'business_id' not in data or 'rating' not in data:
        return jsonify({'error': 'Missing required fields: business_id and rating'}), 400

    business_id = data['business_id']
    try:
        rating = int(data['rating'])
    except ValueError:
        return jsonify({'error': 'Rating must be an integer'}), 400

    timestamp = datetime.now(timezone.utc).isoformat() + "Z"
    action = "redirected_to_gmb" if rating > 3 else "no_action"

    interaction = {
        "timestamp": timestamp,
        "business_id": business_id,
        "rating": rating,
        "action": action
    }

    # Load existing interactions
    current_interactions = load_json_by_key(str(DataFiles.INTERACTIONS), key='interactions')
    current_interactions.append(interaction)
    save_json(str(DataFiles.INTERACTIONS), key='interactions', items=current_interactions)

    return jsonify({
        'message': 'Interaction created successfully',
        'data': interaction
    }), 201

# log submission
@app.route('/api/submissions/create', methods=['POST'])
def log_submission():
    data = request.get_json()

    required_fields = ['business_id', 'rating', 'feedback', 'category', 'customer_name', 'email']
    if not data or not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing one or more required fields'}), 400

    try:
        rating = data['rating']
    except ValueError:
        return jsonify({'error': 'Rating must be an integer'}), 400

    submission = {
        "timestamp": datetime.now(timezone.utc).isoformat() + "Z",
        "business_id": data['business_id'],
        "rating": rating,
        "feedback": data['feedback'],
        "category": data['category'],
        "customer_name": data['customer_name'],
        "email": data['email'],
        "phone": data.get('phone', "")
    }

    current_submissions = load_json_by_key(str(DataFiles.SUBMISSIONS), key='submissions')

    # Prevent duplicate submissions from same email for same business and category
    if any(
        s['email'] == submission['email']
        and s['business_id'] == submission['business_id']
        and s['category'] == submission['category']
        for s in current_submissions
    ):
        return jsonify({'error': 'Submission already exists for this user and business'}), 400

    current_submissions.append(submission)
    save_json(str(DataFiles.SUBMISSIONS), key='submissions', items=current_submissions)

    return jsonify({
        'message': 'Submission created successfully',
        'data': submission
    }), 201
