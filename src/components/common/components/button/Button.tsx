import React, { ButtonHTMLAttributes, } from "react"

import s from './Button.module.css'

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
    return (
        <button className={s.button} {...props}>
            {children}
        </button>
    )
}