import styled, { css } from "styled-components";


export const Container = styled.div`
    margin-top: 70px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
`;

export const Bars = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    ${({theme}) => css`
        color: ${theme.colors.primary};
    `}
    font-size: 1.7rem;
    cursor: pointer;
`;

export const ThemeSwitcher = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    ${({theme}) => css`
        color: ${theme.colors.fontDisabled};
    `}
    font-size: 1.7rem;
    cursor: pointer;
`;

export const LogOut = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    ${({theme}) => css`
        color: ${theme.colors.fontMediumEmphasis};
        ${theme.fonts.subtitle};
    `}
    cursor: pointer;

    &:hover{
        ${({theme}) => css`
            color: ${theme.colors.primary};
        `}
    }
`;