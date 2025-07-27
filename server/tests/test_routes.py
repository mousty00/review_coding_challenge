import unittest
from unittest.mock import patch, mock_open
import json
import sys
import os

# Add the parent directory to the path so we can import the app
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import your Flask app - adjust the import name if your file is named differently
try:
    from app import app, businesses, load_json_by_key, save_json
except ImportError:
    # If your file is named differently, try these alternatives:
    # from main import app, businesses, load_json_by_key, save_json
    # from server import app, businesses, load_json_by_key, save_json
    print("Could not import app. Make sure your Flask app file is named 'app.py'")
    raise


class TestFlaskAPI(unittest.TestCase):

    def setUp(self):
        """Set up test fixtures before each test method."""
        self.app = app
        self.app.config['TESTING'] = True
        self.client = self.app.test_client()

        # Sample test data
        self.sample_businesses = [
            {"id": "business_1", "name": "Test Restaurant", "address": "123 Main St"},
            {"id": "business_2", "name": "Test Cafe", "address": "456 Oak Ave"}
        ]

    def tearDown(self):
        """Clean up after each test method."""
        global businesses
        businesses.clear()


class TestBusinessesRoute(TestFlaskAPI):

    def test_get_businesses_success(self):
        """Test successful retrieval of businesses."""
        # Load businesses into global variable
        global businesses
        businesses.clear()
        businesses.extend([
            {"id": "business_1", "name": "Test Restaurant"},
            {"id": "business_2", "name": "Test Cafe"}
        ])

        response = self.client.get('/api/businesses')

        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]['name'], 'Test Restaurant')

    def test_get_businesses_empty(self):
        """Test retrieval when no businesses exist."""
        global businesses
        businesses.clear()

        response = self.client.get('/api/businesses')

        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(len(data), 0)


class TestInteractionsRoute(TestFlaskAPI):

    @patch('app.load_json_by_key')
    @patch('app.save_json')
    @patch('app.datetime')
    def test_create_interaction_success_high_rating(self, mock_datetime, mock_save_json, mock_load_json):
        """Test successful creation of interaction with high rating (>3)."""
        from datetime import datetime, timezone

        # Mock datetime
        mock_now = datetime(2024, 1, 1, 10, 0, 0, tzinfo=timezone.utc)
        mock_datetime.now.return_value = mock_now

        # Mock existing interactions
        mock_load_json.return_value = []

        request_data = {
            "business_id": "business_1",
            "rating": 5
        }

        response = self.client.post('/api/interactions/create',
                                    data=json.dumps(request_data),
                                    content_type='application/json')

        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertEqual(data['message'], 'Interaction created successfully')
        self.assertEqual(data['data']['business_id'], 'business_1')
        self.assertEqual(data['data']['rating'], 5)
        self.assertEqual(data['data']['action'], 'redirected_to_gmb')

        # Verify save_json was called
        mock_save_json.assert_called_once()

    @patch('app.load_json_by_key')
    @patch('app.save_json')
    @patch('app.datetime')
    def test_create_interaction_success_low_rating(self, mock_datetime, mock_save_json, mock_load_json):
        """Test successful creation of interaction with low rating (<=3)."""
        from datetime import datetime, timezone

        # Mock datetime
        mock_now = datetime(2024, 1, 1, 10, 0, 0, tzinfo=timezone.utc)
        mock_datetime.now.return_value = mock_now

        mock_load_json.return_value = []

        request_data = {
            "business_id": "business_1",
            "rating": 2
        }

        response = self.client.post('/api/interactions/create',
                                    data=json.dumps(request_data),
                                    content_type='application/json')

        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertEqual(data['data']['action'], 'no_action')

    def test_create_interaction_missing_business_id(self):
        """Test interaction creation with missing business_id."""
        request_data = {
            "rating": 5
        }

        response = self.client.post('/api/interactions/create',
                                    data=json.dumps(request_data),
                                    content_type='application/json')

        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn('Missing required fields', data['error'])

    def test_create_interaction_missing_rating(self):
        """Test interaction creation with missing rating."""
        request_data = {
            "business_id": "business_1"
        }

        response = self.client.post('/api/interactions/create',
                                    data=json.dumps(request_data),
                                    content_type='application/json')

        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn('Missing required fields', data['error'])

    def test_create_interaction_invalid_rating(self):
        """Test interaction creation with invalid rating format."""
        request_data = {
            "business_id": "business_1",
            "rating": "invalid"
        }

        response = self.client.post('/api/interactions/create',
                                    data=json.dumps(request_data),
                                    content_type='application/json')

        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn('Rating must be an integer', data['error'])


class TestSubmissionsRoute(TestFlaskAPI):

    @patch('app.load_json_by_key')
    @patch('app.save_json')
    @patch('app.datetime')
    def test_create_submission_success(self, mock_datetime, mock_save_json, mock_load_json):
        """Test successful creation of submission."""
        from datetime import datetime, timezone

        # Mock datetime
        mock_now = datetime(2024, 1, 1, 10, 0, 0, tzinfo=timezone.utc)
        mock_datetime.now.return_value = mock_now

        mock_load_json.return_value = []

        request_data = {
            "business_id": "business_1",
            "rating": 2,
            "feedback": "Poor service quality",
            "category": "service",
            "customer_name": "Jane Doe",
            "email": "jane@example.com",
            "phone": "123-456-7890"
        }

        response = self.client.post('/api/submissions/create',
                                    data=json.dumps(request_data),
                                    content_type='application/json')

        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertEqual(data['message'], 'Submission created successfully')
        self.assertEqual(data['data']['business_id'], 'business_1')
        self.assertEqual(data['data']['feedback'], 'Poor service quality')

    def test_create_submission_missing_required_field(self):
        """Test submission creation with missing required fields."""
        request_data = {
            "business_id": "business_1",
            "rating": 2,
            "feedback": "Poor service quality",
            "category": "service",
            "customer_name": "Jane Doe"
            # Missing email
        }

        response = self.client.post('/api/submissions/create',
                                    data=json.dumps(request_data),
                                    content_type='application/json')

        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn('Missing one or more required fields', data['error'])

    @patch('app.load_json_by_key')
    def test_create_submission_duplicate(self, mock_load_json):
        """Test submission creation with duplicate email and business combination."""
        # Mock existing submissions with same email and business
        mock_load_json.return_value = [
            {
                "business_id": "business_1",
                "email": "jane@example.com",
                "customer_name": "Jane Doe"
            }
        ]

        request_data = {
            "business_id": "business_1",
            "rating": 2,
            "feedback": "Poor service quality",
            "category": "service",
            "customer_name": "Jane Doe",
            "email": "jane@example.com"
        }

        response = self.client.post('/api/submissions/create',
                                    data=json.dumps(request_data),
                                    content_type='application/json')

        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn('Submission already exists', data['error'])


if __name__ == '__main__':
    unittest.main()