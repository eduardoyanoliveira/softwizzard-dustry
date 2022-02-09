from rest_framework.routers import DefaultRouter

from .leader.viewset import LeaderViewSet
from .sector.viewset import SectorViewSet
from .operators.viewset import OperatorViewSet
from .operator_sectors.viewset import OperatorSectorViewSet
from .department.viewset import DepartmentViewSet
from .raw_material.viewset import RawMaterialViewSet
from .product.viewset import ProductViewSet
from .product_composition.viewset import ProductCompositionViewSet
from .machine.viewset import MachineViewSet
from .machine_products.viewset import MachineProductsViewSet
from . mechanic.viewset import MechanicViewSet
from .break_reason.viewset import BreakReasonViewSet
from .break_solution.viewset import BreakSolutionViewSet
from .product_composition.viewset import ProductCompositionViewSet

from .production_order.viewset import ProductionOrderViewSet
from .production_order_operator.viewset import ProductionOrderOperatorViewSet
from .production_order_product.viewset import ProductionOrderProductViewSet
from .production_order_withdraw.viewset import ProductionOrderWithdrawViewSet
from .production_order_event.viewset import ProductionOrderEventViewSet

app_name = 'dustry_api'

router = DefaultRouter()

router.register('operators', OperatorViewSet, basename='operators')
router.register('sectors' , SectorViewSet, basename='sectors')
router.register('operator_sectors', OperatorSectorViewSet, basename='operator_sectors')
router.register('leaders', LeaderViewSet, basename='leaders' )
router.register('departments', DepartmentViewSet, basename='departments' )
router.register('raw_materials', RawMaterialViewSet, basename='raw_materials')
router.register('products', ProductViewSet, basename='products')
router.register('products_composition', ProductCompositionViewSet, basename='products_composition')
router.register('machines', MachineViewSet, basename='machines')
router.register('machine_products', MachineProductsViewSet, basename='machine_products')
router.register('mechanics', MechanicViewSet, basename='mechanics')
router.register('break_reasons', BreakReasonViewSet, basename='break_reasons')
router.register('break_solutions', BreakSolutionViewSet, basename='break_solutions')

router.register('production_orders', ProductionOrderViewSet, basename='production_orders')
router.register('production_order_operators', ProductionOrderOperatorViewSet, basename='production_order_operators')
router.register('production_order_products', ProductionOrderProductViewSet, basename='production_order_products')
router.register('production_order_withdrawals', ProductionOrderWithdrawViewSet, basename='production_order_withdrawals')
router.register('production_order_events', ProductionOrderEventViewSet, basename='production_order_events')

urlpatterns = router.urls
