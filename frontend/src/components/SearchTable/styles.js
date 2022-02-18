import styled, { css } from "styled-components";

export const Container = styled.div`
    max-width: 520px;
    margin: 100px auto;

    ${({theme}) => css`
        background: ${theme.colors.backgroundLight};
    `}

    padding: 5px 30px;
    border-radius: 15px;
    position: relative;
`;

export const Header = styled.div`
    height: 42px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;

    ${({theme}) => css`
        color: ${theme.colors.componentTitle};
    `}

`;

export const HeaderTitle = styled.h6`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden; 

    ${({theme}) => css`
        ${theme.fonts.headerSix};
    `}

`;

export const ExitButton = styled.div`
    position: absolute;
    top: 5px;
    right: 15px;
    font-size: 1.3rem;
    width: 30px;
    height: 30px;

    ${({theme}) => css`
        background: ${theme.colors.backgroundDark};
        color: ${theme.colors.fontDisabled};
    `}

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    
    cursor: pointer;

    &:hover{
        ${({theme}) => css`
            color: ${theme.colors.fontMediumEmphasis};
        `}
    }
`;


// InputSearch styles

export const SearchHeader = styled.div`
    height: 72px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const SearchField = styled.span`
    ${({theme}) => css`
        color: ${theme.colors.fontHighEmphasis};
        ${theme.fonts.subtitle};
    `}
`;


export const SearchContainer = styled.div`
    width: 100%;
    margin: 7px 0 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

export const SearchWrapper = styled.div`
    height: 20px;
    width: 30px;
`;
