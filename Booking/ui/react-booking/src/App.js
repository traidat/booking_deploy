import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./component/Navbar.jsx";
import RoomOrder from "./pages/RoomOrder";
import HotelRoom from "./pages/HotelRoom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./assets/css/index.scss";
import Personal from "./pages/Personal";
import HomeAgent from "./pages/HomeAgent";
import LoginAgent from "./pages/LoginAgent";
import NavbarAgent from "./component/NavbarAgent.jsx";
import Comment from "./pages/Comment.jsx";
import AddRoom from "./pages/AddRoom.jsx";
import ModifyRoom from "./pages/ModifyRoom.jsx";
import Footer from "./component/Footer.jsx";
import Hotels from "./pages/Hotels.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ModifyHotel from "./pages/ModifyHotel.jsx";
import Tourist from "./pages/Tourist.jsx";
import Agent from "./pages/Agent";
import SignUpTourist from "./pages/SignUpTourist";
import SignUpAgent from "./pages/SignUpAgent";
import TouristFB from "./pages/TouristFB.jsx";
import CommentAgent from "./pages/CommentAgent.jsx";
import HomeMultiAgent from "./pages/HomeMultiAgent.jsx";
import Admin from "./pages/Admin.jsx";
import LoginAdmin from "./pages/LoginAdmin.jsx";
import TouristAdmin from "./pages/TouristAdmin.jsx";
import AgentAdmin from "./pages/AgentAdmin.jsx";
import Map from "./component/Map.jsx";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [tokenAdmin, setTokenAdmin] = useState(
    localStorage.getItem("tokenAdmin") || ""
  );
  const [tokenAgent, setTokenAgent] = useState(
    localStorage.getItem("tokenAgent") || ""
  );
  return (
    <React.Fragment>
      {!tokenAgent ? (
        <Navbar token={token} setToken={setToken} />
      ) : (
        <NavbarAgent
          tokenAgent={tokenAgent}
          setTokenAgent={setTokenAgent}
          tokenAdmin={tokenAdmin}
          setTokenAdmin={setTokenAdmin}
        />
      )}
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {<Home />}
          </Route>
          <Route exact path="/admin">
            {tokenAdmin ? (
              <Admin />
            ) : (
              <LoginAdmin
                setTokenAgent={setTokenAgent}
                setTokenAdmin={setTokenAdmin}
              />
            )}
          </Route>
          <Route exact path="/admin/tourist">
            {tokenAdmin ? (
              <TouristAdmin />
            ) : (
              <LoginAdmin
                setTokenAgent={setTokenAgent}
                setTokenAdmin={setTokenAdmin}
              />
            )}
          </Route>

          <Route exact path="/admin/agent">
            {tokenAdmin ? (
              <AgentAdmin />
            ) : (
              <LoginAdmin
                setTokenAgent={setTokenAgent}
                setTokenAdmin={setTokenAdmin}
              />
            )}
          </Route>

          <Route exact path="/home">
            {tokenAgent ? (
              <HomeMultiAgent />
            ) : (
              <LoginAgent setTokenAgent={setTokenAgent} />
            )}
          </Route>
          <Route exact path="/agent/hotel">
            {tokenAgent ? (
              <HomeAgent />
            ) : (
              <LoginAgent setTokenAgent={setTokenAgent} />
            )}
          </Route>
          <Route exact path="/modify">
            {tokenAgent ? (
              <ModifyRoom />
            ) : (
              <LoginAgent setTokenAgent={setTokenAgent} />
            )}
          </Route>
          <Route exact path="/modify/hotel">
            {tokenAgent ? (
              <ModifyHotel />
            ) : (
              <LoginAgent setTokenAgent={setTokenAgent} />
            )}
          </Route>
          <Route exact path="/add">
            {tokenAgent ? (
              <AddRoom />
            ) : (
              <LoginAgent setTokenAgent={setTokenAgent} />
            )}
          </Route>
          <Route exact path="/login">
            {token ? <Home /> : <Login setToken={setToken} />}
          </Route>
          <Route exact path="/signup/tourist">
            <SignUpTourist />
          </Route>
          <Route exact path="/signup/agent">
            <SignUpAgent />
          </Route>
          <Route exact path="/tourist">
            <Tourist setToken={setToken} />
          </Route>
          <Route exact path="/tourist/fb">
            <TouristFB setToken={setToken} />
          </Route>
          <Route exact path="/agent">
            <Agent />
          </Route>
          <Route exact path="/login_agent">
            {tokenAgent ? (
              <HomeMultiAgent />
            ) : (
              <LoginAgent setTokenAgent={setTokenAgent} />
            )}
          </Route>
          <Route exact path="/hotel">
            <Hotels />
          </Route>
          <Route exact path="/hotel/room">
            <HotelRoom />
          </Route>
          <Route exact path="/room">
            {token ? <RoomOrder /> : <Login setToken={setToken} />}
          </Route>
          <Route exact path="/personal">
            {token ? <Personal /> : <Login setToken={setToken} />}
          </Route>
          <Route exact path="/comment">
            {token ? <Comment /> : <Login setToken={setToken} />}
          </Route>
          <Route exact path="/personal_agent">
            {tokenAgent ? <HomeAgent /> : <LoginAgent setToken={setToken} />}
          </Route>
          <Route exact path="/test">
            {tokenAgent ? <CommentAgent /> : <LoginAgent setToken={setToken} />}
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </React.Fragment>
  );
}
export default App;
