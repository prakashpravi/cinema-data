import React from "react";
import { AuthContext } from "./components/context/index";
// import config from "./config";
import { networkCall } from "./hooks/networkcall";
// import { netWorkCallMethods, localStorageKeys } from "./utils";

const config={}
 const netWorkCallMethods = {
    get:'GET',
    post:'POST',
    put:'PUT',
    delete:'DELETE',
    update:'UPDATE'
}
const localStorageKeys = {
    auth_token:'auth_token'
}
class AppAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isRefreshed: false,
    };
  }
  componentDidMount() {
    this.refreshAPI();
  }

  refreshAPI() {
    if (localStorage.getItem(localStorageKeys.auth_token)) {
      networkCall(
        `${config.api_url}/auth/refresh`, //Your refresh API End Point

        netWorkCallMethods.get, //Mention your HTTP Method (GET,POST,PUT,UPDATE,DELETE) using the
        //until variable networkCallMethod

        null, //Request Body If any

        null, //Addition Header If any

        true //If true it adds Authorization key to the existing header with token from localstorage
      )
        .then((res) => {
          let token = "token";

          //TODO: Save your token to the token variable
          token = res.data.auth_token;

          //TODO: Save the token to the localstorage if you want the user
          localStorage.setItem(localStorageKeys.auth_token, token);

          this.setState({
            // TODO: Save the user detail here
            user: res.data.user,
            isRefreshed: true,
          });
        })
        .catch((res) => {
          //Authorized token removing the current token from local storage.
          localStorage.removeItem(localStorageKeys.auth_token);
          this.setState({
            isRefreshed: true,
          });
        });
    } else {
      this.setState({
        isRefreshed: true,
      });
    }
  }

  render() {
    return (
      <>
        {this.state.isRefreshed ? (
          <AuthContext.Provider
            value={{ user: this.state.user, setAuth: this.setState }}
          >
            {this.props.children}
          </AuthContext.Provider>
        ) : (
          <>Your Loader Here...</>
        )}
      </>
    );
  }
}

export default AppAuth;
