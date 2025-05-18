
type ButtonType = {
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonType> = ({className, children, onClick, disabled}) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>{children}</button>
  )
}

export default Button