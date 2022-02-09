from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
 
class MechanicTest(APITestCase):
        
    def test_view_mechanic(self):
        url = 'http://localhost:8000/api/mechanic/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def create_machine(self):
        data = {
            "name": "Mechanic",
        }
        
        url = 'http://localhost:8000/api/mechanic/'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


     