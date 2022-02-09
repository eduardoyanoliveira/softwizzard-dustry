from django.db import models
from django.utils import timezone

class Sector(models.Model):
    
    class SectorObject(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(active=True)
        
    active = models.BooleanField(default=True)
    name= models.CharField(max_length=250)
    reg_date = models.DateTimeField(default=timezone.now)
    objects = models.Manager()
    sector_objects = SectorObject()
    
    def __str__(self) -> str:
        return self.name     
    
        
class Operator(models.Model):
    
    class OperatorObject(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(active=True)
    
    active = models.BooleanField(default=True)
    name= models.CharField(max_length=250)
    salary = models.DecimalField(max_digits=8, decimal_places=2, null=True)
    reg_date = models.DateTimeField(default=timezone.now)
    objects = models.Manager()
    operator_objects = OperatorObject()
    
    def __str__(self) -> str:
        return self.name


class OperatorSector(models.Model):
    
    operator_id = models.ForeignKey(Operator, on_delete=models.CASCADE)
    sector_id = models.ForeignKey(Sector, on_delete=models.CASCADE)


class Leader(models.Model):
    
    class LeaderObject(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(active=True)
    
    active = models.BooleanField(default=True)
    name= models.CharField(max_length=250)
    reg_date = models.DateTimeField(default=timezone.now)
    objects = models.Manager()
    leader_objects = LeaderObject()
    
    def __str__(self) -> str:
        return self.name


class Department(models.Model):
    
    class DepartmentObject(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(active=True)
    
    active = models.BooleanField(default=True)
    name= models.CharField(max_length=250)
    reg_date = models.DateTimeField(default=timezone.now)
    objects = models.Manager()
    department_objects = DepartmentObject()
    
    def __str__(self) -> str:
        return self.name


class RawMaterial(models.Model):
    
    class RawMaterialObject(models.Manager):
        def get_queryset(self):
         return super().get_queryset().filter(active=True)

    active = models.BooleanField(default=True)
    name= models.CharField(max_length=250)
    cost = models.DecimalField(max_digits=8, decimal_places=2, null=True)
    reg_date = models.DateTimeField(default=timezone.now)
    objects = models.Manager()
    raw_material_objects = RawMaterialObject()
    
    def __str__(self) -> str:
        return self.name

class Product(models.Model):
    
    class ProductObject(models.Manager):
        def get_queryset(self):
         return super().get_queryset().filter(active=True)

    active = models.BooleanField(default=True)
    name= models.CharField(max_length=250)
    weight = models.DecimalField(max_digits=8, decimal_places=2, null=True)
    department_id = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    reg_date = models.DateTimeField(default=timezone.now)
    objects = models.Manager()
    product_objects = ProductObject()
    
    def __str__(self) -> str:
        return self.name


class ProductComposition(models.Model):
    
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    raw_material_id = models.ForeignKey(RawMaterial, on_delete=models.CASCADE)
    qty = models.DecimalField(max_digits=8, decimal_places=2, null=True)


class Machine(models.Model):
    
    class MachineObject(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(active=True)
    
    active = models.BooleanField(default=True)
    name= models.CharField(max_length=250)
    reg_date = models.DateTimeField(default=timezone.now)
    kw_per_hour = models.DecimalField(max_digits=6, decimal_places=2, null=True)
    length = models.DecimalField(max_digits=8, decimal_places=2, null=True)
    objects = models.Manager()
    machine_objects = MachineObject()
    
    def __str__(self) -> str:
        return self.name
    

class MachineProducts(models.Model):
    machine_id = models.ForeignKey(Machine, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    

class Mechanic(models.Model):

    active = models.BooleanField(default=True)
    name= models.CharField(max_length=250)
    reg_date = models.DateTimeField(default=timezone.now)
    value_per_hour = models.DecimalField(max_digits=8, decimal_places=2, null=True)
    outsourced = models.BooleanField(default=False)
    objects = models.Manager()
    
    def __str__(self) -> str:
        return self.name
   
    
class BreakReason(models.Model):
    
    active = models.BooleanField(default=True)
    name= models.CharField(max_length=250)
    reg_date = models.DateTimeField(default=timezone.now)
    objects = models.Manager()
    
    def __str__(self) -> str:
        return self.name
    

class BreakSolution(models.Model):
    
    active = models.BooleanField(default=True)
    name= models.CharField(max_length=250)
    reg_date = models.DateTimeField(default=timezone.now)
    objects = models.Manager()
    
    def __str__(self) -> str:
        return self.name


class ProductionOrder(models.Model):
    SHIFT_CHOICES = (
        ('MANHA', 'MANHA'),
        ('TARDE', 'TARDE'),
    )

    machine_id = models.ForeignKey(Machine, on_delete=models.PROTECT)
    leader_id = models.ForeignKey(Leader, on_delete=models.PROTECT)
    shift = models.CharField(max_length=5, choices=SHIFT_CHOICES, default='MANHA')
    start =  models.DateTimeField(default=timezone.now)
    end = models.DateTimeField(null=True)
    initial_hour_meter = models.DecimalField(max_digits=8, decimal_places=2, null=False) 
    end_hour_meter = models.DecimalField(max_digits=8, decimal_places=2, null=True) 
    obs = models.TextField(max_length=600, null=True, blank=True)
    
        
    def __str__(self) -> str:
        return str(self.id)

    

class ProductionOrderOperator(models.Model):
    order_id = models.ForeignKey(ProductionOrder, on_delete=models.CASCADE)
    operator_id = models.ForeignKey(Operator, on_delete=models.PROTECT) 


class ProductionOrderProduct(models.Model):
    order_id = models.ForeignKey(ProductionOrder, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.PROTECT) 


class ProductionOrderWithdraw(models.Model):
    order_id = models.ForeignKey(ProductionOrder, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.PROTECT)
    qty = models.DecimalField(max_digits=8, decimal_places=2, null=False) 
    time =  models.DateTimeField(default=timezone.now)


class ProductionOrderEvent(models.Model):
    order_id = models.ForeignKey(ProductionOrder, on_delete=models.CASCADE)
    break_reason_id  = models.ForeignKey(BreakReason, on_delete=models.PROTECT)
    mechanic_id = models.ForeignKey(Mechanic, on_delete=models.PROTECT, null=True)
    start =  models.DateTimeField(default=timezone.now)
    end = models.DateTimeField(null=True)
    break_solution_id  = models.ForeignKey(BreakSolution, on_delete=models.PROTECT, null=True)