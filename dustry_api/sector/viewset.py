from rest_framework import viewsets
from .serializer import SectorSerializer
from dustry.models import Sector

class SectorViewSet(viewsets.ModelViewSet):
    queryset = Sector.objects.all()
    serializer_class = SectorSerializer
      