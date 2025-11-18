"use client";
import { MoveStatus, StorageNames } from "@repo/constants/constants";
import messages from "@repo/constants/messages";
import { ScreenNames } from "@repo/constants/screens";
import {
  IAnswer,
  IApiError,
  ICar,
  IInspection,
  IInspectionAnswer,
  IInspectionAnswerDTO,
  IInspectionForm,
  IInspectionFormAsCategoriesDTO,
  IMove,
  IMoveCar,
  IQuestionDoubleDefectAnswer,
  IQuestionGuardSideAndMotorPersonAnswer,
  IQuestionSingleDefectAnswer,
  IQuestionYesNoAnswer,
  ISignature,
  QuestionTypes,
  SignatureTypes,
} from "@repo/models";
import { useInspectionFormsMapper } from "@repo/ui/hooks";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IInspectionFormsStep } from "../../models/inspectionFormsStep.model";
import useAuthStore from "../stores/auth.store";
import useLinesStore from "../stores/line.store";
import useMovesStore from "../stores/move.store";
import {
  fetchYardMotorPersons,
  releaseMove,
  sendMoveResult,
  sendSignature,
} from "./actions";

const inspectionFormMapper = useInspectionFormsMapper();

const returnMoveCars = (move: IMove): ICar[] => {
  return move.move_cars
    .map((e: IMoveCar) => [e.first_car, e.second_car])
    .flat();
};

