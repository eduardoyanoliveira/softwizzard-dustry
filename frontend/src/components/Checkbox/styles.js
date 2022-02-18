import styled, { css } from "styled-components";

export const Icon = styled.div`
    ${({theme, active}) => css`
        color: ${active ? theme.colors.primary : theme.colors.fontDisabled};
    `}
    cursor: pointer;
`;