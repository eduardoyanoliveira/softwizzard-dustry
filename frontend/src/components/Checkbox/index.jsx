import React, { useState, useEffect } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';

import { Icon } from './styles';

function CheckboxComponent({active, handleClick}) {
    const [thisActive , setThisActive] = useState(active);

    useEffect(() => {
        setThisActive(active)
    },[active])

    const thisHandleClcik  = () => {
        handleClick();
        setThisActive(!thisActive)
    }
    
    return (
        <Icon active={thisActive} onClick={thisHandleClcik}>
            <BsCheckCircleFill />
        </Icon>
    )
}

export default React.memo(CheckboxComponent);
