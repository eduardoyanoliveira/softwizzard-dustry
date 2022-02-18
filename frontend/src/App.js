import React from 'react';
import { Routes, Route} from 'react-router-dom';
import { security } from './SideBarData';

import  ThemeProvider from './styles/themeProvider';

import { DimensionsProvider } from './contexts/Dimensions';

import ProductionOrderRegister from './Pages/Register/ProductionOrder';
import ProductionWithdrawlasRegister from './Pages/Register/ProductionWithdrawals';
import ProductionEventRegister from './Pages/Register/ProductionEvents';
import SectorRegister from './Pages/Register/Sector';
import OperatorRegister from './Pages/Register/Operator';
import LeaderRegister from './Pages/Register/Leader';
import DepartmentRegister from './Pages/Register/Department';
import RawMaterialRegister from './Pages/Register/RawMaterial';
import ProductRegister from './Pages/Register/Product';
import MachineRegister from './Pages/Register/Machine';
import MechanicRegister from './Pages/Register/Mechanic';
import BreakReasonRegister from './Pages/Register/BreakReason';
import BreakSolutionRegister from './Pages/Register/BreakSolution';
import UserRegister from './Pages/Register/User';

import UserLogin from './Pages/Login/User';

import AppComponent from './Pages/App';
import ConsultOperator from './Pages/Consult/Operator';

import HomePage from './Pages/Home/';

function App() {

  const now = new Date();

  return(
    <ThemeProvider>
      <DimensionsProvider>
      {
        // now > security ? (
        //   <div style={{fontSize: '2.5rem', margin: '0 auto', textAlign:'center'}}>
        //     Licensa fora da data de Válidade
        //   </div>
        // )
        // :
        !localStorage.getItem('access_token') 
        ? 
        (
          < UserLogin/>
        ) 
        : 
        (
          <AppComponent>
            <Routes>
              <Route path='/' element={<HomePage/>} />


              <Route path='/register/production_orders' element={<ProductionOrderRegister/>} />
              <Route path='/register/production_order_withdrawals' element={<ProductionWithdrawlasRegister/>} />
              <Route path='/register/production_order_events' element={<ProductionEventRegister/>} />
              <Route path='/register/sector' element={<SectorRegister/>} />
              <Route path='/register/operator' element={<OperatorRegister/>} />
              <Route path='/register/leader' element={<LeaderRegister/>} />
              <Route path='/register/departments' element={<DepartmentRegister/>} />
              <Route path='/register/raw_materials' element={<RawMaterialRegister/>} />
              <Route path='/register/products' element={<ProductRegister/>} />
              <Route path='/register/machines' element={<MachineRegister/>} />
              <Route path='/register/mechanics' element={<MechanicRegister/>} />
              <Route path='/register/break_reasons' element={<BreakReasonRegister/>} />
              <Route path='/register/break_solutions' element={<BreakSolutionRegister/>} />

              <Route path='/manager/user' element={<UserRegister/>} />



              <Route path='/consult/production_orders' element={<ConsultOperator/>} />

            </Routes>
          </AppComponent>
        )
      }
      </DimensionsProvider>
    </ThemeProvider>
  )

}

export default App;
