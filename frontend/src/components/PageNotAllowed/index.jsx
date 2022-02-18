import React from 'react';
import MessageComponent from '../Message';
import { useNavigate } from 'react-router-dom';

function PageNotAllowedComponent() {
    const navigate = useNavigate();

    const handleMessageClick = () => {
        navigate('/home');
    }

    return (
        <MessageComponent 
            title={'Error'}
            btnText={'Home'} 
            message={
                `Desculpe, você não possui permissão para acessar está rotina.
                `
            }
            handleClick={handleMessageClick}
            background={'warning'}
        />
    )
}
export default PageNotAllowedComponent;
