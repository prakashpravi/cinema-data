import * as React from "react";
import RouterApp from "../router/index";

class Root extends React.Component {
   render() {
    return (
      <div className="warpper">
        <RouterApp />
      </div>
    );
  }
}

export default Root;