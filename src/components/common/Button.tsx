import React, { ButtonHTMLAttributes } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'gradient';
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    loading?: boolean;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    loading = false,
    children,
    disabled,
    className = '',
    ...props
}) => {
    const classNames = [
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        fullWidth && 'btn-full-width',
        loading && 'btn-loading',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button className={classNames} disabled={disabled || loading} {...props}>
            {loading ? (
                <span className="btn-spinner"></span>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
