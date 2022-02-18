import styled, { css } from "styled-components";

export const Container = styled.div`
    ${({theme, hasTitle, margin }) => css`
        height: ${hasTitle ? '70px' : '38px'};
        margin: ${margin};
        background: ${theme.colors.backgroundLight};
    `}
    max-width: 520px;
    width: 100%;
    border-radius: 7px;
`;

export const Header = styled.span`
    height: 32px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    ${({theme}) => css`
        color: ${theme.colors.componentTitle};
        ${theme.fonts.subtitle};
    `}
`;

export const Content = styled.div`
    height: 38px;
    width: 100%;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden; 
    ${({theme}) => css`
        color: ${theme.colors.fontHighEmphasis};
        ${theme.fonts.headerSix};
    `}
`;

