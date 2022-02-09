from rest_framework import viewsets
from .serializer import BreakReasonSerializer
from dustry.models import BreakReason

class BreakReasonViewSet(viewsets.ModelViewSet):
    queryset = BreakReason.objects.all()
    serializer_class = BreakReasonSerializer