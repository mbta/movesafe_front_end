import { IMoveDetails, IPDFData } from "@repo/models";
import { useFormatDate } from "..";
import { MoveCar } from "@repo/models";

function useExportToPdf() {
  const dateFormatter = useFormatDate();

  function getCarsPairs(moveCars: MoveCar[]): { pairs: string[] } {
    const sortedMoveCars = moveCars.sort((a, b) => a.pair_order - b.pair_order).filter((e) => !!e);
    const topThree = sortedMoveCars.slice(0, 3);
    const pairs = topThree.map(
      (moveCar) =>
        `${moveCar.first_car.series_number}${moveCar.second_car ? " - " : ""}${moveCar.second_car ? moveCar.second_car?.series_number : ""}`
    );
    return { pairs };
  }

  function checkCarProblems(
    carSerials: string[],
    problemSerials: any
  ): boolean[] {
    const defectCars = Array.isArray(problemSerials) ? problemSerials : [];
    return carSerials.map((serial) => defectCars.includes(serial));
  }

  function getOrderedCarSeries(carPairs: MoveCar[]): string[] {
    carPairs.sort((a, b) => a.pair_order - b.pair_order);

    const orderedSeries: string[] = [];
    carPairs.forEach((pair) => {
      orderedSeries.push(pair.first_car.series_number);
      if (pair.second_car) orderedSeries.push(pair.second_car?.series_number);
    });

    return orderedSeries;
  }

  function exportToPdf(data: IMoveDetails) {
    const topThreePairs = getCarsPairs(data.move_cars);
    const employeeNameAndBadge = data.inspections_done_by_user
      ? `#${data.inspections_done_by_user.badge_number} - ${data.inspections_done_by_user.name}`
      : "-";

    const formattedData: IPDFData = {
      reason: `${data.move_reason.name}`,
      yard: `${data.yard.name}`,
      yardmaster: data.yardmaster_user
        ? `#${data.yardmaster_user.badge_number} - ${data.yardmaster_user.name}`
        : "-",
      employeeBadge: employeeNameAndBadge,
      date: dateFormatter.formatSlashDate(`${data.created_at}`),
      time: dateFormatter.formatAmPmTime(`${data.created_at}`),
      fromTo: `${data.move_from} - ${data.move_to}`,
      first: "",
      second: "",
      third: "",
      orderedMoveCars: getOrderedCarSeries(data.move_cars),
      inspections: data.inspections,
      signatures: data.signatures,
      employeeHistory: data.audit_logs,
    };

    if (topThreePairs.pairs.length > 0)
      formattedData.first = topThreePairs.pairs[0];
    if (topThreePairs.pairs.length > 1)
      formattedData.second = topThreePairs.pairs[1];
    if (topThreePairs.pairs.length > 2)
      formattedData.third = topThreePairs.pairs[2];

    return formattedData;
  }

  return { exportToPdf, checkCarProblems };
}

export default useExportToPdf;
