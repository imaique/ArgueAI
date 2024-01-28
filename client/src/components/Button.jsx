const Button = ({ className, style, id, children, ...props }) => {
    return (
      <button
        type="button"
        className={`btn btn-rounded ${className}`}
        id={id}
        style={style}
        {...props}
      >
        {children}
      </button>
    );
  };

export default Button