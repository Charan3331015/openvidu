import React, { Component } from 'react';
import './StreamComponent.css';

export default class OvVideoComponent extends Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
        this.fullScreenView = this.fullScreenView.bind(this);
    }

    fullScreenView(){
       // console.log(this.props.fullScreenView())
        this.props.fullScreenView();
    }

    componentDidMount() {
        if (this.props && this.props.user.streamManager && !!this.videoRef) {
            console.log('PROPS: ', this.props);
            this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
        }

        if (this.props && this.props.user.streamManager.session && this.props.user && !!this.videoRef) {
            this.props.user.streamManager.session.on('signal:userChanged', (event) => {
                const data = JSON.parse(event.data);
                if (data.isScreenShareActive !== undefined) {
                    this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
                }
            });
        }
    }

    componentDidUpdate(props) {
        if (props && !!this.videoRef) {
            this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
        }
    }

    render() {
        return (
            <video
                autoPlay={true}
                id={'video-' + this.props.user.getStreamManager().stream.streamId}
                ref={this.videoRef}
                // onDoubleClick={this.fullScreenView}
                width={'100%'}
                muted={this.props.mutedSound}  //we can pass in this.props //the isZoomed=true/false  thus toggle BigWindow-vs-SmallWindow
            />
        );
    }
}
