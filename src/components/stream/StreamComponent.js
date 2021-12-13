import React, { Component } from 'react';
import './StreamComponent.css';
import OvVideoComponent from './OvVideo';

import MicOff from '@material-ui/icons/MicOff';
import VideocamOff from '@material-ui/icons/VideocamOff';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeOff from '@material-ui/icons/VolumeOff';

import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import HighlightOff from '@material-ui/icons/HighlightOff';
import FormHelperText from '@material-ui/core/FormHelperText';

export default class StreamComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { nickname: this.props.user.getNickname(), showForm: false, mutedSound: false, isFormValid: true };
        this.handleChange = this.handleChange.bind(this);
        this.handlePressKey = this.handlePressKey.bind(this);
        this.toggleNicknameForm = this.toggleNicknameForm.bind(this);
        this.toggleSound = this.toggleSound.bind(this);
        this.toggleZoom = this.toggleZoom.bind(this);
        this.fullScreenView = this.fullScreenView.bind(this);
    }

    handleChange(event) {
        this.setState({ nickname: event.target.value });
        event.preventDefault();
    }

    toggleNicknameForm() {
        if (this.props.user.isLocal()) {
            this.setState({ showForm: !this.state.showForm });
        }
    }

    toggleSound() {
        this.setState({ mutedSound: !this.state.mutedSound });
    }

    toggleZoom() {
        this.setState({ mutedSound: !this.state.mutedSound });
        //console.log("hello");
    }

    handlePressKey(event) {
        if (event.key === 'Enter') {
            console.log(this.state.nickname);
            if (this.state.nickname.length >= 3 && this.state.nickname.length <= 20) {
                this.props.handleNickname(this.state.nickname);
                this.toggleNicknameForm();
                this.setState({ isFormValid: true });
            } else {
                this.setState({ isFormValid: false });
            }
        }
    }
    fullScreenView(){
        //this.props.toggleFullscreen();
        const document = window.document;
        const fs = document.getElementById('container');
        if (
            !document.fullscreenElement &&
            !document.mozFullScreenElement &&
            !document.webkitFullscreenElement &&
            !document.msFullscreenElement
        ) {
            if (fs.requestFullscreen) {
                fs.requestFullscreen();
            } else if (fs.msRequestFullscreen) {
                fs.msRequestFullscreen();
            } else if (fs.mozRequestFullScreen) {
                fs.mozRequestFullScreen();
            } else if (fs.webkitRequestFullscreen) {
                fs.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

    handleClick(oevnt) {
        debugger
      var element =  oevnt.currentTarget;
    //  if(element.classList.contains("col")){
    //     element.classList.remove("col");
    //     element.classList.add("col-12");
    //     element.classList.add("col-md-8");
    //  }
    //  else{
    //     element.classList.add("col");
    //     element.classList.remove("col-12");
    //     element.classList.remove("col-md-8");
    //  }
     var childnodes = oevnt.currentTarget.parentElement.childNodes
     var i = 0;
     var html="";
     childnodes.forEach(function(ele){
        if(ele==element){
            ele.classList.remove("OT_widget-containerDemo");
            ele.classList.remove("col");
        ele.classList.add("col-12");
      //  ele.classList.add("col-md-8");
        }
        else{
            ele.classList.add("OT_widget-containerDemo");
            ele.style.right=(1+(20*i))+"%"  
            ele.classList.remove("col");
        ele.classList.remove("col-12");
      //  ele.classList.remove("col-md-8");
        i = i+1;

           
        }
     });     

        // var demo = document.getElementById("demo");
        // demo.classList.remove("flex-containerDemo");
        // demo.classList.add("flex-container");
        // var demodemo = document.getElementById("demodemo");
        // demodemo.classList.remove("OT_widget-containerDemo");
        // demodemo.classList.add("OT_widget-container");
     }
  

    render() {
        console.log('prop received: ', this.props);
        return (

            <div id="demodemo" onClick={this.handleClick}  className={(this.props.index+2 % 4 == 0 ? 'col' : 'col')}>
	             {/* BEG: nickname BOX */}
                <div className="pointer nickname"> 
                    {this.state.showForm ? (
                        <FormControl id="nicknameForm">
                            <IconButton color="inherit" id="closeButton" onClick={this.toggleNicknameForm}>
                                <HighlightOff />
                            </IconButton>
                            <InputLabel htmlFor="name-simple" id="label">
                                Nickname
                            </InputLabel>
                            <Input
                                color="inherit"
                                id="input"
                                value={this.state.nickname}
                                onChange={this.handleChange}
                                onKeyPress={this.handlePressKey}
                                required
                            />
                            {!this.state.isFormValid && this.state.nickname.length <= 3 && (
                                <FormHelperText id="name-error-text">Nickname is too short!</FormHelperText>
                            )}
                            {!this.state.isFormValid && this.state.nickname.length >= 20 && (
                                <FormHelperText id="name-error-text">Nickname is too long!</FormHelperText>
                            )}
                        </FormControl>
                    ) : (
                        <div onClick={this.toggleNicknameForm}>
                            <span id="nickname">{this.props.user.getNickname()}</span>
                            {this.props.user.isLocal() && <span id=""> (edit)</span>}
                        </div>
                    )}
                </div>  {/*END: nickname BOX */}

                {this.props.user !== undefined && this.props.user.getStreamManager() !== undefined ? (
                    <div className="streamComponent">
                        <OvVideoComponent user={this.props.user} fullScreenView={this.fullScreenView} mutedSound={this.state.mutedSound} />
                        {/* <div id="statusIcons"> 
                            {!this.props.user.isVideoActive() ? (
                                <div id="camIcon">
                                    <VideocamOff id="statusCam" />
                                </div>
                            ) : null}

                            {!this.props.user.isAudioActive() ? (
                                <div id="micIcon">
                                    <MicOff id="statusMic" />
                                </div>
                            ) : null}
                        </div> */}
                        {/* <div>
                            {!this.props.user.isLocal() && (
                                <IconButton id="volumeButton" onClick={this.toggleSound}>
                                    {this.state.mutedSound ? <VolumeOff color="secondary" /> : <VolumeUp />}
                                </IconButton>
                            )}
                        </div> */}
                        <div>
                        {/*(
                                <IconButton id="streamSizeButton"  onClick={this.toggleZoom}>
                                    
                                 <ZoomInIcon/> <ZoomOutIcon/>


                            </IconButton>
                        )*/}
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}
