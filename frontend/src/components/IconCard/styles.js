import styled, { css } from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    height: 70px;
    border-radius: 20px;
    ${({theme}) => css`
        background: ${theme.colors.background};
    `}
`;

export const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    font-size: 1.6em;
    ${({background, color}) => css`
        background: ${background};
        color: ${color};
    `}
   
    padding: 0 10px;
    border-radius: 10px;
    margin-left: 10px;
`;

export const Text = styled.label`
    ${({theme}) => css`
        color: ${theme.colors.fontMediumEmphasis};
        ${theme.fonts.subtitleTwo};
    `}
    margin-right: 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden; 

    &:hover{
        ${({hcolor}) => css`
            color: ${hcolor};
        `}
        cursor: pointer;
    }
`;
