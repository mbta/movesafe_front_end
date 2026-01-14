"use client";
import { LONG_REFETCH_TIME } from "@repo/constants/constants";
import messages from "@repo/constants/messages";
import {
  IApiError,
  IManagementDashboardFilter,
  IMove,
  ISignature,
  RailOptions,
  SignatureTypes,
} from "@repo/models";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAuthStore from "../stores/auth.store";
import {
  cancelMove,
  fetchInspectionStatsForDay,
  fetchLines,
  fetchMotorpersons,
  fetchMoveDetails,
  fetchMoveReasons,
  fetchMovesByDate,
  fetchTags,
  fetchYardmasters,
  fetchYards,
  sendSignature,
} from "./actions";

export const useSelectedDate = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<
    [Date | null, Date | null]
  >([null, null]);

  useEffect(() => {
    if (selectedDateRange[0] === null && selectedDateRange[1] === null) {
      setSelectedDateRange([new Date(), new Date()]);
    }
  }, []);

  const handleDateSelected = (dates: [Date | null, Date | null]) => {
    setSelectedDateRange(dates);
  };

  return { selectedDateRange, handleDateSelected };
};

export const useCurrentPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    handlePageChange,
  };
};

export const useMovesData = (selectedDates: [Date | null, Date | null]) => {
  const [railType, setRailType] = useState<RailOptions>(RailOptions.both);
  const [filterValue, setFilterValue] =
    useState<IManagementDashboardFilter | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { authToken } = useAuthStore();

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDates, railType, filterValue]);

  const { data: movesData, isLoading: isLoadingMoveData } = useQuery({
    queryKey: ["movesData", selectedDates, railType, currentPage, filterValue],
    queryFn: () =>
      fetchMovesByDate(
        selectedDates,
        railType,
        currentPage,
        filterValue,
        authToken ?? ""
      ),
    refetchOnWindowFocus: false,
    refetchInterval: LONG_REFETCH_TIME,
    enabled: selectedDates[0] !== null && selectedDates[1] !== null,
  });

  return {
    movesData,
    railType,
    setRailType,
    isLoadingMoveData,
    currentPage,
    setCurrentPage,
    filterValue,
    setFilterValue,
  };
};

export const useInspectionStats = (
  selectedDates: [Date | null, Date | null]
) => {
  const { authToken } = useAuthStore();
  const { data: inspectionStats } = useQuery({
    queryKey: ["inspectionStatsData", selectedDates],
    queryFn: () => fetchInspectionStatsForDay(selectedDates, authToken ?? ""),
    refetchOnWindowFocus: false,
    refetchInterval: LONG_REFETCH_TIME,
    enabled: selectedDates[0] !== null && selectedDates[1] !== null,
  });
  return inspectionStats;
};

export const useFilter = () => {
  const { authToken } = useAuthStore();
  const [openModal, setOpenModal] = useState(false);
  const [selectedLineId, setSelectedLineId] = useState<string | null>(null);

  const { data: moveReasons } = useQuery({
    queryKey: ["filterMoveReasons"],
    queryFn: () => fetchMoveReasons(false, authToken ?? ""),
  });

  const { data: lines } = useQuery({
    queryKey: ["filterLines"],
    queryFn: () => fetchLines(authToken ?? ""),
  });

  const { data: yards } = useQuery({
    queryKey: ["filterYards", selectedLineId],
    queryFn: () => fetchYards(selectedLineId ?? "", authToken ?? ""),
    enabled: !!selectedLineId,
  });

  const { data: yardmasters } = useQuery({
    queryKey: ["filterYardmasters"],
    queryFn: () => fetchYardmasters(authToken ?? ""),
  });

  const { data: motorpersons } = useQuery({
    queryKey: ["filterYardMotorpersons"],
    queryFn: () => fetchMotorpersons(authToken ?? ""),
  });

  const { data: tags } = useQuery({
    queryKey: ["filterTags"],
    queryFn: () => fetchTags(authToken ?? ""),
  });

  function handleModalOpening(modalState: boolean) {
    setOpenModal(modalState);
  }

  return {
    openModal,
    handleModalOpening,
    moveReasons,
    yardmasters,
    motorpersons,
    yards,
    lines,
    setSelectedLineId,
    tags,
  };
};

