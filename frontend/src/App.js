import "./main.scss";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import Store from "./store";
import UserDashboard from "./components/Dashboard/UserDashboard";
import PrivateRoute from "./privateRoute/PrivateRoute";
import RouteLinks from "./privateRoute/RouteLinks";
import NotFound from "./components/NotFound";
import CreatePost from "./components/CreatePost/CreatePost";
import EditPost from "./components/EditPost/EditPost";
import EditImage from "./components/EditPost/EditImage";
import UpdateUserName from "./components/UpdateUserActivity/UpdateUserName";
import ChangeUserPassword from "./components/UpdateUserActivity/ChangeUserPassword";
import Details from "./components/PostDetails/Details";
import Footer from "./components/Footer/Footer";


function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home/:page" exact component={Home} />
          <Route path="/details/:id" exact component={Details} />
          <RouteLinks path="/login" exact component={Login} />
          <RouteLinks path="/register" exact component={Register} />
          <PrivateRoute path="/userDashboard/:page?" exact component={UserDashboard} />
          <PrivateRoute path="/createPost" exact component={CreatePost} />
          <PrivateRoute path="/editPost/:id" exact component={EditPost} />
          <PrivateRoute path="/updateImage/:id" exact component={EditImage} />
          <PrivateRoute path="/updateName" exact component={UpdateUserName} />
          <PrivateRoute path="/updatePassword" exact component={ChangeUserPassword} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
