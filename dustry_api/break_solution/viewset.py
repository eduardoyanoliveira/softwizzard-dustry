from rest_framework import viewsets
from .serializer import BreakSolutionSerializer
from dustry.models import BreakSolution

class BreakSolutionViewSet(viewsets.ModelViewSet):
    queryset = BreakSolution.objects.all()
    serializer_class = BreakSolutionSerializer