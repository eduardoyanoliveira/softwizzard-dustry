import styled, { css } from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 8px 8px;
    border-radius: 10px;

    ${({theme, background, width}) => css`
        background:  ${theme.colors[background]};
        width: ${width};
    `}
  
    color: #fff;

    cursor: pointer;
`;
