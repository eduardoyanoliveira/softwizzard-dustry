import styled, { css } from "styled-components";

export const Button = styled.button`
    width: 100%;
    ${({theme, maxwidth, margin, background}) => css`
        max-width: ${maxwidth};
        margin: ${margin};
        background: ${theme.colors[background]};
        ${theme.fonts.body};
    `}
    
    height: 60px;
    color: #FFF;
    border-radius: 5px;
    cursor: pointer;

`;
