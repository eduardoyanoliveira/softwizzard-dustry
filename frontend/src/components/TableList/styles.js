import styled, { css } from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    ${({theme, maxWidth, margin}) => css`
        max-width: ${maxWidth};
        margin: ${margin};
        background: ${theme.colors.backgroundLight};
    `}

    width: 100%;
    border-radius: 10px;
`;

export const TableContainer = styled.div`
    width: 95%;
`;

export const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    width: 100%;
    ${({theme}) => css`
        color: ${theme.colors.componentTitle};
        ${theme.fonts.subitlte};
    `}
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    height: 248px;
    border-radius: 10px;
    width: 90%;

    ${({theme}) => css`
        background: ${theme.colors.background};
    `}
`;

export const InputContainer = styled.div`
    width: 80%;
    margin-top: 15px;
`;


export const RequiredMsg = styled.label`
    ${({theme}) => css`
        color: ${theme.colors.warning};
        ${theme.fonts.subitlte};
    `}
`;