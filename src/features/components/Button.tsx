import Link from "next/link";
import React from "react";
import styles from "./Button.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({ children, href, disabled }) => {
  if (href) {
    return (
      <Link href={href}>
        <a className={cx("button", { disabled })}>{children}</a>
      </Link>
    );
  }

  return <button className={cx("button", { disabled })}>{children}</button>;
};

export default Button;
