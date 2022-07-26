import React, { InputHTMLAttributes, ChangeEvent } from "react";

interface Props extends Omit<InputHTMLAttributes<any>, "onChange"> {
  className?: string;
  onChange: (value: string) => void;
}

const Input = (props: Props) => {
  const { className, children, onChange, ...rest } = props;

  // const rootClassName = cn(s.root, {}, className);

  // Uninstall classname and types?

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
    return null;
  };

  return (
    <input
      className={className}
      onChange={handleOnChange}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      {...rest}
    />
  );
};

export default Input;
