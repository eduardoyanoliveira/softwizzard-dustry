from rest_framework import status
from rest_framework.test import APITestCase

class ProductTest(APITestCase):
    
    def test_view_product(self):
        url = 'http://localhost:8000/api/products/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def create_product(self):
        data = {
            "name": "Product",
            "weight": 15.3
        }
        
        url = 'http://localhost:8000/api/products/'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)        
         
