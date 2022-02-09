from rest_framework import status
from rest_framework.test import APITestCase

class OperatorTest(APITestCase):
    
    def test_view_deparment(self):
        url = 'http://localhost:8000/api/raw_materials/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def create_department(self):
        data = {
            "name": "Raw_Material"
        }
        
        url = 'http://localhost:8000/api/raw_materials/'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)        
         
