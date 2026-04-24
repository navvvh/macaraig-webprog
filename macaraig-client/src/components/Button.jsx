import { Link } from 'react-router-dom';

const variantClasses = {
  primary: 'bg-orange-600 text-black border-white hover:bg-orange-700',
  secondary: 'bg-transparent text-white border-zinc-700 hover:border-orange-600 hover:text-orange-500',
};

const Button = ({
  children,
  to,
  type = 'button',
  variant = 'secondary',
  className = '',
}) => {
  const classes = [
    'inline-flex items-center justify-center rounded-full border-2 px-6 py-3 text-[10px] font-black uppercase tracking-[0.24em] transition-all duration-300',
    variantClasses[variant] ?? variantClasses.secondary,
    className,
  ]
    .join(' ')
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
};

export default Button;