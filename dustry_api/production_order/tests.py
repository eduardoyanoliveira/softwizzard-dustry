from rest_framework import status
from rest_framework.test import APITestCase

class ProductOrderTest(APITestCase):
    
    def test_view_product_order(self):
        url = 'http://localhost:8000/api/production_order/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def create_product_order(self):
        data = {
            "machine_id": 1,
            "leader_id": 1,
            "shift" : 'TARDE',
            "initial_hour_meter" : "8:30",
            "end_hour_meter" : "12:30",
            "obs": "TESTE"
        }
        
        url = 'http://localhost:8000/api/production_order/'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)        
         
