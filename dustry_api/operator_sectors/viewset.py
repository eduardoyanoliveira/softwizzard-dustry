from rest_framework import viewsets
from dustry.models import OperatorSector, Operator, Sector
from .serializer import OperatorSectorSerializer

from rest_framework.response import Response 
from rest_framework import status

# OperatorSector Views

class OperatorSectorViewSet(viewsets.ModelViewSet):
    queryset = OperatorSector.objects.all() 
    serializer_class = OperatorSectorSerializer
    
    def retrieve(self, request, *args, **kwargs):
        data = OperatorSector.objects.filter(operator_id=kwargs['pk'])
        serializer = OperatorSectorSerializer(data, many=True)
        return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        params = request.query_params
        
        if 'operator' in params and 'sector' in params:
            this_operator = Operator.objects.get(id=params['operator'])
            this_sector = Sector.objects.get(id=params['sector'])
            
            if(not this_operator):
                return Response(
                    {'msg': 'Código de operador não encontrado no banco de dados.'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            if(not this_sector):
                return Response(
                    {'msg': 'Código de setor não encontrado no banco de dados.'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            # Checks if the database has aldeary a register of the current data
            try:
               operator_sector = OperatorSector.objects.get(operator_id=this_operator, sector_id=this_sector)
            except OperatorSector.DoesNotExist:
                operator_sector = None
                
            if(operator_sector != None):
                return Response(
                {'msg': 'Já existe um registro para estes dados.'},
                status=status.HTTP_409_CONFLICT
            )
 
            operator_sector = OperatorSector.objects.create(operator_id=this_operator, sector_id=this_sector)
            operator_sector.save()
            
            serializer = OperatorSectorSerializer(operator_sector, many=False)
            return Response(serializer.data)
        else:
            return Response(
                {'msg': 'A requisição não possui todos parametros necessários.'},
                status=status.HTTP_400_BAD_REQUEST
            )

    def destroy(self, request, *args, **kwargs):
        params = request.query_params
        
        try:
            operator_sectors = OperatorSector.objects.filter(operator_id=kwargs['pk'])
        except OperatorSector.DoesNotExist:
            operator_sectors = None
        
        if operator_sectors == None:
            return Response({'message': 'Operador não está vinculado a nenhum registro'})
            
        
        # If the user sends a parameter called "all" with the value true, it deletes every record with the operator passed on pk
        if 'all' in params:
            if params['all']:
                operator_sectors = OperatorSector.objects.filter(operator_id=kwargs['pk'])
                if operator_sectors:
                    operator_sectors.delete()
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response(
                        {
                            'msg':'Nenhum registro está vinculado a este operador'
                        },
                        status=status.HTTP_404_NOT_FOUND                                                   
                    )
        
        if 'sector' in params:
            if params['sector']:
                operator_sectors = OperatorSector.objects.filter(sector_id=params['sector'])
                if operator_sectors:  
                    operator_sectors.delete()
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response(
                        {
                            'msg':'O operador não possui vinculo com este setor'
                        },
                        status=status.HTTP_404_NOT_FOUND                                                   
                    )


  