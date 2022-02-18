import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as HiIcons from 'react-icons/hi';

export const SidebarDataOperator = [
    {
        title: 'Home',
        path:  '/',
        icon:   <AiIcons.AiOutlineHome/>,
    },
    {
        title: 'Cadastros',
        path:  '/register',
        icon:   <HiIcons.HiOutlineDocumentAdd/>,
        subNav : [
            {
                title: 'Ordem de Produção',
                path:  '/register/production_orders',
            },
            {
                title: 'Tiragens',
                path:  '/register/production_order_withdrawals',
            },
            {
                title: 'Ocorrências',
                path:  '/register/production_order_events',
            },
            {
                title: 'Motivo de Parada',
                path:  '/register/break_reasons',
            },
            {
                title: 'Solução Parada',
                path:  '/register/break_solutions',
            },
            
        ]
    },
    {
        title: 'Consultas',
        path: '/consult',
        icon: <AiIcons.AiOutlineQuestionCircle/>,
        subNav : [
            {
                title: 'Ordem de Produção',
                path:  '/consult/production_orders',
            },
        ]
    },

]
