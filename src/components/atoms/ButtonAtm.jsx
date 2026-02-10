const ButtonAtm = ({ srcProps, children, onClick, active }) => {
  if (!srcProps && !children) return null;

  return (
    <button className={`button-root glass-box ${active ? 'active-glow' : ''}`} onClick={onClick}>
      <div className="btn-border-glow"></div>
      {/* 아이콘이 있으면 렌더 */}
      {srcProps && <img className="button-icon" src={srcProps} alt="" />}

      {/* 텍스트가 있으면 렌더 */}
      {children && <span className="button-text">{children}</span>}
    </button>
  );
};

export default ButtonAtm;
