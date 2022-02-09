from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class MachineTest(APITestCase):
        
    def test_view_machine(self):
        url = 'http://localhost:8000/api/machines/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def create_machine(self):
        data = {
            "name": "Machine",
            "kw_per_hour": 2.5,
            "length" : 15.3,
        }
        
        url = 'http://localhost:8000/api/machines/'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
      

     