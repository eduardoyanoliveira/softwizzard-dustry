import styled, { css } from "styled-components";

export const DesktopNav = styled.div`
    position: fixed;
    top: 0;
    left: 250px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(97vw - 250px);
    height: 60px;
    padding: 0 20px;

`;

export const LogoContainer = styled.div`
    ${({showLogo}) => css`
        display: ${showLogo ? 'flex' : 'none' };
    `}
    width: 149px;
    justify-content: center;
    height: 100%;
    margin: 0 40px 10px 0;
    align-items: center;
`;
