import styled, { css } from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 520px;

    ${({background}) => css`
        background: ${background};
    `}

    margin: ${({margin}) => margin};
    border-radius: 5px;
`;

export const RequiredMsg = styled.label`
    ${({theme}) => css`
        color: ${theme.colors.warning};
        ${theme.fonts.subtitle};
    `}
`;