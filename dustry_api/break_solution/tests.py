from rest_framework import status
from rest_framework.test import APITestCase
 

class BreakSolutionTest(APITestCase):
        
    def test_view_break_solution(self):
        url = 'http://localhost:8000/api/break_solutions/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def create_break_solution(self):
        data = {
            "name": "break_solution",
        }
        
        url = 'http://localhost:8000/api/break_solutions/'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
      

     