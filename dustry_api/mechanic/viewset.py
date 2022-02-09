from rest_framework import viewsets
from .serializer import MechanicSerializer
from dustry.models import Mechanic

class MechanicViewSet(viewsets.ModelViewSet):
    queryset = Mechanic.objects.all()
    serializer_class = MechanicSerializer