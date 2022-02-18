import styled, { css, keyframes } from "styled-components";

const Rotate = keyframes`
    to{
        transform: rotate(1turn)
    }
`;

export const LoadIcon = styled.div`
    animation: ${Rotate} 1.2s infinite;
    ${({theme}) => css`
        border: .8rem solid ${theme.colors.backgroundDark};
        border-top-color:  ${theme.colors.primary};
    `}
  
    width: 6.5rem;
    height: 6.5rem;
    border-radius: 50%;
    margin: auto auto;
`;