"use client";
import React from "react";
import { InputTitle, SelectInput } from "./styles";
import messages from "@repo/constants/messages";
import { Tooltip } from "..";
import { MdInfoOutline } from "react-icons/md";
import { colors, metrics } from "@repo/themes";
import InformationButton from "../InformationButton";

interface IHasId {
  id?: string;
}

interface InputProps<T extends IHasId> {
  inputTitle?: string;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  disabled?: boolean;
  placeholder?: string;
  size?: string;
  value: string | null | undefined;
  showHelper?: boolean;
  onOpenModal?: () => void | undefined;
}

interface SelectOption<T> {
  value: T;
  label: string;
}

const Select = <T extends IHasId>({
  inputTitle,
  onChange,
  options,
  disabled = false,
  placeholder,
  size = "small",
  value,
  showHelper = false,
  onOpenModal = () => {},
}: InputProps<T>) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = options.find((option) => {
      return option.value.id === event.target.value;
    });
    if (selectedOption) {
      onChange(selectedOption.value);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{display: "flex", flexDirection: "row", marginBottom: "-3px"}}>
        {inputTitle && <InputTitle>{inputTitle}</InputTitle>}
        {showHelper &&
          <InformationButton onClick={onOpenModal} />
        }
      </div>
      <SelectInput
        onChange={handleChange}
        disabled={disabled}
        $size={size}
        value={value ?? ""}
      >
        <option value={undefined} key={"default-value"} className="placeholder">
          {placeholder ? placeholder : messages.Labels.select}
        </option>
        {options.map((option) => (
          <option value={option.value.id} key={option.value.id}>
            {option.label}
          </option>
        ))}
      </SelectInput>
    </div>
  );
};

export default Select;
