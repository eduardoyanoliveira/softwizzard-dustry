import styled, { css } from "styled-components";

export const SectionContainer = styled.div`
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    ${({isMobile}) => css`
        flex-direction: ${isMobile ? 'column' : 'row'};
    `}
`;

export const CardContainer = styled.div`
    display: flex;
    ${({isMobile}) => css`
        justify-content: ${!isMobile &&'space-between'};
        width: ${isMobile ? '100%' : '40%'};
    `}

    align-items: center;
    flex-direction: column;
`;

export const FirstChartContainer = styled.div`
    display: flex;

    ${({isMobile}) => css`
        justify-content: ${isMobile && 'space-between'};  
        margin-top: ${isMobile && '30px'};
        width: ${isMobile ? '100%' : '55%'};
    `}
    height: 100%;
`;

export const Wrapper = styled.div`
    width: 50px;
    height: 10px;
`;
