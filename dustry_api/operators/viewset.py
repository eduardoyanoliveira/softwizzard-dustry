from rest_framework import viewsets
from dustry.models import Operator
from .serializer import OperatorSerializer

from rest_framework.response import Response 
from rest_framework import status
from rest_framework.decorators import action

# Operator Views

class OperatorViewSet(viewsets.ModelViewSet):
    queryset = Operator.objects.all() 
    serializer_class = OperatorSerializer


  