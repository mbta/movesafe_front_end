import { MoveStatus } from "@repo/constants/constants";
import messages from "@repo/constants/messages";
import { colors } from "@repo/themes";

function useStatus() {
  function moveStatusName(status: string): string {
    switch (status.toLowerCase()) {
      case MoveStatus.waiting:
        return messages.Status.waiting;
      case MoveStatus.pending_checklist:
        return messages.Status.pending_checklist;
      case MoveStatus.pending_move:
        return messages.Status.pending_move;
      case MoveStatus.pending_yardmaster_signature:
        return messages.Status.pending_yardmaster_signature;
      case MoveStatus.inspection_failed_pending_signature:
        return messages.Status.inspection_failed_pending_signature;
      case MoveStatus.inspection_failed:
        return messages.Status.inspection_failed;
      case MoveStatus.done:
        return messages.Status.done;
      case MoveStatus.cancelled:
        return messages.Status.cancelled;
      default:
        return messages.Status.default;
    }
  }

  function moveStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case MoveStatus.waiting:
        return colors.royalBlue;
      case MoveStatus.pending_checklist:
      case MoveStatus.pending_move:
      case MoveStatus.pending_yardmaster_signature:
      case MoveStatus.inspection_failed_pending_signature:
        return colors.darkYellow;
      case MoveStatus.done:
        return colors.kellyGreen;
      case MoveStatus.cancelled:
      case MoveStatus.inspection_failed:
        return colors.red;
      default:
        return colors.gray;
    }
  }

  const moveStatusStyles = (status: string) => {
    switch (status) {
      case MoveStatus.waiting:
        return {
          background: colors.pastelBlue,
          color: colors.darkBlue,
          text: "Waiting",
        };
      case MoveStatus.pending_checklist:
        return {
          background: colors.lightYellow,
          color: colors.darkYellow,
          text: "Pending Checklist",
        };
      case MoveStatus.pending_move:
        return {
          background: colors.lightYellow,
          color: colors.darkYellow,
          text: "Pending Move",
        };
      case MoveStatus.pending_yardmaster_signature:
        return {
          background: colors.lightYellow,
          color: colors.darkYellow,
          text: "Pending Yardmaster Signature",
        };
      case MoveStatus.done:
        return {
          background: colors.mintCreamGreen,
          color: colors.forestGreen,
          text: "Completed",
        };
      case MoveStatus.cancelled:
        return {
          background: colors.lightRed,
          color: colors.red,
          text: "Canceled Move",
        };
      case MoveStatus.inspection_failed:
        return {
          background: colors.lightRed,
          color: colors.red,
          text: "Inspection Failed",
        };
      case MoveStatus.inspection_failed_pending_signature:
        return {
          background: colors.lightYellow,
          color: colors.darkYellow,
          text: "Inspection Failed - Pending Signature",
        };
      default:
        return {
          background: colors.softGray,
          color: colors.black,
          text: "Unknown",
        };
    }
  };

  const yardLineColor = (line: string) => {
    const initials = line
      .split(" ")
      .map((word) => word[0])
      .join("");

    let color = "#000";
    switch (initials) {
      case "RL":
        color = "#da291c";
        break;
      case "OL":
        color = "#ed8b00";
        break;
      case "GL":
        color = "#00843d";
        break;
      case "BL":
        color = "#003da5";
        break;
    }

    return { color, initials };
  };

  const moveStatusList = [
    "waiting",
    "pending_checklist",
    "pending_move",
    "pending_yardmaster_signature",
    "done",
    "cancelled",
    "inspection_failed",
    "inspection_failed_pending_signature",
  ];

  return {
    moveStatusName,
    moveStatusColor,
    moveStatusStyles,
    yardLineColor,
    moveStatusList,
  };
}

export default useStatus;
