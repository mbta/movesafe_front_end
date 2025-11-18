import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchMovesByDate,
  fetchMoveReasons,
  fetchCars,
  fetchYardMotorpersons,
  sendMoveApi,
} from "./actions";
import { SHORT_REFETCH_TIME } from "@repo/constants/constants";
import { ICreateMove, IYard } from "@repo/models";
import useYardsStore from "../stores/yard.store";
import useAuthStore from "../stores/auth.store";

export const useMoveOrder: string[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
];

export const useMoveDetails = () => {
  const [selectedInspectionId, setSelectedInspectionsId] = useState<
    string | null
  >(null);
  const [detailsOpened, setDetailsOpened] = useState<boolean>(false);

  const handleDetailsClick = (id: string): void => {
    setSelectedInspectionsId(id);
    setDetailsOpened(true);
  };

  return {
    selectedInspectionId,
    detailsOpened,
    handleDetailsClick,
  };
};

export const useSelectedDate = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateSelected = (date: Date | null) => {
    setSelectedDate(date);
  };

  return { selectedDate, handleDateSelected };
};

export const useMovesData = (
  selectedDate: Date | null,
  selectedYardId: string
) => {
  const formattedDate = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : "";

  const { authToken } = useAuthStore();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [formattedDate, selectedYardId]);

  const { data: movesData, isLoading: movesLoading } = useQuery({
    queryKey: ["movesData", formattedDate, currentPage, authToken],
    queryFn: () =>
      fetchMovesByDate(
        formattedDate,
        selectedYardId,
        currentPage,
        authToken ?? ""
      ),
    enabled: !!formattedDate && !!selectedYardId && !!authToken,
    refetchInterval: SHORT_REFETCH_TIME,
  });

  return {
    movesData,
    movesLoading,
    currentPage,
    setCurrentPage,
  };
};

export const useMoveReasons = () => {
  const selectedYard: IYard | null = useYardsStore(
    (state) => state.selectedYard
  );
  const { authToken } = useAuthStore();
  return useQuery({
    queryKey: ["moveReasons"],
    queryFn: () =>
      fetchMoveReasons(!selectedYard?.is_main_yard, authToken ?? ""),
    enabled: !!selectedYard,
  });
};

export const useCars = (lineId: any) => {
  const { authToken } = useAuthStore();
  return useQuery({
    queryKey: ["cars", lineId],
    queryFn: () => fetchCars(lineId, authToken ?? ""),
    enabled: !!lineId,
  });
};

export const useMotorpersons = (lineId: any) => {
  const { authToken } = useAuthStore();
  return useQuery({
    queryKey: ["yardMotorpersons", lineId],
    queryFn: () => fetchYardMotorpersons(lineId, authToken ?? ""),
    enabled: !!lineId,
  });
};

export const useSendMove = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { authToken } = useAuthStore();

  const onSend = async (data: ICreateMove[]): Promise<void> => {
    setIsLoading(true);

    if (data.find(dataItem => !dataItem.move_cars.length)) {
      setIsLoading(false);
      setShowErrorToast(true);
    }

    const response = await sendMoveApi(data, authToken ?? "");

    if ("errorMessage" in response) {
      setIsLoading(false);
      setShowErrorToast(true);
      return;
    }

    setIsLoading(false);
    setShowSuccessToast(true);
    setIsModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ["movesData"] });
  };

  return {
    isLoading,
    onSend,
    showErrorToast,
    setShowErrorToast,
    showSuccessToast,
    setShowSuccessToast,
    isModalOpen,
    setIsModalOpen,
  };
};
