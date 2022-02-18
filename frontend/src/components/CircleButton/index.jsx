import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { Container } from './styles';

function CircleButtonComponent({handleClick, margin, icon = <FaPlus/>, background = 'SUCCESS', big = false}) {
    let disabled = false;

    return (
        <Container 
            margin={margin}
            onClick={handleClick}
            big={big}
            disabled={disabled}
            background={background}
        >
            {icon}
        </Container>
    )
}

export default CircleButtonComponent;
