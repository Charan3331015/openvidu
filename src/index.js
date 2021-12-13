import React from 'react';
import ReactDOM from 'react-dom';
 import './index.css';
 import 'bootstrap/dist/css/bootstrap.min.css';
import VideoRoomComponent from './components/toolbar/VideoRoomComponent';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route,Router, Switch } from 'react-router-dom';
function initVideoCallRoom (elementID, props) {
  ReactDOM.render(
    <BrowserRouter>
    <VideoRoomComponent {...props} /></BrowserRouter>, document.getElementById(elementID)
  );
  registerServiceWorker();
}

window.initVideoCallRoom = initVideoCallRoom;

export default initVideoCallRoom
