from rest_framework import status
from rest_framework.test import APITestCase
 

class LeaderTest(APITestCase):
        
    def test_view_leader(self):
        url = 'http://localhost:8000/api/leaders/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def create_leader(self):
        data = {
            "name": "Leader",
        }
        
        url = 'http://localhost:8000/api/leaders/'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
      

     