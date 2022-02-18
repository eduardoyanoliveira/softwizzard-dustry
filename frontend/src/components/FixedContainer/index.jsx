import React from 'react';
import { FixedContainer } from './styles';

function FixedContainerComponent({children}) {

    return (
        <FixedContainer>
            {children}
        </FixedContainer>
    );
};

export default FixedContainerComponent;
