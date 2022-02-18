import styled, { css } from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 250px;
    ${({theme, maxwidth, margin}) => css`
        max-width: ${maxwidth};
        margin: ${margin};
        background: ${theme.colors.backgroundLight};
    `}
    width: 100%;
    margin: ${({margin}) => margin};
    border-radius: 10px;

`;

export const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    width: 100%;

    ${({theme}) => css`
        color: ${theme.colors.componentTitle};
        ${theme.fonts.subitlte};
    `}

`;

export const CenterContainer = styled.div`
    width: 95%;
    padding: 4px 0;

    overflow-x: hidden;
    overflow-y: auto;
  
    &::-webkit-scrollbar {
      width: 4px;
    }
  
    /* Handle */
    &::-webkit-scrollbar-thumb {
        ${({theme}) => css`
            background: ${theme.colors.fontDisabled};
        `}  
        border-radius: 2px;
    }
`;

export const RequiredMsg = styled.label`
    ${({theme}) => css`
        color: ${theme.colors.warning};
        ${theme.fonts.subitlte};
    `}
`;

export const TextArea = styled.textarea`
    height: 180px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    ${({theme}) => css`
        color: ${theme.colors.fontHighEmphasis};
        background: ${theme.colors.backgroundLight};
        ${theme.fonts.body};
    `}

    text-indent: 18px;
    outline: 0;
    border: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden; 
    padding: 10px 0;
    border-radius: 10px;
`;