const useInspectionForms = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeStep, setActiveStep] = useState<IInspectionFormsStep | null>(
    null
  );
  const [isSignatureCompleted, setIsSignatureCompleted] =
    useState<boolean>(false);
  const [isAgreementCheckboxChecked, setIsAgreementCheckboxChecked] =
    useState<boolean>(false);
  const [showErrorToast, setShowErrorToast] = useState<boolean>(false);
  const [showWarningToast, setShowWarningToast] = useState<boolean>(false);
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [showCongratulationsModal, setShowCongratulationsModal] =
    useState<boolean>(false);
  const [defectFound, setDefectFound] = useState<boolean>(false);
  const [showInspectionReturnModal, setShowInspectionReturnModal] =
    useState<boolean>(false);
  const [showMoveCancelledModal, setShowMoveCancelledModal] =
    useState<boolean>(false);
  const { assignedMove, setAssignedMove } = useMovesStore();
  const { authToken, isAuthenticated, username } = useAuthStore();
  const { selectedLine } = useLinesStore();
  const router = useRouter();

  const { data: yardMotorPersons } = useQuery({
    queryKey: ["yardMotorPersonsForms"],
    queryFn: () =>
      fetchYardMotorPersons(authToken ?? "", selectedLine?.id ?? ""),
    enabled: isAuthenticated,
    select: (data) => data?.filter((person) => person.name !== username),
  });

  useEffect(() => {
    if (assignedMove && assignedMove.status !== MoveStatus.pending_move) {
      onActiveStepChange(steps[0].number);
    }
  }, [assignedMove]);

  if (!assignedMove) return;

  const steps: IInspectionFormsStep[] = [
    {
      description: messages.InspectionHeader.inspectionDescription,
      name: messages.InspectionHeader.inspectionTitle,
      number: 1,
      short_name: messages.InspectionHeader.inspectionTitle,
      is_signature: false,
    },
    {
      description: messages.InspectionHeader.signDescription,
      name: messages.InspectionHeader.signTitle,
      number: 2,
      short_name: messages.InspectionHeader.signTitle,
      is_signature: true,
    },
  ];

  const moveCars: ICar[] = returnMoveCars(assignedMove);
  const serialNumbers: string[] = moveCars.map(
    (moveCar: ICar) => moveCar?.series_number
  );

  const moveHasGuardSideSignature: boolean = assignedMove.inspections.some(
    (inspection: IInspection) =>
      inspection.inspection_form.has_guardside_signature
  );

  const moveHasForepersonSignature: boolean = assignedMove.inspections.some(
    (inspection: IInspection) =>
      inspection.inspection_form.has_foreperson_signature
  );

  const isLastStep = (): boolean => activeStep?.number === steps.length;

  const isNextStepButtonDisabled = (): boolean =>
    isLoading || activeStep?.number === steps.length;

  const onNextStepClick = (
    currentInspectionResult: IInspectionFormAsCategoriesDTO
  ): void => {
    if (isMandatoryQuestionsMissing(currentInspectionResult)) {
      setShowWarningToast(true);
      return;
    }
    setDefectFound(inspectionHaveMajorDefect(currentInspectionResult));
    saveInspectionResult(currentInspectionResult);
    onActiveStepChange(activeStep ? activeStep.number + 1 : 1);
    window.scrollTo(0, 0);
  };

  function isMandatoryQuestionsMissing(
    inspectionResult: IInspectionFormAsCategoriesDTO
  ): boolean {
    for (const category of inspectionResult.categories) {
      for (const question of category.questions) {
        if (
          question.question_type === QuestionTypes.YesOrNoQuestion &&
          question.answer === undefined
        ) {
          return true;
        }

        if (questionHasDefectAnswer(question) && !question.comments) {
          return true;
        }
      }
    }
    return false;
  }

  function inspectionHaveMajorDefect(
    inspectionResult: IInspectionFormAsCategoriesDTO
  ): boolean {
    return inspectionResult.categories.some((category) =>
      category.questions.some(
        (question) =>
          questionHasDefectAnswer(question, true) ||
          (question.question_type === QuestionTypes.YesOrNoQuestion &&
            question.answer === false)
      )
    );
  }

  const questionHasDefectAnswer = (
    question: IInspectionAnswerDTO,
    validateMajorDefectsOnly: boolean = false
  ): boolean => {
    switch (question.question_type) {
      case QuestionTypes.SingleDefectQuestion:
        if (!Array.isArray(question.answer)) return false;
        return question.answer?.length > 0;

      case QuestionTypes.DoubleDefectQuestion:
        if (
          !(
            typeof question.answer === "object" &&
            "minorDefects" in question.answer
          )
        )
          return false;

        if (validateMajorDefectsOnly)
          return question.answer.majorDefects.length > 0;

        return (
          question.answer.minorDefects.length > 0 ||
          question.answer.majorDefects.length > 0
        );

      case QuestionTypes.GuardSideAndMotorPersonQuestion:
        if (
          !(
            typeof question.answer === "object" &&
            "guardSide" in question.answer
          )
        )
          return false;
        return (
          question.answer.guardSide.length > 0 ||
          question.answer.motorPersonSide.length > 0
        );

      case QuestionTypes.YesOrNoQuestion:
        if (!(typeof question.answer === "boolean")) return false;
        return !question.answer;

      default:
        return false;
    }
  };

  const isPreviousStepButtonDisabled = (): boolean =>
    isLoading || activeStep?.number === 1;

  const onPreviousStepClick = (
    currentInspectionResult: IInspectionFormAsCategoriesDTO
  ): void => {
    if (currentInspectionResult?.categories?.length)
      saveInspectionResult(currentInspectionResult);
    onActiveStepChange(activeStep ? activeStep.number - 1 : 1);
    window.scrollTo(0, 0);
  };

  const onSaveClick = (
    inspectionResult: IInspectionFormAsCategoriesDTO
  ): void => {
    saveInspectionResult(inspectionResult);
    setShowSuccessToast(true);
  };

  const getMoveResultFromStorage = (): IInspectionFormAsCategoriesDTO => {
    if (typeof window === "undefined") return { categories: [] };

    let resultStored: string | null = "";

    if (typeof window !== "undefined") {
      resultStored = localStorage.getItem(`moveResult-${assignedMove.id}`);
    }

    const moveResult: IInspectionFormAsCategoriesDTO = resultStored
      ? JSON.parse(resultStored)
      : { categories: [] };

    return moveResult;
  };

  const saveInspectionResult = (
    inspectionResult: IInspectionFormAsCategoriesDTO
  ): void => {
    if (typeof window === "undefined") return;

    if (
      !inspectionResult ||
      !Array.isArray(inspectionResult.categories) ||
      inspectionResult.categories.length === 0
    ) {
      return;
    }

    localStorage.setItem(
      `moveResult-${assignedMove.id}`,
      JSON.stringify(inspectionResult)
    );
  };

  const onActiveStepChange = (stepNumber: number): void => {
    setIsLoading(true);

    let step: IInspectionFormsStep | null =
      steps.find((step) => step.number === stepNumber) ?? null;

    if (!step) {
      setIsLoading(false);
      return;
    }

    if (step.is_signature) {
      setIsLoading(false);
      setActiveStep(step);
      return;
    }

    const moveResult: IInspectionFormAsCategoriesDTO =
      getMoveResultFromStorage();

    if (moveResult.categories && moveResult.categories.length) {
      step.inspection_form = moveResult;
    } else {
      let inspectionFormsStored: string | null = "";

      if (typeof window !== "undefined") {
        inspectionFormsStored = localStorage.getItem(
          StorageNames.inspectionForms
        );
      }

      const inspectionForms: IInspectionForm[] = inspectionFormsStored
        ? JSON.parse(inspectionFormsStored)
        : [];

      const moveInspections: IInspection[] = assignedMove.inspections;

      const inspectionFormsAsCategories: IInspectionFormAsCategoriesDTO =
        inspectionFormMapper.returnInspectionFormsAsCategories(
          moveInspections,
          inspectionForms
        );

      step.inspection_form = inspectionFormsAsCategories;
    }

    setActiveStep(step);
    setIsLoading(false);
  };

  const isSendButtonDisabled = (): boolean =>
    !isSignatureCompleted || !isAgreementCheckboxChecked;

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

  const postSignature = async (
    signatureType: SignatureTypes
  ): Promise<ISignature | IApiError> => {
    let base64: string | null = "";
    let userID: string = "";

    if (typeof window !== "undefined") {
      base64 = localStorage.getItem(`${signatureType}-${assignedMove.id}`);

      let storedUser: string | null = localStorage.getItem(
        `${signatureType}-${assignedMove.id}-user`
      );

      if (storedUser) userID = JSON.parse(storedUser).id;
    }

    if (!base64)
      return new Promise((resolve, reject) => {
        reject({
          statusCode: 500,
          message: "could not find signature in storage",
        });
      });

    let formData: FormData = new FormData();

    const fileBlob: Blob = base64ToBlob(base64);

    formData.append("file", fileBlob);
    formData.append("signature_type", signatureType);
    formData.append("caption", assignedMove.id + "-" + signatureType);
    formData.append("move_id", assignedMove.id);

    if (
      signatureType === SignatureTypes.guardside_inspector ||
      signatureType === SignatureTypes.foreperson
    ) {
      formData.append("user_id", userID);
    }

    return await sendSignature(formData, authToken ?? "");
  };

  const sendSignatures = async (): Promise<
    IApiError | { success: boolean }
  > => {
    const inspectorSignatureResponse = await postSignature(
      SignatureTypes.inspector
    );

    if ("errorMessage" in inspectorSignatureResponse) {
      return inspectorSignatureResponse;
    }

    if (moveHasGuardSideSignature) {
      const guardSideSignatureResponse = await postSignature(
        SignatureTypes.guardside_inspector
      );

      if ("errorMessage" in guardSideSignatureResponse)
        return guardSideSignatureResponse;
    }

    if (moveHasForepersonSignature) {
      const forePersonSignatureResponse = await postSignature(
        SignatureTypes.foreperson
      );

      if ("errorMessage" in forePersonSignatureResponse)
        return forePersonSignatureResponse;
    }

    return { success: true };
  };

  const isEmptyObject = (object: object) => {
    return Object.keys(object).length === 0;
  };

  const mapIAnswerToISingleDefectAnswer = (
    answer: IAnswer | undefined
  ): IQuestionSingleDefectAnswer => {
    if (answer && Array.isArray(answer)) return answer;
    else return [];
  };

  const mapIAnswerToIDoubleDefectAnswer = (
    answer: IAnswer | undefined
  ): IQuestionDoubleDefectAnswer => {
    if (answer && typeof answer === "object" && "minorDefects" in answer)
      return answer;
    else return { minorDefects: [], majorDefects: [] };
  };

  const mapIAnswerToIGuardSideMotorPersonAnswer = (
    answer: IAnswer | undefined
  ): IQuestionGuardSideAndMotorPersonAnswer => {
    if (answer && typeof answer === "object" && "guardSide" in answer)
      return answer;
    else return { guardSide: [], motorPersonSide: [] };
  };

  const mapIAnswerToIQuestionYesNoAnswer = (
    answer: IAnswer | undefined
  ): IQuestionYesNoAnswer => {
    if (answer !== undefined && typeof answer === "boolean") return answer;
    else return true;
  };

  const mapAnswerDTOToInspectionAnswer = (
    answerDTO: IInspectionAnswerDTO,
    moveCars: ICar[]
  ): IInspectionAnswer[] => {
    switch (answerDTO.question_type) {
      case QuestionTypes.SingleDefectQuestion:
        const singDefectAnswer: IQuestionSingleDefectAnswer =
          mapIAnswerToISingleDefectAnswer(answerDTO.answer);

        const singleDefectAnswers: IInspectionAnswer[] = moveCars.map(
          (moveCar: ICar) => {
            const hasMajorDefect: boolean = singDefectAnswer.includes(
              moveCar?.series_number
            );

            return {
              inspection_id: answerDTO.inspectionId ?? "",
              inspection_form_question_id: answerDTO.id,
              car_id: moveCar?.id,
              has_minor_defect: false,
              has_major_defect: hasMajorDefect,
              comments: hasMajorDefect ? answerDTO.comments : undefined,
            };
          }
        );

        return singleDefectAnswers;

      case QuestionTypes.DoubleDefectQuestion:
        const doubleDefectAnswer: IQuestionDoubleDefectAnswer =
          mapIAnswerToIDoubleDefectAnswer(answerDTO.answer);

        const doubleDefectAnswers: IInspectionAnswer[] = moveCars.map(
          (moveCar: ICar) => {
            const hasMinorDefect: boolean =
              doubleDefectAnswer.minorDefects.includes(moveCar?.series_number);
            const hasMajorDefect: boolean =
              doubleDefectAnswer.majorDefects.includes(moveCar?.series_number);

            return {
              inspection_id: answerDTO.inspectionId ?? "",
              inspection_form_question_id: answerDTO.id,
              car_id: moveCar?.id,
              has_minor_defect: hasMinorDefect,
              has_major_defect: hasMajorDefect,
              comments:
                hasMinorDefect || hasMajorDefect
                  ? answerDTO.comments
                  : undefined,
            };
          }
        );

        return doubleDefectAnswers;

      case QuestionTypes.GuardSideAndMotorPersonQuestion:
        const guardSideMotorPersonAnswer: IQuestionGuardSideAndMotorPersonAnswer =
          mapIAnswerToIGuardSideMotorPersonAnswer(answerDTO.answer);

        const guardSideAnswers: IInspectionAnswer[] = moveCars.map(
          (moveCar: ICar) => {
            const hasGuardSideDefect: boolean =
              guardSideMotorPersonAnswer.guardSide.includes(
                moveCar?.series_number
              );

            return {
              inspection_id: answerDTO.inspectionId ?? "",
              inspection_form_question_id: answerDTO.id,
              car_id: moveCar?.id,
              has_minor_defect: false,
              has_major_defect: hasGuardSideDefect,
              is_guardside: true,
              comments: hasGuardSideDefect ? answerDTO.comments : undefined,
            };
          }
        );

        const motorPersonAnswers: IInspectionAnswer[] = moveCars.map(
          (moveCar: ICar) => {
            const hasMotorPersonSideDefect: boolean =
              guardSideMotorPersonAnswer.guardSide.includes(
                moveCar?.series_number
              );
            return {
              inspection_id: answerDTO.inspectionId ?? "",
              inspection_form_question_id: answerDTO.id,
              car_id: moveCar?.id,
              has_minor_defect: false,
              has_major_defect: hasMotorPersonSideDefect,
              comments: hasMotorPersonSideDefect
                ? answerDTO.comments
                : undefined,
            };
          }
        );
        return [...guardSideAnswers, ...motorPersonAnswers];

      case QuestionTypes.YesOrNoQuestion:
        const yesNoAnswerValue: IQuestionYesNoAnswer =
          mapIAnswerToIQuestionYesNoAnswer(answerDTO.answer);

        const yesNoAnswers: IInspectionAnswer[] = [
          {
            inspection_id: answerDTO.inspectionId ?? "",
            inspection_form_question_id: answerDTO.id,
            car_id: undefined,
            has_minor_defect: false,
            has_major_defect: !yesNoAnswerValue,
            comments: !yesNoAnswerValue ? answerDTO.comments : undefined,
          },
        ];
        return yesNoAnswers;

      default:
        return [];
    }
  };

  const onSend = async (): Promise<void> => {
    setIsLoading(true);
    const signaturesResponse = await sendSignatures();

    if ("errorMessage" in signaturesResponse) {
      setIsLoading(false);
      setShowErrorToast(true);
      return;
    }

    const moveResult: IInspectionFormAsCategoriesDTO =
      getMoveResultFromStorage();

    const answerDTOs: IInspectionAnswerDTO[] = moveResult.categories.flatMap(
      (category) => category.questions
    );

    let answers: IInspectionAnswer[] = answerDTOs
      .map((answerDTO: IInspectionAnswerDTO) =>
        mapAnswerDTOToInspectionAnswer(answerDTO, moveCars)
      )
      .flat()
      .filter(
        (answer: IInspectionAnswer) =>
          answer.has_major_defect || answer.has_minor_defect
      );

    const answersResponse = await sendMoveResult(
      answers,
      assignedMove.id,
      authToken ?? ""
    );
    setIsLoading(false);

    if (
      "errorMessage" in answersResponse &&
      answersResponse.errorMessage === "Move is cancelled"
    ) {
      setShowMoveCancelledModal(true);
    } else if ("errorMessage" in answersResponse) {
      setShowErrorToast(true);
    } else if (inspectionHaveMajorDefect(moveResult)) {
      setDefectFound(true);
      setShowCongratulationsModal(true);
    } else {
      setAssignedMove({ ...assignedMove, status: answersResponse.status });
      setShowCongratulationsModal(true);
    }
  };

  const isMoveCompleted = (move: IMove): boolean =>
    move.status === MoveStatus.done ||
    move.status === MoveStatus.inspection_failed;

  const onConfirmModalCancelledMoveClick = (): void => {
    setShowSuccessToast(true);
    router.back();
    setAssignedMove(null);
  };

  const onCongratulationsModalClose = (): void => {
    setShowCongratulationsModal(false);
    router.push(ScreenNames.taskPanel);
    if (defectFound || isMoveCompleted(assignedMove)) setAssignedMove(null);
  };

  const isInspectionReturnButtonDisabled = (): boolean => isLoading;

  const onConfirmInspectionReturnClick = async (): Promise<void> => {
    setShowInspectionReturnModal(false);
    setIsLoading(true);

    const response = await releaseMove(assignedMove.id, authToken ?? "");

    setIsLoading(false);

    if (
      "errorMessage" in response &&
      response.errorMessage === "Move is cancelled"
    ) {
      setShowMoveCancelledModal(true);
    } else if ("errorMessage" in response) {
      setShowErrorToast(true);
    }

    setShowSuccessToast(true);
    router.back();
    setAssignedMove(null);
  };

  const onBackButtonClick = () => {
    router.back();
  };

  return {
    isLoading,
    setIsLoading,
    activeStep,
    setActiveStep,
    assignedMove,
    steps,
    serialNumbers,
    moveHasGuardSideSignature,
    moveHasForepersonSignature,
    onSaveClick,
    isNextStepButtonDisabled,
    onNextStepClick,
    isPreviousStepButtonDisabled,
    isLastStep,
    onPreviousStepClick,
    onSend,
    setIsSignatureCompleted,
    isSendButtonDisabled,
    setIsAgreementCheckboxChecked,
    isAgreementCheckboxChecked,
    showErrorToast,
    showWarningToast,
    showCongratulationsModal,
    defectFound,
    onCongratulationsModalClose,
    setShowErrorToast,
    setShowWarningToast,
    showSuccessToast,
    setShowSuccessToast,
    onConfirmInspectionReturnClick,
    showInspectionReturnModal,
    setShowInspectionReturnModal,
    isInspectionReturnButtonDisabled,
    onBackButtonClick,
    showMoveCancelledModal,
    setShowMoveCancelledModal,
    onConfirmModalCancelledMoveClick,
    yardMotorPersons,
  };
};

export default useInspectionForms;
