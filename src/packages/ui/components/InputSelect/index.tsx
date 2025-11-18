"use client";
import React, { useState } from "react";
import { InputTitle, DataListInput, Content } from "./styles";
import messages from "@repo/constants/messages";

interface IHasId {
  id: string;
}

interface InputProps<T extends IHasId> {
  inputTitle?: string;
  onChange: (value: T | string) => void;
  options: SelectOption<T>[];
  disabled?: boolean;
  placeholder?: string;
  size?: string;
  width?: string;
  value?: string | null | undefined;
}

interface SelectOption<T> {
  value: T;
  label: string;
}

const InputSelect = <T extends IHasId>({
  inputTitle,
  onChange,
  options,
  disabled = false,
  placeholder,
  size = "small",
  width,
  value,
}: InputProps<T>) => {
  const [inputValue, setInputValue] = useState<string>("");

  const inputId = inputTitle + Math.random().toString();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOption = options.find((option) => {
      return option.value.id === event.target.value;
    });
    if (selectedOption) {
      setInputValue(selectedOption.label);
      onChange(selectedOption.value);
    } else {
      setInputValue(event.target.value);
      onChange(event.target.value);
    }
  };

  return (
    <Content $width={width}>
      {inputTitle && <InputTitle>{inputTitle}</InputTitle>}
      <DataListInput
        value={value ?? ""}
        list={inputId}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder ? placeholder : messages.Labels.select}
        $size={size}
      />
      <datalist id={inputId}>
        {options.map((option) => (
          <option value={option.label} key={option.value.id} />
        ))}
      </datalist>
    </Content>
  );
};

export default InputSelect;
