import { Link } from 'react-router-dom'
import styles from './Button.module.css'

/**
 * Button / Link button component.
 * variant: 'primary' | 'ghost' | 'surface'
 * size:    'sm' | 'md' | 'lg'
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  href,
  to,
  onClick,
  type = 'button',
  disabled,
  className = '',
  icon,
}) {
  const cls = [
    styles.btn,
    styles[variant],
    size !== 'md' ? styles[size] : '',
    fullWidth ? styles.fullWidth : '',
    className,
  ].filter(Boolean).join(' ')

  const content = (
    <>
      {icon && <span className="material-symbols-outlined">{icon}</span>}
      {children}
    </>
  )

  if (to) return <Link to={to} className={cls}>{content}</Link>
  if (href) return <a href={href} className={cls}>{content}</a>

  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  )
}
