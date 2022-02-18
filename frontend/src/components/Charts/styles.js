import styled, { css } from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    ${({theme}) => css`
        background: ${theme.colors.background};
    `}

    border-radius: 10px;
`;