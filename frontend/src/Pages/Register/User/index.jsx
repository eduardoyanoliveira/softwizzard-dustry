import React from 'react';
import UserRegisterPage from './userRegisterPage';
import { OperatorProvider } from '../../../contexts/OperatorProvider';
import { UserProvider} from '../../../contexts/UserProvider';

const formInputs = [
    {
        name: 'is_active',
        value: true
    },
    {
        id: 0,
        name: 'email',
        desc: 'Email',
        type: 'email',
        value: "''"
    },
    {
        id: 1,
        name: 'user_name',
        desc: 'Nome De Usuário',
        type: 'text',
        value: "''"
    },
    {
        id: 2,
        name: 'password',
        desc: 'Senha',
        type: 'password',
        value: "''"
    },
];


function UserRegister() {
    return (
        <UserProvider>
            <OperatorProvider>
                <UserRegisterPage formInputs={formInputs}/>
            </OperatorProvider>
        </UserProvider>
    )
}

export default UserRegister;
