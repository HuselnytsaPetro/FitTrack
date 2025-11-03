import styles from "./Button.module.css";
import clsx from "clsx";

export function Button({
    onClick,
    className,
    children = "Start Free Trial",
    type = "button", 
    variant = "primary",
    disabled = false,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx(styles.button, styles[variant], className)} 
        >
            {children}
        </button>
    );
}