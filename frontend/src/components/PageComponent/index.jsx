import React from 'react';
import { Page } from './styles';

const PageComponent = ({ children, mobile = true}) => {
 
  return(
    <Page 
      mobile={mobile}
    >
      {children}
    </Page>
  )
}
export default PageComponent;
