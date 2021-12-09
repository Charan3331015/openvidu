import React, { Component } from 'react';
import './ToolbarComponent.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import Videocam from '@material-ui/icons/Videocam';
import FlipCamera from '@material-ui/icons/CameraRear';
import VideocamOff from '@material-ui/icons/VideocamOff';
import Fullscreen from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import PictureInPicture from '@material-ui/icons/PictureInPicture';
import ScreenShare from '@material-ui/icons/ScreenShare';
import StopScreenShare from '@material-ui/icons/StopScreenShare';
import Tooltip from '@material-ui/core/Tooltip';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';

import IconButton from '@material-ui/core/IconButton';

const logo = require('../../assets/images/openvidu_logo.png');

export default class ToolbarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { fullscreen: false };
        this.camStatusChanged = this.camStatusChanged.bind(this);
        this.micStatusChanged = this.micStatusChanged.bind(this);
        this.screenShare = this.screenShare.bind(this);
        this.stopScreenShare = this.stopScreenShare.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
    }


    micStatusChanged() {
        this.props.micStatusChanged();
    }

    camStatusChanged() {
        this.props.camStatusChanged();
    }

    screenShare() {
        this.props.screenShare();
    }

    stopScreenShare() {
        this.props.stopScreenShare();
    }

    toggleFullscreen() {
        this.setState({ fullscreen: !this.state.fullscreen });
        this.props.toggleFullscreen();
    }

    leaveSession() {
        this.props.leaveSession();
    }

    getSwitchCameraButton() {

        const devices = this.props.getCamerasList()
        const localUser = this.props.user;

        if (localUser && localUser.isVideoActive() && devices ) { //&& devices.length > 1) {
            return (

	           <Tooltip title="Switch Camera">  
                <IconButton color="inherit" className="navButton" id="navCamSwitchButton" onClick={this.props.camSwitch}>
                        <FlipCamera />  
                </IconButton>
	           </Tooltip>
            )
        } else {
            return null;
        }
    }
    render() {
        const mySessionId = this.props.sessionId;
        const localUser = this.props.user;
        return (
            //<AppBar className="toolbar" id="header">
            <AppBar className="toolbar" id="footer">
                <Toolbar className="toolbar">

                    <div className="buttonsContent">
	                   <Tooltip title={localUser !== undefined && localUser.isAudioActive()? "Disable Audio": "Enable Audio"}>  
                        <IconButton color="inherit" className="navButton" id="navMicButton" onClick={this.micStatusChanged}>
                            {localUser !== undefined && localUser.isAudioActive() ? <Mic /> : <MicOff color="secondary" />}
                        </IconButton>
	                   </Tooltip>
	                    <Tooltip title={localUser !== undefined && localUser.isVideoActive()? "Disable Video": "Enable Video"}>  
                        <IconButton color="inherit" className="navButton" id="navCamButton" onClick={this.camStatusChanged}>
                            {localUser !== undefined && localUser.isVideoActive() ? (
                                <Videocam />
                            ) : (
                                    <VideocamOff color="secondary" />
                                )}
                        </IconButton>
	                    </Tooltip>


                        {this.getSwitchCameraButton()}

	                    <Tooltip title="Share Screen">  
                        <IconButton color="inherit" className="navButton" onClick={this.screenShare}>
                            {localUser !== undefined && localUser.isScreenShareActive() ? <PictureInPicture /> : <ScreenShare />}
                        </IconButton>
	                    </Tooltip>

                        {localUser !== undefined &&
                            localUser.isScreenShareActive() && (

	                            <Tooltip title="Stop Sharing">  
                                <IconButton onClick={this.stopScreenShare} id="navScreenButton">
                                    <StopScreenShare color="secondary" />
                                </IconButton>
			                       </Tooltip>
                            )}

	                    {/* <Tooltip title="Toggle Fullscreen">  
                        <IconButton color="inherit" className="navButton" onClick={this.toggleFullscreen}>
                            {localUser !== undefined && this.state.fullscreen ? <FullscreenExit /> : <Fullscreen />}
                        </IconButton>
	                    </Tooltip> */}

	                    <Tooltip title="Exit Room">  
                        <IconButton color="secondary" className="navButton" onClick={this.leaveSession} id="navLeaveButton">
                            <PowerSettingsNew />
                        </IconButton>
	                    </Tooltip>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}
