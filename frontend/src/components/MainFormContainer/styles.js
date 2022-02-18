import styled, { css } from "styled-components";

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${({mainWidth}) => css`
        width: ${mainWidth};
    `}
    
    margin: 0 auto;
`;

export const Form = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    ${({isMobile}) => css`
        max-width: ${isMobile ? '100%' : '620px'};
    `}
    
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    width: 100%;

    ${({theme, isMobile}) => css`
        max-width: ${isMobile ? '100%' : '620px'};
        background: ${theme.colors.background};
        padding: ${isMobile ? '20px 20px' : '25px 0'} ;
    `}

    min-height: 300px;
    border-radius: 10px;
    
`;

