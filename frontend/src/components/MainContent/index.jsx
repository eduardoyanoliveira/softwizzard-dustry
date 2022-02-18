import React from 'react';
import { MainContent } from './styles';


const MainContentComponent = ({ children, mobile = true}) => {

  return(
    <MainContent 
      mobile={mobile} 
    >
      {children}
    </MainContent>
  );
}

export default MainContentComponent;
