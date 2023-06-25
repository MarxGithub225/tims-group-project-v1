import React from "react";
import { Spinner } from "reactstrap";

function ProgressingComponent() {
  return <div
      style={{
        fontSize: 16,
        fontWeight: 700,
        padding: 24,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
  ><span style={{color: '#263238'}}>Laden </span>
    <Spinner style={{color: 'orange', zIndex: 1000, marginLeft: 8, marginTop: 3}} size={16} color="inherit"/>
  </div>;
}

export default ProgressingComponent;
