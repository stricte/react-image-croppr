import React from 'react';

const Img = React.forwardRef((props, ref) => (
  <React.Fragment>
    {props.src && <img ref={ref} src={props.src} alt='' style={{ maxWidth: '100%' }} />}
  </React.Fragment>
));

export default Img;
