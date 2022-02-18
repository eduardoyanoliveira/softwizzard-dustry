import styled, { css } from "styled-components";

export const MainContent = styled.main`
    ${({mobile}) => css`
        height: ${mobile ? '92vh' :  'calc( 100vh - 60px)'};
        width: ${mobile ? '93%' :  'calc(95% - 250px)'};
        margin: ${mobile ? '0 auto' : '60px auto 0 auto'};
    `}

    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
    width: 0;
    }

`;