import React from 'react';
import LeaderRegisterPage from './leaderRegisterPage';
import { LeaderProvider } from '../../../contexts/LeaderProvider';

const formInputs = [
    {
        name: 'active',
        value: true
    },
    {
        id: 0,
        name: 'name',
        desc: 'Nome',
        type: 'text',
        value: "''"
    },
];

function LeaderRegister() {
    return (
        <LeaderProvider>
            <LeaderRegisterPage formInputs={formInputs}/>
        </LeaderProvider>
    )
}

export default LeaderRegister;
