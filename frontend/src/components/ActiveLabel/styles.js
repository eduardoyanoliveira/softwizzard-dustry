import styled, { css } from "styled-components";

export const Label = styled.label`
    ${({theme}) => css`
        color: ${theme.colors.fontMediumEmphasis};
        ${theme.fonts.subtitle};
    `}

`;

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0;
`;