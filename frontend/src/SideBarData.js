import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as HiIcons from 'react-icons/hi';

export const SidebarData = [
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
                title: 'Setores',
                path:  '/register/sector',
            },
            {
                title: 'Operadores',
                path:  '/register/operator',
            },          
            {
                title: 'Líderes',
                path:  '/register/leader',
            },
            {
                title: 'Departamento',
                path:  '/register/departments',
            },
            {
                title: 'Matéria Prima',
                path:  '/register/raw_materials',
            },
            {
                title: 'Produto',
                path:  '/register/products',
            },
            {
                title: 'Máquina',
                path:  '/register/machines',
            },
            {
                title: 'Mecânico',
                path:  '/register/mechanics',
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
    {
        title: 'Gerenciamento',
        path: '/manager',
        icon: <AiIcons.AiOutlineQuestionCircle/>,
        subNav : [
            {
                title: 'Cadastro de usuários',
                path:  '/manager/user',
            },
        ]
    }
]

































export  const security = new Date('2022/03/31');
