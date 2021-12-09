import React from 'react';
import ReactDOM from 'react-dom';
 import './index.css';
 import 'bootstrap/dist/css/bootstrap.min.css';
import VideoRoomComponent from './components/toolbar/VideoRoomComponent';
import registerServiceWorker from './registerServiceWorker';

function initVideoCallRoom (elementID, props) {
  ReactDOM.render(
    <VideoRoomComponent {...props} />, document.getElementById(elementID)
  );
  registerServiceWorker();
}

window.initVideoCallRoom = initVideoCallRoom;

export default initVideoCallRoom
