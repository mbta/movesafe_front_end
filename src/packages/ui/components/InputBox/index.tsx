"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { DefaultInput, InputTitle, LimitWarningText } from "./styles";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  initialValue?: string;
  inputTitle?: string;
  size?: "large" | "regular" | "small" | "login";
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  limitMessage?: string;
}

const InputBox: React.FC<InputProps> = ({
  inputTitle,
  type,
  placeholder,
  value,
  size = "large",
  onChange,
  initialValue,
  maxLength,
  limitMessage,
}) => {
  const [currentLength, setCurrentLength] = useState<number>(
    value?.length || initialValue?.length || 0
  );

  useEffect(() => {
    if (value !== undefined) {
      setCurrentLength(value.length);
    }
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentLength(event.target.value.length);
    if (onChange) onChange(event);
  };

  return (
    <>
      {inputTitle && <InputTitle size={size}>{inputTitle}</InputTitle>}
      <DefaultInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        defaultValue={initialValue}
        size={size}
        maxLength={maxLength}
      />
      {maxLength && currentLength >= maxLength && limitMessage && (
        <LimitWarningText>{limitMessage}</LimitWarningText>
      )}
    </>
  );
};

export default InputBox;
