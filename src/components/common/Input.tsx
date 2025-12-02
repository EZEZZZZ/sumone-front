import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import './Input.css';

interface BaseInputProps {
    label?: string;
    error?: string;
    helperText?: string;
    showCharCount?: boolean;
    maxLength?: number;
}

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement>, BaseInputProps {
    multiline?: false;
}

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseInputProps {
    multiline: true;
}

type InputProps = InputFieldProps | TextareaFieldProps;

const Input: React.FC<InputProps> = ({
    label,
    error,
    helperText,
    showCharCount,
    maxLength,
    multiline,
    className = '',
    ...props
}) => {
    const [charCount, setCharCount] = React.useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (showCharCount) {
            setCharCount(e.target.value.length);
        }
        if (multiline && 'onChange' in props) {
            (props.onChange as any)?.(e);
        } else if (!multiline && 'onChange' in props) {
            (props.onChange as any)?.(e);
        }
    };

    const inputClassName = [
        'input-field',
        error && 'input-error',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className="input-wrapper">
            {label && <label className="input-label">{label}</label>}

            {multiline ? (
                <textarea
                    {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    className={inputClassName}
                    maxLength={maxLength}
                    onChange={handleChange}
                />
            ) : (
                <input
                    {...(props as InputHTMLAttributes<HTMLInputElement>)}
                    className={inputClassName}
                    maxLength={maxLength}
                    onChange={handleChange}
                />
            )}

            <div className="input-footer">
                {error && <span className="input-error-text">{error}</span>}
                {!error && helperText && <span className="input-helper-text">{helperText}</span>}
                {showCharCount && maxLength && (
                    <span className="input-char-count">
                        {charCount}/{maxLength}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Input;
