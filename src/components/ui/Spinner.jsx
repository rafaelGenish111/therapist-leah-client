import './Spinner.css';

const Spinner = ({ 
  size = 'medium', 
  color = 'primary',
  variant = 'spin', // 'spin', 'pulse', 'dots'
  className = '',
  text = null,
  centered = false,
  inline = false,
  ...props 
}) => {
  const classes = [
    'spinner',
    `spinner--${size}`,
    `spinner--${color}`,
    variant && `spinner--${variant}`,
    centered && 'spinner--centered',
    inline && 'spinner--inline',
    className
  ].filter(Boolean).join(' ');

  if (variant === 'dots') {
    return (
      <div className={classes} {...props}>
        <div className="spinner__circle"></div>
        <div className="spinner__circle"></div>
        <div className="spinner__circle"></div>
        {text && <span className="spinner-text">{text}</span>}
      </div>
    );
  }

  const spinnerContent = (
    <div className={classes} {...props}>
      <div className="spinner__circle"></div>
      {text && <span className="spinner-text">{text}</span>}
    </div>
  );

  if (text) {
    return (
      <div className="spinner-with-text">
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

export default Spinner;