import styled, { css } from "styled-components";

export const Container = styled.div`
    height: 70px;
    width: 100%;
    ${({ theme, margin, maxWidth }) => css`
        max-width: ${maxWidth};
        margin: ${margin};
        background: ${theme.colors.backgroundLight};
    `}
    border-radius: 7px;
`;

export const Header = styled.span`
    height: 32px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    ${({ theme }) => css`
        color: ${theme.colors.componentTitle};
        ${theme.fonts.subtitle};
    `}
`;

export const RequiredMsg = styled.label`
    ${({ theme }) => css`
        color: ${theme.colors.warning};
        ${theme.fonts.subtitle};
    `}
`;

