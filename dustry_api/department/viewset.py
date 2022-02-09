from rest_framework import viewsets
from .serializer import DepartmentSerializer
from dustry.models import Department

class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer