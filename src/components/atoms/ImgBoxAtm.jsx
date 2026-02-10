const ImgBoxAtm = ({ styleProps }) => {
  return (
    <div
      className="image-box-root"
      style={{ backgroundImage: `url(${styleProps})`, backgroundSize: "cover" }}
    ></div>
  );
};
export default ImgBoxAtm;
