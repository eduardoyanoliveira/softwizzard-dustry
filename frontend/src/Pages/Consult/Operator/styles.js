import styled, { css } from 'styled-components';

export const  SearchHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  padding: 10px 0;
  margin: 20px 0 0 0;

  ${({theme}) => css`
    background: ${theme.colors.background};
  `}
`;

export const  HeaderRow = styled.div`
  display: flex;
  justify-content: center;

  ${({isMobile}) => css`
    flex-direction: ${isMobile ? 'column' : 'row'};
  `}
 
  width: 98%;
`;

export const  Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  ${({isMobile, isTablet}) => css`
    flex-direction: ${isTablet ? 'column' : isMobile ? 'column' : 'row'};
  `}
`;

export const  ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({isMobile}) => css`
    width: ${isMobile ? '' : '140px'};
  `}
`;

export const  Wrapper = styled.div`
  height: 20px;
  width: 40px;
`;

export const  BodyContainer = styled.div`
  width: 100%;
  margin:0 0 30px 0;
`;