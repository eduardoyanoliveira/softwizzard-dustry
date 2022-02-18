import React , { useContext } from 'react';
import {HashRouter as Router} from 'react-router-dom';
import { SidebarData } from '../../SideBarData';
import { SidebarDataOperator } from '../../SideBarDataOperator';

import { DimensionsContext } from '../../contexts/Dimensions/context';

import MobileMenuProvider from '../../contexts/MobileMenuProvider';
import MenuComponent from '../../components/Menu';
import MobileNavComponent from '../../components/MobileNav';
import MainContentComponent from '../../components/MainContent';
import PageComponent from '../../components/PageComponent';
import DestopNavComponent from '../../components/DesktopNav';



function AppComponent({children}) {

    const dimensionsContext = useContext(DimensionsContext);

    let mobile = true;

    switch(dimensionsContext){
        case 'SMALL':{
            mobile = true;
            break;
        }
        case 'MOBILE':{
            mobile = true;
            break;
        }
        case 'TABLET':{
            mobile = true;
            break;
        }
        case 'MEDIUM':{
            mobile = true;
            break;
        }
        default:{
            mobile = false;
        }
    }

    
  let menuData = JSON.parse(localStorage.getItem('is_operator')) ? SidebarDataOperator : SidebarData;

    return (
        <PageComponent mobile={mobile}>
            <Router>
                <MobileMenuProvider>
                    {mobile ? 
                        (  
                            <MobileNavComponent showLogo={true}/>
                        )
                        :
                        (
                            <DestopNavComponent />
                        )
                    
                    } 
                    <MenuComponent mobile={mobile} menuData={menuData}/>
                </MobileMenuProvider>
                <MainContentComponent mobile={mobile}>
                        {children}
                </MainContentComponent>
            </Router>
        </PageComponent>
    )
}

export default AppComponent;
