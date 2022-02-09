from rest_framework import status
from rest_framework.test import APITestCase

class ProductionOrderWithdrawTest(APITestCase):
        
    def test_view_production_order_withdrawls(self):
        url = 'http://localhost:8000/api/production_order_withdrawls/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def create_production_order_withdrawls(self):
        data = {
            "order_id": 1,
            "product_id": 1,
            "qty": 20
        }
        
        url = 'http://localhost:8000/api/production_order_withdrawls/'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)