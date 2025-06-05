import './Spinner.css';

const Spinner = ({ 
  size = 'medium', 
  color = 'primary',
  className = '',
  ...props 
}) => {
  const classes = [
    'spinner',
    `spinner--${size}`,
    `spinner--${color}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <div className="spinner__circle"></div>
    </div>
  );
};

export default Spinner;