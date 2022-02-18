import styled, { css } from "styled-components";

export  const Page = styled.div`
    ${({mobile}) => css`
        display: ${mobile ? 'block' :  'flex'};
    `}

    height: 100vh;
    width: 100vw;

    ${({theme}) => css`
        background: ${theme.title === 'light' 
        ? (
            theme.colors.backgroundLight
        ) 
        : (
            theme.colors.backgroundDark
        )};
    `}
`;