import styled, { css } from "styled-components";

export const Container = styled.div`
    width: 100%;
    max-width: 600px;
    height: 319px;
    margin: 150px auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    ${({theme}) => css`
        background: ${theme.colors.background};
    `}

    border-radius: 10px;
    box-shadow: 1px 2px 2px rgba(0, 0, 0, .2);
`;

export const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    color: #fff;

    ${({ theme, background}) => css`
        background: ${theme.colors[background]};
        ${theme.fonts.headerFive};
    `}
    
    border-radius: 10px 10px 0 0;
`;

export const Message = styled.p`
    width: 90%;
    text-align: center;

    ${({theme}) => css`
        color: ${theme.colors.fontMediumEmphasis};
        ${theme.fonts.subtitle};
    `}
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95%;
    margin-bottom: 15px;
`;