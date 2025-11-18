"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IconContext } from "react-icons";
import { MdToday } from "react-icons/md";
import { colors, metrics } from "@repo/themes";
import { StyledDatePickerContainer } from "./styles";

interface CalendarRangeProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateSelected: (dates: [Date | null, Date | null]) => void;
}

const calendarStyle = {
  position: "absolute" as React.CSSProperties["position"],
  top: "22%",
  pointerEvents: "none" as React.CSSProperties["pointerEvents"],
  right: "5%",
};

const CalendarRange: React.FC<CalendarRangeProps> = ({ 
  startDate,
  endDate,
  onDateSelected
}: CalendarRangeProps) => {
  return (
    <StyledDatePickerContainer>
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={onDateSelected}
        maxDate={new Date()}
      />
      <IconContext.Provider value={{ style: calendarStyle }}>
        <MdToday size={metrics.iconSize} color={colors.primaryBlue} />
      </IconContext.Provider>
    </StyledDatePickerContainer>
  );
};

export default CalendarRange;
