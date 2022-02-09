from django.urls import path
from .withdrawals.withdrawals_per_day import WithdrawalsPerDay

app_name = 'reports'

urlpatterns = [
    path('withdrawals_per_day/', WithdrawalsPerDay.as_view(), name='withdrawals_per_day')
]

