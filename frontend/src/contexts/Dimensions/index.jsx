import Props from 'prop-types';
import { DimensionsContext } from './context';
import { useMediaQuery } from '../../Utils/useMediaQuery';


export const DimensionsProvider = ({children}) => {
  const small = useMediaQuery('(max-width: 420px)');
  const mobile = useMediaQuery('(max-width: 700px)');
  const tablet = useMediaQuery('(max-width: 900px)');
  const medium = useMediaQuery('(max-width: 1020px)');
  const large =  useMediaQuery('(max-width: 1250px)');


  const size = small ? 'SMALL' : mobile ? 'MOBILE' : tablet ? 'TABLET' : medium ? 'MEDIUM' : large ? 'LARGE' : 'ULTRA';

  return(
    <DimensionsContext.Provider value={size}>
      {children}
    </DimensionsContext.Provider>
  )

};

DimensionsProvider.propTypes = {
  children: Props.node.isRequired,
}
