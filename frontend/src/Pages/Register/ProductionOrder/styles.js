import styled, { css } from "styled-components";

export const Wrapper = styled.div`
    height: 20px;
    width: 40px;
`;

export const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width: 800px;
    margin: 0 auto;
`;

export const FormContainer = styled.div`
    width: 100%;
    border-radius: 20px;
    margin: 10px 0;
    ${({theme}) => css`
        background: ${theme.colors.background};
    `}

`;

export const FormHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px 0;
    width: 100%;
`;

export const HeaderRow = styled.div`
    display: flex;
    justify-content: center;

    ${({isMobile}) => css`
        flex-direction: ${isMobile ? 'column' : 'row'};
    `}
   
    width: 95%;
`;

export const SelectTableContainer = styled.div`
    display: flex;
    justify-content: center;

    ${({isMobile}) => css`
        align-items: ${isMobile && 'center'};
        flex-direction: ${isMobile ? 'column' : 'row'} ;
        padding: ${isMobile ? '20px 0' : '20px 15px'};
    `}
   
    width: 95%;
    margin: 0 auto;
`;

export const Container = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
`;

export const ButtonContainer = styled.div`
    display: flex;
    
    ${({selected}) => css`
        width: ${selected ? '100%' : '96%'};
    `}
    
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 95%;
`;
