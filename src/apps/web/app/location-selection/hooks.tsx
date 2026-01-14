import { ScreenNames } from "@repo/constants/screens";
import { ILine, IYard, SelectOption } from "@repo/models";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import useAuthStore from "../stores/auth.store";
import useLinesStore from "../stores/line.store";
import useYardsStore from "../stores/yard.store";
import { fetchLines, fetchYards } from "./actions";

export default function useLocationSelection() {
  const router = useRouter();
  const { lines, setLines, setSelectedLine } = useLinesStore();
  const { yards, setYards, setSelectedYard } = useYardsStore();
  const [line, setLine] = useState<ILine | null>(null);
  const [yard, setYard] = useState<IYard | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showNotAuthorizedToast, setShowNotAuthorizedToast] =
    useState<boolean>(false);

  const { userGroups, isAuthenticated, authToken } = useAuthStore();

  useLayoutEffect(() => {
    if (!isAuthenticated) return;
    if (lines.length === 0) return;

    const isManagementUser: boolean =
      userGroups.find((g) => g.includes("Management")) !== undefined;

    if (isManagementUser) {
      router.push(ScreenNames.managementDashboard);
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, lines]);

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
    const isManagementUser: boolean =
      userGroups.find((g) => g.includes("Management")) !== undefined;
    const isYardMasterUser: boolean =
      userGroups.find((g) => g.includes("Yardmaster")) !== undefined;

    if (line && yard) {
      setSelectedLine(line);
      setSelectedYard(yard);
    }

    if (isYardMasterUser) router.push(ScreenNames.yardDashboard);
    else if (isManagementUser) router.push(ScreenNames.managementDashboard);
    else setShowNotAuthorizedToast(true);
  };

  return {
    lines,
    setLines,
    yards,
    setYards,
    setSelectedLine,
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
    isLoading,
    showNotAuthorizedToast,
    setShowNotAuthorizedToast,
  };
}
