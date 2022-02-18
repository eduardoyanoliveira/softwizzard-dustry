import React from 'react';
import { Container } from './styles';

function SnackBarComponent({handleClick, title, type, width = '100%'}) {
 
    let background = '';

    switch(type){
        case 'SUCCESS':{
            background = 'primary';
            break;
        }
        case  'ALERT':{
            background = 'alert';
            break;
        }
        case 'FAIL':{
           background = 'warning';
           break;
        }
        default:{
            background = 'primary';
            break;
        }
    }

    return (
        <Container 
            background={background}
            onClick={handleClick}
            width={width}
        >
            {title}
        </Container>
    )
}

export default SnackBarComponent;
