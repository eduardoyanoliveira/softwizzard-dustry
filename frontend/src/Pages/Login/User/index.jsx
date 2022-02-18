import React from 'react';
import UserLoginPage from './userLoginPage';

const formInputs = [
    {
        id: 0,
        name: 'email',
        desc: 'Email',
        type: 'email',
        value: "''"
    },
    {
        id: 1,
        name: 'password',
        desc: 'Senha',
        type: 'password',
        value: "''"
    },
];


function UserLogin() {
    return (
        <UserLoginPage formInputs={formInputs}/>
    )
}

export default UserLogin;
