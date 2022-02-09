from rest_framework import status
from rest_framework.test import APITestCase

class ProductOrderEventsTest(APITestCase):
    
    def test_view_product_order_events(self):
        url = 'http://localhost:8000/api/production_order_events/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def create_product_order_events(self):
        data = {
            "order_id": 1,
            "break_reason_id": 1,
            "mechanic_id" : 1,
            "nreak_solution_id": 1
        }
        
        url = 'http://localhost:8000/api/production_order_events/'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)        
         
