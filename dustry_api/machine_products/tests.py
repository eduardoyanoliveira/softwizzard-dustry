from rest_framework import status
from rest_framework.test import APITestCase

class MachineProductTest(APITestCase):
    
    def test_view_machine_product(self):
        url = 'http://localhost:8000/api/machine_products/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def create_machine_product(self):
        data = {
            "machine_id": 1,
            "product_id": 1,
        }
        
        url = 'http://localhost:8000/api/machine_products/'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)        
         
