import messages from "@repo/constants/messages";
import { useFormatDate } from "..";

function useFormatString() {
  const dateFormatter = useFormatDate();

  function formatReasonName(input: string): string {
    const formattedReason = input
      ? input
          .toLowerCase()
          .split(" ")
          .map((word) => {
            if (word.toLowerCase() === "evi") return "EVI";
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" ")
      : "";
    return formattedReason;
  }

  function setFileName(fileType: string, date: Date | null): string {
    const formattedDate = dateFormatter.formatDate(
      date?.toString() ?? undefined
    );
    const fileName = `${formattedDate}-moves.${fileType}`;
    return fileName;
  }

  function toCapitalLetter(input: string): string {
    let formattedString = input.replace(/_/g, " ");
    formattedString = formattedString.replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
    return formattedString;
  }

  function hasRepeatedChars(input: string): boolean {
    if (!input || input.trim().length === 0) return true;

    let specialCharCount = 0;

    for (let i = 1; i < input.length; i++) {
        const currentChar = input[i];
        const previousChar = input[i - 1];
        if (!/^[a-zA-Z0-9]$/.test(currentChar) && currentChar === previousChar) {
            specialCharCount++;
            if (specialCharCount >= 2) return true;
        } else {
            specialCharCount = 0;
        }
    }
    return false;
  }

  function formatYardRole(role: string): string {
    return role
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  function formatEmployeeAction(action: string): string {
    return action
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return { 
    formatReasonName, 
    setFileName, 
    toCapitalLetter, 
    hasRepeatedChars, 
    formatYardRole,
    formatEmployeeAction
  };
}

export default useFormatString;
