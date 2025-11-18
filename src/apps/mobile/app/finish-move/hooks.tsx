import { useMutation } from "@tanstack/react-query";
import { returnMove, updateMove } from "./actions";
import { useState } from "react";
import useMovesStore from "../stores/move.store";
import { useRouter } from "next/navigation";
import { ScreenNames } from "@repo/constants/screens";
import useAuthStore from "../stores/auth.store";

function useFinishMove() {
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);
  const [showMoveCancelledModal, setShowMoveCancelledModal] =
    useState<boolean>(false);
  const { assignedMove, setAssignedMove } = useMovesStore();
  const { authToken } = useAuthStore();
  const router = useRouter();

  const {
    mutate: finishMoveMutate,
    data: finishMoveData,
    error: finishMoveError,
    isPending: finishMovePending,
  } = useMutation({
    mutationFn: async () => updateMove(assignedMove?.id || "", authToken ?? ""),
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: (e: any) => {
      if (e.toString() === "Error: Move is cancelled") {
        setShowMoveCancelledModal(true);
      } else {
        setShowErrorToast(true);
      }
    },
    onSuccess: () => {
      setShowSuccessToast(true);

      setTimeout(() => {
        setAssignedMove(null);
        router.push(ScreenNames.taskPanel);
      }, 1000);
    },
  });

  const {
    mutate: returnMoveMutate,
    data: returnMoveData,
    error: returnMoveError,
    isPending: returnMovePending,
  } = useMutation({
    mutationFn: async () => returnMove(assignedMove?.id || "", authToken ?? ""),
    onMutate: () => {
      setLoading(true);
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: (e: any) => {
      if (e.toString() === "Error: Move is cancelled") {
        setAssignedMove(null);
        router.push(ScreenNames.taskPanel);
      } else {
        setShowErrorToast(true);
      }
    },
    onSuccess: () => {
      setAssignedMove(null);
      router.push(ScreenNames.taskPanel);
    },
  });

  const onConfirmModalCancelledMoveClick = (): void => {
    setAssignedMove(null);
    router.push(ScreenNames.taskPanel);
  };

  return {
    returnMoveMutate,
    returnMoveData,
    returnMoveError,
    returnMovePending,
    finishMoveMutate,
    finishMoveData,
    finishMoveError,
    finishMovePending,
    assignedMove,
    showSuccessToast,
    setShowSuccessToast,
    loading,
    showErrorToast,
    setShowErrorToast,
    showMoveCancelledModal,
    setShowMoveCancelledModal,
    onConfirmModalCancelledMoveClick,
  };
}

export { useFinishMove };
