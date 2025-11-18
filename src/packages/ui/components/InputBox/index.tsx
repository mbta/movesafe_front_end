"use client";
import React, { ChangeEvent } from "react";
import { DefaultInput, InputTitle } from "./styles";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  initialValue?: string;
  inputTitle?: string;
  size?: "large" | "regular" | "small" | "login";
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputBox: React.FC<InputProps> = ({
  inputTitle,
  type,
  placeholder,
  value,
  size = "large",
  onChange,
  initialValue,
}) => {
  return (
    <>
      {inputTitle && <InputTitle size={size}>{inputTitle}</InputTitle>}
      <DefaultInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        defaultValue={initialValue}
        size={size}
      />
    </>
  );
};

export default InputBox;
