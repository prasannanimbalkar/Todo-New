import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService.js";
import LogoutComponent from "./LogoutComponent.js";
import HeaderComponent from "./HeaderComponent.js";
import FooterComponent from "./FooterComponent.js";
import {
  useNavigate,
  useParams,
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

class TodoApp extends Component {
  render() {
    return (
      <div>
        <Router>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<LoginComponentWithNavigation />} />
            <Route path="/login" element={<LoginComponentWithNavigation />} />
            <Route path="/logout" element={<LogoutComponent />} />
            <Route
              path="/welcome/:name"
              element={<WelcomeComponentWithParams />}
            />
            <Route path="/todos" element={<ListTodosComponent />} />
            <Route path="*" element={<ErrorComponent />} />
          </Routes>
          <FooterComponent />
        </Router>
      </div>
    );
  }
}





class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "Enter Name",
      password: "default",
      hasLoginFailed: false,
      showSuccessMessage: false
    };
  }

  //generic handleChange
  handleChange = (event) => {
    console.log(this.state);
    console.log("called from generic handle");
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  loginClicked = () => {
    if (this.state.username === "Admin" && this.state.password === "default") {
      // this.setState({
      //   showSuccessMessage: true,
      //   hasLoginFailed: false
      // });
      AuthenticationService.registerSuccessfulLogin(
        this.state.username,
        this.state.password
      );
      this.props.navigate(`/welcome/${this.state.username}`);
    } else {
      this.setState({
        showSuccessMessage: false,
        hasLoginFailed: true
      });
    }
    console.log(this.state);
  };

  render() {
    return (
      <div className="container">
        <div>
          {" "}
          UserName :{" "}
          <input
            type="text"
            name="username"
            value={this.state.username}
            // onChange={this.handleUsernameChange}
            onChange={this.handleChange}
          />
        </div>
        <div>
          {" "}
          Password :{" "}
          <input
            type="password"
            name="password"
            value={this.state.password}
            // onChange={this.handlePasswordChange}
            onChange={this.handleChange}
          />
        </div>
        {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed} /> */}
        {this.state.hasLoginFailed && (
          <div className="alert alert-warning">Invalid Credentials</div>
        )}
        {/* <ShowSuccess showSuccessMessage={this.state.showSuccessMessage} /> */}
        {this.state.showSuccessMessage && (
          <div className="alert alert-success">Login Success</div>
        )}
        <button className="btn btn-success" onClick={this.loginClicked}>
          Login
        </button>
      </div>
    );
  }
}

// function ShowInvalidCredentials(props) {
//   if (props.hasLoginFailed) {
//     return <div>Invalid Credentials</div>;
//   }
// }

// function ShowSuccess(props) {
//   if (props.showSuccessMessage) {
//     return <div>Login Success</div>;
//   }
// }

//welcome username display
function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class WelcomeComponent extends Component {
  render() {
    return (
      <div>
        Welcome {this.props.params.name}. You can manage your Todos
        <Link to="/todos"> Here</Link>.
      </div>
    );
  }
}

const WelcomeComponentWithParams = withParams(WelcomeComponent);

//login Navigation
function withNavigation(Component) {
  return (props) => <Component {...props} navigate={useNavigate()} />;
}

const LoginComponentWithNavigation = withNavigation(LoginComponent);

//error page
function ErrorComponent() {
  return (
    <div>
      An Error Occurred. I don't know what to do! Contact support at
      abcd-efgh-ijkl
    </div>
  );
}

//List Todos
class ListTodosComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          description: "Learn React",
          done: false,
          targetDate: new Date()
        },
        {
          id: 2,
          description: "Learn Node",
          done: false,
          targetDate: new Date()
        },
        { id: 3, description: "Learn DSA", done: false, targetDate: new Date() }
      ]
    };
  }

  render() {
    return (
      <>
        <h1> Todos List </h1>
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                {/* <th>id</th> */}
                <th>description</th>
                <th>Is Compleated?</th>
                <th>Target </th>
              </tr>
            </thead>
            <tbody>
              {/* mapping the todos array to display in table using arrow function */}
              {this.state.todos.map((todos) => (
                <tr>
                  {/* <td>{todos.id}</td> */}
                  <td>{todos.description}</td>
                  <td>{todos.done.toString()}</td>
                  <td>{todos.targetDate.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}



export default TodoApp;
