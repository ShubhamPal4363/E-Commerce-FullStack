import React from 'react';
import Showbrand from './Showbrand';
import Rightside from './Rightside';

function Appuser() {
  return (
    <>
      {/* <Showcategory /> */}
      <div className="container">
        <div className="row gap-1 mt-2">
          <div className="col-3">
            <Showbrand />
          </div>
          <div className="col-8">
            <Rightside />
          </div>
        </div>
      </div>
    </>
  )
}

export default Appuser
