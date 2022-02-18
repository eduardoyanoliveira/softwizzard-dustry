import styled, { css } from "styled-components";

export const Header = styled.div`
    width: 100%;
    ${({theme, isMobile, maxwidth}) => css`
        max-width: ${isMobile && maxwidth};
        background: ${theme.colors.background};
        color: ${theme.colors.fontMediumEmphasis};
    `}

    min-height: 60px;
    padding: 5px 0;
    margin: 30px 0 10px 0;
    border-radius: 10px;

    display: flex;
    align-items: center;
`;

export const Container = styled.div`
    margin: 0 auto;
    display: flex;
    align-items: center;

    ${({search}) => css`
        justify-content: ${search ? 'space-between' : 'center'};
    `}

    width: 93%;
`;

export const Title = styled.h5`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden; 

    ${({theme}) => css`
        ${theme.fonts.headerFive};
    `}
`;

