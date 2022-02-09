from rest_framework import status
from rest_framework.test import APITestCase

class OperatorSectorTest(APITestCase):
        
    def test_view_operator_sectors(self):
        url = 'http://localhost:8000/api/operator_sectors/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def create_machine(self):
        data = {
            "operator_id": 1,
            "sector_id": 1
        }
        
        url = 'http://localhost:8000/api/operator_sectors/'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)