import Papa from "papaparse";
import { FormsShortNames, TableHeaders } from "@repo/constants/constants";
import { IInspection, IMove } from "@repo/models";
import useFormattedDate from "../useFormatDate";
import useFormatString from "../useFormatString";

function useExportToCsv() {
  const dateFormatter = useFormattedDate();
  const fileNameFormatter = useFormatString();

  function formatString(value: string | undefined | null): string {
    return value ?? "-";
  }

  function validateForms(
    inspections: IInspection[],
    inspectionsUser: { name: string; badge_number: string } | null
  ) {
    if (!inspectionsUser) {
      return ["Not yet", "Not yet", "Not yet", "Not yet"];
    }

    const formStatuses = FormsShortNames.map((formName) => {
      return inspections.some(
        (inspection) => inspection.inspection_form.short_name === formName
      )
        ? "Yes"
        : "Not applicable";
    });

    return formStatuses;
  }

  function formatDataToExport(moves: IMove[]): string[][] {
    return moves.map((move) => {
      const sortedMoveCars = move.move_cars.sort(
        (a, b) => a.pair_order - b.pair_order
      );
      const firstPair = sortedMoveCars[0]
        ? `${
            sortedMoveCars[0].first_car
              ? sortedMoveCars[0].first_car.series_number
              : "-"
          } ${
            sortedMoveCars[0].second_car
              ? sortedMoveCars[0].second_car.series_number
              : "-"
          }`
        : "-";
      const secondPair = sortedMoveCars[1]
        ? `${
            sortedMoveCars[1].first_car
              ? sortedMoveCars[1].first_car.series_number
              : "-"
          } ${
            sortedMoveCars[1].second_car
              ? sortedMoveCars[1].second_car.series_number
              : "-"
          }`
        : "-";
      const thirdPair = sortedMoveCars[2]
        ? `${
            sortedMoveCars[2].first_car
              ? sortedMoveCars[2].first_car.series_number
              : "-"
          } ${
            sortedMoveCars[2].second_car
              ? sortedMoveCars[2].second_car.series_number
              : "-"
          }`
        : "-";

      const inspectionsUser = move.inspections_done_by_user;
      const inspectionsUserString = inspectionsUser
        ? `${inspectionsUser.badge_number}-${inspectionsUser.name}`
        : "-";

      const yardName = formatString(move.yard.name);
      const lineName = formatString(move.yard.line?.name);
      const yardmasterBadgeNumber = formatString(move.yardmaster_user?.badge_number);

      const [
        circleCheckStatus,
        safetyInspectionStatus,
        eviStatus,
        preTripStatus,
      ] = validateForms(move.inspections, move.inspections_done_by_user);

      return [
        dateFormatter.formatSlashDate(move.created_at),
        dateFormatter.formatAmPmTime(move.created_at),
        lineName,
        yardName,
        yardmasterBadgeNumber,
        inspectionsUserString,
        firstPair,
        secondPair,
        thirdPair,
        move.move_from,
        move.move_to,
        move.move_reason.name,
        circleCheckStatus,
        safetyInspectionStatus,
        eviStatus,
        preTripStatus,
        move.status,
      ];
    });
  }

  const exportToCSV = (data: IMove[], date: Date | null) => {
    const dataToExport = {
      fields: TableHeaders,
      data: formatDataToExport(data),
    };

    const csv = Papa.unparse(dataToExport);
    const fileName = fileNameFormatter.setFileName("csv", date);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return { exportToCSV };
}

export default useExportToCsv;
