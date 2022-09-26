import { forwardRef, HTMLInputTypeAttribute } from "react";
import styles from "./input-box.module.scss";

type IProps = {
  extraClasses?: string;
  icon: any;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  value?: string;
  required?: boolean;
  readonly?: boolean;
  id?: string;
  onClickIcon?: () => void;
};

const InputBox = forwardRef<HTMLInputElement, IProps>(
  (
    {
      icon,
      placeholder,
      type,
      extraClasses = "",
      value,
      required,
      readonly,
      id,
      onClickIcon,
    },
    ref
  ) => {
    return (
      <div className={`${styles["box"]} ${extraClasses}`}>
        <input
          ref={ref}
          id={id}
          className={styles["box__input"]}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          readOnly={readonly}
        />
        <img
          className={styles["box__icon"]}
          alt={placeholder}
          src={icon}
          onClick={onClickIcon}
        />
      </div>
    );
  }
);

export default InputBox;
