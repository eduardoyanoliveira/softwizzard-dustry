import styled, { css } from "styled-components";

export const Input = styled.input`
    ${({ theme, height, background }) => css`
        height: ${height};
        color: ${theme.colors.fontHighEmphasis};
        background: ${theme.colors[background]};
        ${theme.fonts.body};
    `}

    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-indent: 18px;
    outline: 0;
    border: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden; 
    border-radius: 10px;

    &::placeholder{
        ${({ theme }) => css`
            color: ${theme.colors.fontDisabled};
        `}
    }

    &::-webkit-inner-spin-button { 
        -webkit-appearance: none; 
    }
    
    -moz-appearance:textfield;

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus{
        ${({theme, background}) => css`
            -webkit-box-shadow: 0 0 0px 1000px ${background ? background : theme.colors.bakgroundLight} inset !important;
            -webkit-text-fill-color: ${theme.colors.fontHighEmphasis} !important;
        `}
    }

`;