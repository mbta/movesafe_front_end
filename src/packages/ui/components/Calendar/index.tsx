"use client";
import { colors, metrics } from "@repo/themes";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IconContext } from "react-icons";
import { MdToday } from "react-icons/md";
import { DatePickerOverrides, StyledDatePickerContainer } from "./styles";

interface CalendarProps {
  startDate: Date | null;
  onDateSelected: (date: Date | null) => void;
}

const calendarStyle = {
  position: "absolute" as React.CSSProperties["position"],
  top: "22%",
  pointerEvents: "none" as React.CSSProperties["pointerEvents"],
  right: "5%",
};

const Calendar: React.FC<CalendarProps> = ({
  startDate,
  onDateSelected,
}: CalendarProps) => {
  return (
    <StyledDatePickerContainer>
      <DatePickerOverrides />
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => onDateSelected(date)}
        maxDate={new Date()}
        popperPlacement="bottom-end"
      />
      <IconContext.Provider value={{ style: calendarStyle }}>
        <MdToday size={metrics.iconSize} color={colors.primaryBlue} />
      </IconContext.Provider>
    </StyledDatePickerContainer>
  );
};

export default Calendar;
