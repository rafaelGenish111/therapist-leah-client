
const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'default',
  hover = false,
  ...props 
}) => {
  const classes = [
    'card',
    `card--${variant}`,
    `card--padding-${padding}`,
    hover && 'card--hover',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;