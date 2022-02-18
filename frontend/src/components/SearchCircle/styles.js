import styled, { css } from "styled-components";

export const CircleButton = styled.button`
    ${({ theme, small}) => css`
        height: ${small ? '36px' : '60px'};
        width: ${small ? '40px' : '64px'};
        font-size: ${small ? '1.1em' : '2.2em'};
        background: ${theme.colors.primary};
    `}
   
    display: flex;
    justify-content: center;
    align-items: center;

    color: #fff;
    background: ${({background}) => background};
    cursor: pointer;
    outline: 0;
    border: 0;
    border-radius: 50%;

`;
