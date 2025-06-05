import { forwardRef } from 'react';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  className = '',
  as: Component = 'button',
  ...props
}, ref) => {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    disabled && 'btn--disabled',
    loading && 'btn--loading',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {children}
    </Component>
  );
});

Button.displayName = 'Button';

export default Button;