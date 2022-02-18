import React, { useContext, useEffect, useState } from 'react';
import { DimensionsContext } from '../../contexts/Dimensions/context';
import { MdPendingActions } from 'react-icons/md';

import { useNavigate } from 'react-router-dom';
import IconCard from '../../components/IconCard';
import { BarModel, LineModel } from '../../components/Charts/index';

import {ProductionOrderContext} from '../../contexts/ProductionOrderProvider/context';
import { filterProductionOrder } from '../../contexts/ProductionOrderProvider/actions';
import { findsNull } from '../../Utils/gridMethods';
import { axiosInstance } from '../../axios';
import { formatDate } from '../../Utils/formMethods';
import { CardContainer, FirstChartContainer, SectionContainer } from './styles';
import { Wrapper } from '../Consult/Operator/styles';

function HomePage() {
    const navigate = useNavigate();
    const [openOrders, setOpenOrders] = useState([]);
    const [withdrawalsPerDay, setWithdrawalsPerDay] = useState({
        labels: [],
        title: '',
        datasets: []
    });

    const productionOrderContext = useContext(ProductionOrderContext);
    const dimensions = useContext(DimensionsContext);

    const isMobile = (dimensions === 'SMALL' || dimensions === 'MOBILE');

    const operator_id = JSON.parse(localStorage.getItem('is_operator')) ? Number(localStorage.getItem('operator_id')) : '';

    useEffect(() => {
        const operator_id = JSON.parse(localStorage.getItem('is_operator')) ? Number(localStorage.getItem('operator_id')) : '';
        filterProductionOrder(productionOrderContext.dispatch,'', '', '', operator_id);
    },[productionOrderContext.dispatch]);

    useEffect(() => {
        setOpenOrders(findsNull('end', productionOrderContext.state.list));
    },[productionOrderContext.state.list]);

    useEffect(() => {
        const operator_id = JSON.parse(localStorage.getItem('is_operator')) ? Number(localStorage.getItem('operator_id')) : 0;
        const date = new Date();
        const now = new Date();
        date.setDate(date.getDate() - 7);
        const url = `reports/withdrawals_per_day/?operator=${operator_id}&initial_date=${date.toISOString()}&final_date=${now.toISOString()}`;
        axiosInstance.get(url).then(({data}) => {
            setWithdrawalsPerDay({
               labels: data.map((item) => formatDate(new Date(item.date), false)),
               title: 'Quant. Tiragens por Dia na Semana',
               datasets: [
                {
                    title: '',
                    data: data.map((item) => item.total)
                }
               ]
            });
        });
    },[]);

    const handleClick = () => {
        navigate(`/consult/production_orders/?operator_id=${operator_id}&fineshed=false`);
    }

    return( 
        <>
            <SectionContainer isMobile={isMobile}>
                <CardContainer isMobile={isMobile}>
                    <IconCard 
                        text={`Você possui ${openOrders.length} ordems em aberto`} 
                        type={'PRIMARY'}
                        icon={<MdPendingActions/>}
                        handleClick={handleClick}
                    />
                    <Wrapper/>
                    <IconCard/>
                    <Wrapper/>
                    <IconCard/>
                    <Wrapper/>
                    <IconCard/>
                </CardContainer>
                <FirstChartContainer isMobile={isMobile}>
                    <BarModel data={withdrawalsPerDay && withdrawalsPerDay} height={325} width={575}/>
                </FirstChartContainer>
            </SectionContainer>
            <SectionContainer>
                <LineModel data={withdrawalsPerDay && withdrawalsPerDay} height={325} width={575}/>  
            </SectionContainer>
        </>
    );
}

export default HomePage;
