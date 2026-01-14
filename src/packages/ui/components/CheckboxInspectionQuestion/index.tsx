"use client";
import React, { useEffect, useState } from "react";
import { CheckboxContainer, Checker } from "./styles";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { colors, metrics } from "@repo/themes";

interface CheckboxInspectionQuestionProps {
  onChange: (checked: boolean) => void;
  hasAnswer: boolean;
}

const CheckboxInspectionQuestion: React.FC<CheckboxInspectionQuestionProps> = ({
  onChange,
  hasAnswer = false,
}) => {
  const [selectChecker, setSelectChecker] = useState<boolean>(hasAnswer);

  const handleCheckerClick = (): void => {
    onChange(!selectChecker)
    setSelectChecker(!selectChecker);
  }

  return(
    <CheckboxContainer>
      <Checker
        selected={selectChecker}
        onClick={handleCheckerClick}>
          <IoIosCloseCircleOutline
            size={metrics.iconXBig}
            color={
              selectChecker ? colors.white : colors.primaryBlue
            }
          />
      </Checker>
    </CheckboxContainer>
  );
};

export default CheckboxInspectionQuestion;
