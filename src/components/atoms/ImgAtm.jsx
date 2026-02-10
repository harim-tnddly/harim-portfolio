const ImgAtm = ({ srcProps, altProps }) => {
  console.log("srcProps : ", srcProps);
  console.log("altProps : ", altProps);
  return <img className="img-root" src={srcProps} alt={altProps} />;
};
export default ImgAtm;
