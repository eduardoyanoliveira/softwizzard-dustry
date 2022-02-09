from rest_framework import viewsets
from dustry.models import RawMaterial
from .serializer import RawMaterialSerializer

class RawMaterialViewSet(viewsets.ModelViewSet):
    queryset = RawMaterial.objects.all()
    serializer_class = RawMaterialSerializer

