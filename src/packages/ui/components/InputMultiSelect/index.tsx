"use client";
import { colors } from "@repo/themes";
import Select, { MultiValue } from "react-select";
import { Content, InputTitle } from "./styles";

interface IHasId {
  id: string;
}

interface InputProps<T extends IHasId> {
  inputTitle?: string;
  onChange: (value: T[]) => void;
  options: SelectOption<T>[];
  disabled?: boolean;
  placeholder?: string;
  width?: string;
  height?: string;
  value?: SelectOption<T>[];
  placeholderSize?: string;
}

interface SelectOption<T> {
  value: T;
  label: string;
}

const customStyles = (placeholderSize?: string, height?: string) => ({
  control: (base: any) => ({
    ...base,
    border: `1px solid ${colors.primaryBlue}`,
    borderRadius: "4px",
    padding: "0px",
    minHeight: height || "32px",
  }),
  valueContainer: (base: any) => ({
    ...base,
    display: "flex",
    flexWrap: "wrap",
    gap: "4px",
    padding: "4px",
    maxHeight: "80px",
    overflowY: "auto",
  }),
  placeholder: (base: any) => ({
    ...base,
    fontSize: placeholderSize || "14px",
    color: "gray",
  }),
  multiValue: (base: any) => ({
    ...base,
    padding: "0px",
    borderRadius: "4px",
    height: "20px",
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: "black",
    fontSize: "11px",
  }),
  multiValueRemove: (base: any) => ({
    ...base,

    ":hover": {
      backgroundColor: colors.primaryBlue,
      color: "white",
    },
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    color: "black",
  }),
  clearIndicator: (base: any) => ({
    ...base,
    color: "black",
  }),
});

const InputMultiSelect = <T extends IHasId>({
  inputTitle,
  onChange,
  options,
  disabled = false,
  placeholder,
  width,
  height,
  value,
  placeholderSize,
}: InputProps<T>) => {
  return (
    <Content $width={width} $height={height}>
      {inputTitle && <InputTitle>{inputTitle}</InputTitle>}
      <Select
        isMulti
        name={inputTitle}
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        isDisabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={(selectedOptions: MultiValue<SelectOption<T>>) => {
          const values = selectedOptions.map(
            (option: SelectOption<T>) => option.value
          );
          onChange(values);
        }}
        styles={customStyles(placeholderSize, height)}
      />
    </Content>
  );
};

export default InputMultiSelect;
