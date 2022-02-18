import styled, { css } from "styled-components";


export const LoginScreen = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({theme}) => css`
    background: ${theme.colors.background};
  `}
`;

export const MainFormContainer = styled.div`
    ${({mainWidth}) => css`
        width: ${mainWidth};
    `}
  
    max-width: 820px;
    margin-bottom: 50px;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: max-content;
    width: 90%;
    max-width: 520px;
    margin: 10px auto 10px auto;

    ${({theme}) => css`
        color: ${theme.colors.fontMediumEmphasis};
        ${theme.fonts.headerFour};
    `}

`;


export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 0;
    border-radius: 15px;
`;

export const Container = styled.div`
    display: flex;
    width: 100%;
    max-width: 520px;
    justify-content: space-between;
`;
