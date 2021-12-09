const showLocalVideo = async () => {
    const videoTrack = await Twilio.Video.createLocalVideoTrack({
      width: 640,
      height: 480,
      frameRate: 24
    });
    document.getElementById('video').appendChild(videoTrack.attach());
  
    const bg = new Twilio.VideoProcessors.GaussianBlurBackgroundProcessor({
      assetsPath: '/',
      maskBlurRadius: 10,
      blurFilterRadius: 5,
    });
    await bg.loadModel();
    videoTrack.addProcessor(bg);
  }
  
  showLocalVideo();
  