from rest_framework import status
from rest_framework.test import APITestCase


class OperatorTest(APITestCase):
    
    def test_view_operator(self):
        url = 'http://localhost:8000/api/operators/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def create_operator(self):
        data = {
            "name": "Operator",
            "salary": "2000.00"
        }
        
        url = 'http://localhost:8000/api/operators/'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)        
        