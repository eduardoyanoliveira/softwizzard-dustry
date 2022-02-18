import React, { useContext } from 'react';
import './ProgressChart.css';
import styled from 'styled-components';

import { ThemeContext } from '../../contexts/ThemeProvider/context';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: ${({width}) => width};
    height: ${({height}) => height};
    background: ${({bgColor}) => bgColor};
    color: ${({color}) => color};
    border-radius: 15px;
`;

const Title = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    font-weight: 500;
    border-bottom:  1px solid ${({borderColor}) => borderColor};
    width: 100%;
    flex: 1;
`;

const SkillContainer = styled.div`
    flex: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom:  1px solid ${({borderColor}) => borderColor};
    width: 100%;
`;

const Outer = styled.div`
    background: ${({bgColor}) => bgColor};
`;

const Inner = styled.div`
    background: ${({bgColor}) => bgColor};
`;

const InfoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: .9rem;
    font-weight: 400;
    flex: 2;
`;

const Info = styled.div`
    display: flex;
    margin-bottom: 5px;
`;

function rand(){
    return (Math.random() * 100).toPrecision(2);
}

const ProgressChart = ({ title, firstLabel, firstValue , secondLabel, secondValue, height, width }) => {

    const theme = useContext(ThemeContext);

    return (
        <Container 
            bgColor={theme.themeState.themeColors.background} 
            color={theme.themeState.themeColors.textAlt}
            height={height}
            width={width}
        >
            <Title borderColor={theme.themeState.themeColors.backgroundDark}>
                {title}
            </Title>
            <SkillContainer borderColor={theme.themeState.themeColors.backgroundDark}>
                <div className="skill">
                    <Outer bgColor={theme.themeState.themeColors.backgroundLight} className="outer">
                        <Inner  bgColor={theme.themeState.themeColors.background} className="inner">
                        <div id="number" >
                            {rand().toString() + "%"}
                            </div> 
                        </Inner>
                    </Outer>

                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="135px" height="135px">
                        <circle cx="68" cy="68" r="56" strokeLinecap="round" />
                    </svg>      
                </div>
            </SkillContainer>
            <InfoContainer>
                <Info>
                    {firstLabel} : {firstValue}
                </Info>
                <Info>
                    {secondLabel} : {secondValue}
                </Info>
            </InfoContainer>
        </Container>
    )
};

export default ProgressChart