export const useInspectionDetails = () => {
  const { authToken } = useAuthStore();
  const [detailsOpened, setDetailsOpened] = useState<boolean>(false);
  const [selectedInspectionId, setSelectedInspectionsId] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [didYardmasterSign, setDidYardmasterSign] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [showSignatureErrorToast, setShowSignatureErrorToast] =
    useState<boolean>(false);
  const [showSignatureStatusErrorToast, setShowSignatureStatusErrorToast] =
    useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: ["moveDetails", selectedInspectionId],
    queryFn: () =>
      fetchMoveDetails(selectedInspectionId ?? "", authToken ?? ""),
    enabled: !!selectedInspectionId,
  });

  const handleDetailsClick = (id: string): void => {
    // reset yard master signature state
    setDidYardmasterSign(false);

    setSelectedInspectionsId(id);
    setDetailsOpened(true);
  };

  const base64ToBlob = (dataURI: string): Blob => {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  };

  const postSignature = async (): Promise<void> => {
    setIsLoading(true);

    let base64: string | null = "";

    if (typeof window !== "undefined") {
      base64 = localStorage.getItem(
        `${SignatureTypes.yardmaster}-${selectedInspectionId}`
      );
    }

    if (!base64) {
      setIsLoading(false);
      setDidYardmasterSign(false);
      setShowSignatureErrorToast(true);
      return;
    }

    let formData: FormData = new FormData();

    const fileBlob: Blob = base64ToBlob(base64);

    formData.append("file", fileBlob);
    formData.append("signature_type", SignatureTypes.yardmaster);
    formData.append("user_id", "e4579e2e-2350-11ef-968b-0a7699ec4bfd");
    formData.append(
      "caption",
      selectedInspectionId + "-" + SignatureTypes.yardmaster
    );
    formData.append("move_id", selectedInspectionId ?? "");

    const response: ISignature | IApiError = await sendSignature(
      formData,
      authToken ?? ""
    );

    setIsLoading(false);

    if ("errorMessage" in response) {
      setDidYardmasterSign(false);

      if (
        response.errorMessage ===
        messages.DetailsModal.failedSignatureWrongStatusError
      ) {
        setShowSignatureStatusErrorToast(true);
      } else setShowSignatureErrorToast(true);
      return;
    } else setShowSuccessToast(true);

    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ["movesData"] });
      queryClient.invalidateQueries({ queryKey: ["moveDetails"] });
    }, 1500);
  };

  const onCancelMoveClick = (): void => {
    setDetailsOpened(false);
    setShowConfirmationModal(true);
  };

  const onCloseConfirmationModal = (): void => {
    setShowConfirmationModal(false);
    setDetailsOpened(true);
  };

  const onConfirmCancelMove = async (): Promise<void> => {
    setShowConfirmationModal(false);
    setIsLoading(true);
    setSelectedInspectionsId(null);

    const response: IMove | IApiError = await cancelMove(
      selectedInspectionId ?? "",
      authToken ?? ""
    );
    queryClient.invalidateQueries({ queryKey: ["movesData"] });

    setIsLoading(false);

    if ("errorMessage" in response) setShowErrorToast(true);
    else setShowSuccessToast(true);
  };

  const onDetailsModalClose = (): void => {
    setDetailsOpened(false);
    setSelectedInspectionsId(null);
  };

  return {
    data,
    isFetching,
    detailsOpened,
    setDetailsOpened,
    handleDetailsClick,
    selectedInspectionId,
    didYardmasterSign,
    setDidYardmasterSign,
    showSuccessToast,
    showErrorToast,
    setShowSuccessToast,
    setShowErrorToast,
    isLoading,
    postSignature,
    showConfirmationModal,
    onCancelMoveClick,
    onCloseConfirmationModal,
    onConfirmCancelMove,
    showSignatureErrorToast,
    setShowSignatureErrorToast,
    showSignatureStatusErrorToast,
    setShowSignatureStatusErrorToast,
    onDetailsModalClose,
  };
};
