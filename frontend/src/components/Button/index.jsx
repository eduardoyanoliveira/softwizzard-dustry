import React from 'react';
import { Button } from './styles';

function GenericButton({handleClick, text, background, margin, maxwidth = '520px'}) {

  return (
    <Button
      margin={margin}
      maxwidth={maxwidth}
      background={background}
      onClick={handleClick}
    >
      {text}
    </Button>
  )
}

export default React.memo(GenericButton);
