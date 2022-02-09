from django.test import TestCase
from dustry.models import MachineProducts, Sector, OperatorSector, Operator, Leader, Department, Machine, RawMaterial, Product, ProductComposition
from dustry.models import Mechanic, BreakReason, BreakSolution, ProductionOrder, ProductionOrderOperator, ProductionOrderProduct
from dustry.models import ProductionOrderWithdraw, ProductionOrderEvent

# Operator test

class Test_Create_Operator(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        test_operator = Operator.objects.create(name='Operator', salary= 1220.00)
    

    def test_operator_content(self):
        operator = Operator.operator_objects.get(id=1)
        name = f'{operator.name}'
        salary = operator.salary
        self.assertEqual(name, 'Operator')
        self.assertEqual(salary, 1220.00)
        self.assertEqual(str(operator), 'Operator')


# Sector test

class Test_Create_Sector(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        test_sector = Sector.objects.create(name='Sector')
    

    def test_sector_content(self):
        sector = Sector.sector_objects.get(id=1)
        name = f'{sector.name}'
        self.assertEqual(name, 'Sector')
        self.assertEqual(str(sector), 'Sector')
    

# OperatorSector test

class Test_Create_OperatorSector(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        test_operator = Operator.objects.create(name='Operator', salary= 1220.00)
        test_sector = Sector.objects.create(name='Sector')
        
        test_operator_sector = OperatorSector.objects.create(operator= test_operator,sector= test_sector)
    

    def test_operator_sector_content(self):
        operator_sector = OperatorSector.objects.get(id=1) 
        operator_id = operator_sector.operator.id
        sector_id = operator_sector.sector.id
        self.assertEqual(operator_id, 1)
        self.assertEqual(sector_id, 1)
    

# Leader test 
    
class Test_Create_Leader(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        test_leader = Leader.objects.create(name='Leader')
        
    def test_leader_content(self):
        leader = Leader.leader_objects.get(id=1)
        name = f'{leader.name}'
        self.assertEqual(name, 'Leader')
        self.assertEqual(str(leader), 'Leader')
      
      
# Department test 
    
class Test_Create_Department(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        test_department = Department.objects.create(name='Department')
        
    def test_department_content(self):
        department = Department.department_objects.get(id=1)
        name = f'{department.name}'
        self.assertEqual(name, 'Department')
        self.assertEqual(str(department), 'Department')

# RawMaterial test 
    
class Test_Create_RawMaterial(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        test_raw_material = RawMaterial.objects.create(name='RawMaterial')
        
    def test_raw_material_content(self):
        raw_material = RawMaterial.raw_material_objects.get(id=1)
        name = f'{raw_material.name}'
        self.assertEqual(name, 'RawMaterial')
        self.assertEqual(str(raw_material), 'RawMaterial')


# Product test 
    
class Test_Create_Product(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        test_product = Product.objects.create(name='Product', weight=15.3)
        
    def test_product_content(self):
        product = Product.objects.get(id=1)
        name = f'{product.name}'
        weight = product.weight
        self.assertEqual(name, 'Product')
        self.assertEqual(float(weight), 15.3)
        self.assertEqual(str(product), 'Product')
     
# Product Composition test 
    
class Test_Create_ProductComposition(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        test_raw_material = RawMaterial.objects.create(name='RawMaterial')
        test_product = Product.objects.create(name='Product', weight=15.3)
        test_product_composition = ProductComposition.objects.create(product= test_product, raw_material= test_raw_material, qtd=15.3)
        
    def test_product_composition_content(self):
        product_composition = ProductComposition.objects.get(id=1)
        product_id = product_composition.product.id
        raw_material_id = product_composition.raw_material.id
        qtd = product_composition.qtd
        self.assertEqual(product_id, 1)
        self.assertEqual(raw_material_id, 1)
        self.assertEqual(float(qtd), 15.3)
   
        
# Machine test 
    
class Test_Create_Machine(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        test_machine = Machine.objects.create(name='Machine', kw_per_hour= 2.5, length=15.3)
        
    def test_machine_content(self):
        machine = Machine.machine_objects.get(id=1)
        name = f'{machine.name}'
        kw_per_hour = machine.kw_per_hour
        length = machine.length
        self.assertEqual(name, 'Machine')
        self.assertEqual(kw_per_hour, 2.5)
        self.assertEqual(float(length), 15.3)
        self.assertEqual(str(machine), 'Machine')



# Machine Product test 
    
class Test_Create_MachineProduct(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        test_machine = Machine.objects.create(name='Machine', kw_per_hour = 2, length = 3.5)
        test_product = Product.objects.create(name='Product', weight=15.3)
        test_machine_product = MachineProducts.objects.create(product= test_product, machine= test_machine)
        
    def test_machine_product_content(self):
        machine_product = MachineProducts.objects.get(id=1)
        product_id = machine_product.product_id
        machine_id = machine_product.machine_id
        self.assertEqual(product_id, 1)
        self.assertEqual(machine_id, 1)


# Mechanic test 
    
class Test_Create_Mechanic(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        test_mechanic = Mechanic.objects.create(name='Mechanic')
        
    def test_mechanic(self):
        mechanic = Mechanic.objects.get(id=1)
        name = f'{mechanic.name}'
        self.assertEqual(name, 'Mechanic')
        self.assertEqual(str(mechanic), 'Mechanic')



# BreakReason test 
    
class Test_Create_BreakReason(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        test_break_reason = BreakReason.objects.create(name='BreakReason')
        
    def test_break_reason(self):
        break_reason = BreakReason.objects.get(id=1)
        name = f'{break_reason.name}'
        self.assertEqual(name, 'BreakReason')
        self.assertEqual(str(break_reason), 'BreakReason')
        

# BreakSolutiontest 
    
class Test_Create_BreakSolution(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        test_break_solution = BreakSolution.objects.create(name='BreakSolution')
        
    def test_break_solution(self):
        break_solution = BreakSolution.objects.get(id=1)
        name = f'{break_solution.name}'
        self.assertEqual(name, 'BreakSolution')
        self.assertEqual(str(break_solution), 'BreakSolution')


# ProductionOrder
    
class Test_Create_ProductionOrder(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        test_machine = Machine.objects.create(name='Machine', kw_per_hour = 2, length = 3.5)
        test_leader = Leader.objects.create(name='Leader')
        test_production_order = ProductionOrder.objects.create(
            machine_id= test_machine,
            leader_id= test_leader,
            shift='TARDE',
            initial_hour_meter='08:30',
            end_hour_meter='14:40',
            obs='TESTE'
        )
        
    def test_production_order(self):
        production_order = ProductionOrder.objects.get(id=1)
        machine_id = production_order.machine_id.id
        leader_id = production_order.leader_id.id
        shift = production_order.shift
        initial_hour_meter = production_order.initial_hour_meter
        end_hour_meter = production_order.end_hour_meter
        obs = production_order.obs
        
        self.assertEqual(machine_id, 1)
        self.assertEqual(leader_id, 1)
        self.assertEqual(shift, 'TARDE')
        self.assertEqual(initial_hour_meter, '8:30')
        self.assertEqual(end_hour_meter, '14:40')
        self.assertEqual(obs, 'TESTE')
        self.assertEqual(str(production_order), '1')
  

# Production Order Operator 
    
class Test_Create_ProductionOrderOperator(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        test_machine = Machine.objects.create(name='Machine', kw_per_hour = 2, length = 3.5)
        test_leader = Leader.objects.create(name='Leader')
        test_production_order = ProductionOrder.objects.create(
            machine_id=test_machine,
            leader_id=test_leader,
            shift='TARDE',
            initial_hour_meter='08:30',
            end_hour_meter='14:40',
            obs='TESTE'
        )
        test_operator = Operator.objects.create(name='Operator', salary= 1220.00)
        test_production_operator = ProductionOrderOperator.objects.create(order_id=test_production_order, operator_id=test_operator)
        
    def test_production_order_operator(self):
        production_order_operator = ProductionOrderOperator.objects.get(id=1)
        order_id = production_order_operator.order_id.id
        operator_id = production_order_operator.operator_id.id
        
        self.assertEqual(order_id, 1)
        self.assertEqual(operator_id, 1)


# Production Order Product 
    
class Test_Create_ProductionOrderProduct(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        test_machine = Machine.objects.create(name='Machine', kw_per_hour = 2, length = 3.5)
        test_leader = Leader.objects.create(name='Leader')
        test_production_order = ProductionOrder.objects.create(
            machine_id=test_machine,
            leader_id=test_leader,
            shift='TARDE',
            initial_hour_meter='08:30',
            end_hour_meter='14:40',
            obs='TESTE'
        )
        test_product = Product.objects.create(name='Product', weight=15.3)
        test_production_order_product = ProductionOrderProduct.objects.create(order_id=test_production_order, product_id=test_product)
        
    def test_production_order_product(self):
        production_order_product = ProductionOrderProduct.objects.get(id=1)
        order_id = production_order_product.order_id
        product_id = production_order_product.product_id

        self.assertEqual(order_id, 1)
        self.assertEqual(product_id, 1)

        
# Production Order Withdraw 
    
class Test_Create_ProductionOrderWithdraw(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        test_machine = Machine.objects.create(name='Machine', kw_per_hour = 2, length = 3.5)
        test_leader = Leader.objects.create(name='Leader')
        test_production_order = ProductionOrder.objects.create(
            machine_id=test_machine,
            leader_id=test_leader,
            shift='TARDE',
            initial_hour_meter='08:30',
            end_hour_meter='14:40',
            obs='TESTE'
        )
        test_product = Product.objects.create(name='Product', weight=15.3)
        test_production_order_withdraw = ProductionOrderWithdraw.objects.create(
            order_id=test_production_order,
            product_id=test_product,
            qty=20,
            time='13:27'
        )
        
    def test_machine_production_order_withdraw(self):
        production_order_widthdraw = ProductionOrderWithdraw.objects.get(id=1)
        order_id = production_order_widthdraw.order_id
        product_id = production_order_widthdraw.product_id
        qty = production_order_widthdraw.qty
        time = production_order_widthdraw.time
        
        self.assertEqual(order_id, 1)
        self.assertEqual(product_id, 1)
        self.assertEqual(qty, 20)
        self.assertEqual(time, '13:27')


# Production Order Event 
    
class Test_Create_ProductionOrderEvent(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        test_machine = Machine.objects.create(name='Machine', kw_per_hour = 2, length = 3.5)
        test_leader = Leader.objects.create(name='Leader')
        test_production_order = ProductionOrder.objects.create(
            machine_id=test_machine,
            leader_id=test_leader,
            shift='TARDE',
            initial_hour_meter='08:30',
            end_hour_meter='14:40',
            obs='TESTE'
        ) 
        test_break_reason = BreakReason.objects.create(name='BreakReason')
        test_break_solution = BreakSolution.objects.create(name='BreakSolution')
        test_mechanic = Mechanic.objects.create(name='Mechanic')
        
        test_production_order_event = ProductionOrderEvent.objects.create(
            order_id = test_production_order,
            break_reason_id = test_break_reason,
            mechanic_id = test_mechanic,
            start ='13:47',
            end = '14:10',
            break_solution_id = test_break_solution
        )
        
    def test_machine_production_order_withdraw(self):
        production_order_event = ProductionOrderEvent.objects.get(id=1)
        order_id = production_order_event.order_id
        break_reason_id = production_order_event.break_reason_id
        mechanic_id = production_order_event.mechanic_id
        start = production_order_event.start
        end = production_order_event.end
        break_solution_id = production_order_event.break_solution_id
        
        self.assertEqual(order_id, 1)
        self.assertEqual(break_reason_id, 1)
        self.assertEqual(mechanic_id, 1)
        self.assertEqual(start, '13:47')
        self.assertEqual(end, '14:10')
        self.assertEqual(break_solution_id, 1)