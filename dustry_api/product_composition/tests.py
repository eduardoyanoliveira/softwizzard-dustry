from rest_framework import status
from rest_framework.test import APITestCase

class ProductCompositionTest(APITestCase):
    
    def test_view_product_composition(self):
        url = 'http://localhost:8000/api/products_composition/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def create_product_composition(self):
        data = {
            "product_id": 1,
            "raw_material_id": 1,
            "qtd": 2.5
        }
        
        url = 'http://localhost:8000/api/products_composition/'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)        
         
