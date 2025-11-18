import { useState } from "react";
import useYardsStore from "../stores/yard.store";
import { IApiError, ICreateMove, IMove, IYard } from "@repo/models";
import { useFormatDate } from "@repo/ui/hooks";
import { useRouter } from "next/navigation";
import { ScreenNames } from "@repo/constants/screens";
import useMovesStore from "../stores/move.store";
import useAuthStore from "../stores/auth.store";
import messages from "@repo/constants/messages";
import {
  LONG_REFETCH_TIME,
  SHORT_REFETCH_TIME,
} from "@repo/constants/constants";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchUnassignedMoves,
  assignMove,
  fetchMovesHistory,
  fetchPendingMove,
  sendMoveApi,
  fetchMoveReasons,
  fetchCars,
} from "./actions";

function useTaskPanel() {
  const queryClient = useQueryClient();
  const formattedDate = useFormatDate();
  const [callError, setCallError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openCancelledMoveModal, setOpenCancelledMoveModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<IMove | null>(null);
  const [currentInspectionListPage, setCurrentInspectionListPage] =
    useState<number>(1);
  const [currentHistoryPage, setCurrentHistoryPage] = useState<number>(1);
  const [currentMoveListPage, setCurrentMoveListPage] = useState<number>(1);
  const selectedYardStored = useYardsStore((state) => state.selectedYard);
  const { assignedMove, setAssignedMove } = useMovesStore();
  const { authToken } = useAuthStore();
  const router = useRouter();

  const {
    mutate,
    data: assignMoveData,
    error: assignMoveError,
    isPending: isLoadingAssignMove,
  } = useMutation({
    mutationFn: async () => assignMove(selectedTask?.id ?? "", authToken ?? ""),
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: (e: any) => {
      setCallError(true);
      setErrorMessage(e.message);
    },
    onSuccess: (data: IMove) => {
      if (data) {
        setAssignedMove(data);
      }
      queryClient.invalidateQueries({ queryKey: ["pending-moves"] });
      queryClient.invalidateQueries({ queryKey: ["unassigned_moves"] });
    },
  });

  const {
    data: moveHistoryData,
    isLoading: moveHistoryLoading,
    error: moveHistoryError,
  } = useQuery({
    queryKey: ["move-history", formattedDate.formatDate(), currentHistoryPage],
    queryFn: () =>
      fetchMovesHistory(
        formattedDate.formatDate(),
        currentHistoryPage,
        authToken ?? ""
      ),
    refetchInterval: LONG_REFETCH_TIME,
  });

  const {
    data: moveListData,
    isLoading: moveListLoading,
    error: moveListError,
  } = useQuery({
    queryKey: ["pending-moves", selectedYardStored?.id, currentMoveListPage],
    queryFn: async () => {
      let response: { data: IMove[]; pageCount: number } =
        await fetchPendingMove(
          selectedYardStored?.id,
          currentMoveListPage,
          authToken ?? ""
        );

      response.data = response.data.filter(
        (e) => e.id !== selectedTask?.id && e.id !== assignedMove?.id
      );

      return response;
    },
    refetchInterval: SHORT_REFETCH_TIME,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "unassigned_moves",
      selectedYardStored?.id,
      currentInspectionListPage,
    ],
    queryFn: () =>
      fetchUnassignedMoves(
        selectedYardStored?.id,
        currentInspectionListPage,
        authToken ?? ""
      ),
    refetchInterval: SHORT_REFETCH_TIME,
  });

  const checkCancelledMove = (move: IMove) => {
    return moveHistoryData?.data.find(item => item.id === move.id);
  }

  const unassignedCurrentTask = () => {
    setAssignedMove(null);
    setOpenCancelledMoveModal(false);
  }

  function goToForms() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(ScreenNames.inspectionForms);
    }, 500);
  }

  function goToFinishMove() {
    router.push(ScreenNames.finishMove);
  }

  function handleModalView() {
    setOpenModal(!openModal);
  }

  function assignTask() {
    setOpenModal(!openModal);

    if (assignedMove) {
      setErrorMessage(messages.Error.beforeTask);
      setCallError(true);
      return;
    }

    mutate();
  }

  return {
    data,
    error,
    loading,
    goToForms,
    callError,
    isLoading,
    openModal,
    setLoading,
    assignTask,
    errorMessage,
    setCallError,
    setOpenModal,
    openCancelledMoveModal, 
    setOpenCancelledMoveModal,
    unassignedCurrentTask,
    selectedTask,
    moveListData,
    goToFinishMove,
    moveListLoading,
    handleModalView,
    setSelectedTask,
    moveHistoryData,
    moveHistoryLoading,
    currentInspectionListPage,
    setCurrentInspectionListPage,
    currentHistoryPage,
    setCurrentHistoryPage,
    currentMoveListPage,
    setCurrentMoveListPage,
    isLoadingAssignMove,
    checkCancelledMove,
  };
}

const useSendMove = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const queryClient: QueryClient = useQueryClient();
  const { authToken } = useAuthStore();

  const onSend = async (data: ICreateMove[]): Promise<void> => {
    setIsLoading(true);
    const response: ICreateMove | IApiError = await sendMoveApi(
      data,
      authToken ?? ""
    );

    if ("errorMessage" in response) {
      setIsLoading(false);
      setShowErrorToast(true);
      return;
    }
    setIsLoading(false);
    setShowSuccessToast(true);
    setIsModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ["unassigned_moves"] });
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

const useMoveOrder: string[] = [
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

const useMoveReasons = () => {
  const selectedYard: IYard | null = useYardsStore(
    (state) => state.selectedYard
  );
  const { authToken } = useAuthStore();
  return useQuery({
    queryKey: ["moveReasonsTaskPanel"],
    queryFn: () =>
      fetchMoveReasons(!selectedYard?.is_main_yard, authToken ?? ""),
    enabled: !!selectedYard,
  });
};

const useCars = (lineId: any) => {
  const { authToken } = useAuthStore();
  return useQuery({
    queryKey: ["carsTaskPanel", lineId],
    queryFn: () => fetchCars(lineId, authToken ?? ""),
    enabled: !!lineId,
  });
};

export {
  useTaskPanel,
  useSendMove,
  useMoveOrder,
  useMoveReasons,
  useCars,
};
