"use client";
import React from "react";
import Image from "next/image";
import { colors } from "@repo/themes";
import heavyRailIcon from "../../public/assets/icon_heavy_rail_large.png";
import LightRailIcon from "../../public/assets/icon_light_rail_large.png";
import {
  MainButton,
  MainContainer,
  MainTitle,
  CalendarRange,
  DashboardTotalCard,
  DashboardPerDayCard,
  RailTypeSelector,
  InspectionList,
  Loader,
  Toast,
  ConfirmationModal,
  FilterModal,
  DetailsModal,
} from "@repo/ui/components";
import {
  DashboardContainer,
  ViewDate,
  ViewInspectionCards,
  ViewInspectionList,
  ViewTitle,
  SelectorContainer,
  SelectorItem,
  NoMoveCardContainer,
  CreateText
} from "./styles";
import {
  useSelectedDate,
  useMovesData,
  useInspectionStats,
  useInspectionDetails,
  useFilter,
} from "./hooks";
import { useExportToCsv } from "@repo/ui/hooks";
import messages from "@repo/constants/messages";
import ProtectedPage from "../auth/protectedPage";
import { ManagerRoles } from "../../../../packages/models/src/userRoles.enum";

function DashboardManager() {
  const { selectedDateRange, handleDateSelected } = useSelectedDate();
  const {
    movesData = { data: [], pageCount: 0 },
    railType,
    setRailType,
    isLoadingMoveData,
    currentPage,
    setCurrentPage,
    filterValue,
    setFilterValue,
  } = useMovesData(selectedDateRange);
  const inspectionStats = useInspectionStats(selectedDateRange);
  const inspectionDetails = useInspectionDetails();
  const filter = useFilter();
  const exportFile = useExportToCsv();

  if (isLoadingMoveData) return;

  return (
    <MainContainer color={colors.offWhite}>
      <DashboardContainer>
        <ViewTitle>
          <MainTitle
            text={messages.Labels.managementTitle}
            $fontSettings="H0"
          />
          <ViewDate>
            <CalendarRange
              startDate={selectedDateRange[0]}
              endDate={selectedDateRange[1]}
              onDateSelected={handleDateSelected}
            />
            <MainButton
              onClick={() =>
                exportFile.exportToCSV(movesData.data, new Date)
              }
              text={messages.Labels.export}
              primary={false}
            />
          </ViewDate>
        </ViewTitle>

        <SelectorContainer>
          <SelectorItem>
            <RailTypeSelector
              onOptionChange={setRailType}
              selectedOption={railType}
            />
          </SelectorItem>
        </SelectorContainer>

        <ViewInspectionCards>
          <DashboardTotalCard
            heavyRailImg={heavyRailIcon}
            lightRailImg={LightRailIcon}
            data={{
              totalLightRailInspections:
                inspectionStats?.totalLightRailInspections || 0,
              totalHeavyInspections:
                inspectionStats?.totalHeavyInspections || 0,
              concludedLightRailInspections:
                inspectionStats?.concludedLightRailInspections || 0,
              concludedHeavyRailInspections:
                inspectionStats?.concludedHeavyRailInspections || 0,
            }}
          />
          <DashboardPerDayCard data={inspectionStats} />
        </ViewInspectionCards>

        <ViewInspectionList>
          <ViewTitle>
            <MainTitle text={messages.Labels.moves} $fontSettings="H1" />
            <MainButton
              onClick={() => filter.handleModalOpening(true)}
              text={messages.Labels.filter}
              primary={false}
            />
          </ViewTitle>
          {movesData && movesData.data?.length > 0 ? (
            <InspectionList
              currentItems={movesData.data}
              currentPage={currentPage}
              totalPages={movesData.pageCount}
              handlePageChange={setCurrentPage}
              handleDetailsClick={inspectionDetails.handleDetailsClick}
            />
          ) : (
            <NoMoveCardContainer>
              <CreateText>
                {messages.EmptyCard.noMoveCreated}
              </CreateText>
            </NoMoveCardContainer>
          )}
        </ViewInspectionList>
        <DetailsModal
          show={inspectionDetails.detailsOpened}
          onClose={() => inspectionDetails.setDetailsOpened(false)}
          data={inspectionDetails.data}
          moveId={inspectionDetails.selectedInspectionId ?? ""}
          isFetching={inspectionDetails.isFetching}
          onSign={inspectionDetails.postSignature}
          onCancelMoveClick={inspectionDetails.onCancelMoveClick}
          didYardmasterSign={inspectionDetails.didYardmasterSign}
          setDidYardmasterSign={inspectionDetails.setDidYardmasterSign}
          showSignatureError={inspectionDetails.showSignatureErrorToast}
          showSignatureStatusError={
            inspectionDetails.showSignatureStatusErrorToast
          }
          setShowSignatureError={inspectionDetails.setShowSignatureErrorToast}
          setShowSignatureStatusError={
            inspectionDetails.setShowSignatureStatusErrorToast
          }
          showSignatureSuccess={inspectionDetails.showSuccessToast}
          setShowSignatureSuccess={inspectionDetails.setShowSuccessToast}
          isManagement
        />
        <FilterModal
          isOpen={filter.openModal}
          onClose={() => filter.handleModalOpening(false)}
          lines={filter.lines ?? []}
          yards={filter.yards ?? []}
          yardmasters={filter.yardmasters ?? []}
          motorpersons={filter.motorpersons ?? []}
          moveReasons={filter.moveReasons ?? []}
          tags={filter.tags ?? []}
          setSelectedLineId={filter.setSelectedLineId}
          initialValue={filterValue}
          onFilter={(filter: any) => setFilterValue(filter)}
        />
        <ConfirmationModal
          show={inspectionDetails.showConfirmationModal}
          title={messages.Labels.cancelMoveTitle}
          text={messages.Labels.inspectionWarning}
          confirmBtnText={messages.Labels.confirmCancel}
          onClose={inspectionDetails.onCloseConfirmationModal}
          onConfirm={inspectionDetails.onConfirmCancelMove}
        />
        <Loader loading={inspectionDetails.isLoading || isLoadingMoveData} />
        <Toast
          message={messages.InspectionFormsScreen.toast_fail}
          visible={inspectionDetails.showErrorToast}
          setVisible={inspectionDetails.setShowErrorToast}
        />
        <Toast
          message={messages.InspectionFormsScreen.toast_success}
          visible={inspectionDetails.showSuccessToast}
          setVisible={inspectionDetails.setShowSuccessToast}
          isSuccess
        />
      </DashboardContainer>
    </MainContainer>
  );
}

export default ProtectedPage(DashboardManager, ManagerRoles);
