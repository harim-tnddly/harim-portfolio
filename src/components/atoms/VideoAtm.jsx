const VideoAtm = ({ srcProps }) => {
  return (
    <>
      <video
        src={srcProps}
        className="video-root"
        autoPlay
        playsInline
        muted
        loop
      ></video>
    </>
  );
};

export default VideoAtm;
