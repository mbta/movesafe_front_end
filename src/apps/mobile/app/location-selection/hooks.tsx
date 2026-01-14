import { useState } from "react";
import { ScreenNames } from "@repo/constants/screens";
import { useQuery } from "@tanstack/react-query";
import { fetchInspectionForms, fetchLines, fetchYards } from "./actions";
import { IInspectionForm, ILine, IYard, SelectOption } from "@repo/models";
import useLinesStore from "../stores/line.store";
import useYardsStore from "../stores/yard.store";
import { useRouter } from "next/navigation";
import useAuthStore from "../stores/auth.store";
import { StorageNames } from "@repo/constants/constants";

export default function useLocationSelection() {
  const router = useRouter();
  const { lines, setLines, selectedLine, setSelectedLine } = useLinesStore();
  const { yards, setYards, selectedYard, setSelectedYard } = useYardsStore();
  const { authToken, isAuthenticated, userGroups } = useAuthStore();
  const [line, setLine] = useState<ILine | null>(null);
  const [yard, setYard] = useState<IYard | null>(null);
  const [showNotAuthorizedToast, setShowNotAuthorizedToast] = useState<boolean>(false);

  const downloadInspectionForms = async (): Promise<IInspectionForm[]> => {
    const inspectionForms: IInspectionForm[] = await fetchInspectionForms(
      authToken ?? ""
    );

    if (typeof window !== "undefined")
      localStorage.setItem(
        StorageNames.inspectionForms,
        JSON.stringify(inspectionForms)
      );

    return inspectionForms;
  };

  const { data: formsData } = useQuery({
    queryKey: ["inspectionForms"],
    queryFn: () => downloadInspectionForms(),
    enabled: isAuthenticated,
  });

  const isApplyBtnDisabled: boolean = !line || !yard;

  const loadLineData = async (): Promise<ILine[]> => {
    const lines: ILine[] = await fetchLines(authToken ?? "");
    setLines(lines);
    return lines;
  };

  const loadYardData = async (selectedLineId: string): Promise<IYard[]> => {
    const yards: IYard[] = await fetchYards(selectedLineId, authToken ?? "");
    setYards(yards);
    return yards;
  };

  const { isFetching: isFetchingLineData } = useQuery({
    queryKey: ["lines"],
    queryFn: () => loadLineData(),
    enabled: isAuthenticated,
  });

  const { isFetching: isFetchingYardData } = useQuery({
    queryKey: ["yards", line],
    queryFn: () => loadYardData(line?.id ?? ""),
    enabled: !!line,
  });

  const lineSelectData: SelectOption<ILine>[] =
    lines?.map((e: ILine) => {
      return {
        value: e,
        label: e.name,
      };
    }) ?? [];

  const yardSelectData: SelectOption<IYard>[] =
    yards?.map((e: IYard) => {
      return {
        value: e,
        label: e.name,
      };
    }) ?? [];

  const applyLocationSelection = (): void => {
    const isYardMotorpersonUser: boolean =
    userGroups.find((g) => g.includes("Yard MotorPerson")) !== undefined;

    if (line && yard) {
      setSelectedLine(line);
      setSelectedYard(yard);
      if (isYardMotorpersonUser)
        router.push(ScreenNames.taskPanel);
      else
        setShowNotAuthorizedToast(true);
    }
  };

  return {
    lines,
    setLines,
    yards,
    setYards,
    selectedLine,
    setSelectedLine,
    selectedYard,
    setSelectedYard,
    isFetchingLineData,
    isFetchingYardData,
    lineSelectData,
    yardSelectData,
    isApplyBtnDisabled,
    applyLocationSelection,
    line,
    setLine,
    yard,
    setYard,
    showNotAuthorizedToast,
    setShowNotAuthorizedToast
  };
}
