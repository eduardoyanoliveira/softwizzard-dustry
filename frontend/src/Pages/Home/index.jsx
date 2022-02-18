import React from 'react';
import HomePage from './homePage';
import { ProductionOrderProvider } from '../../contexts/ProductionOrderProvider';

function index() {
    return (
        <ProductionOrderProvider>
            <HomePage/>
        </ProductionOrderProvider>
    );
}

export default index;
