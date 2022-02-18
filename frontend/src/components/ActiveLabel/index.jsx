import React from 'react';
import CheckboxComponent from '../Checkbox';
import { Container, Label } from './styles';


function ActiveLabelComponent({title = 'Ativo?', active, handleClick}) {

    return (
        <Container>
            <Label 
            >
                {title}
            </Label>
            <CheckboxComponent 
                active={active} 
                handleClick={handleClick}
            />
        </Container>
    )
}

export default ActiveLabelComponent;
