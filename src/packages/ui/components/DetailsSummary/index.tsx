"use client";
import React from "react";
import {
  SummaryContainer,
  SummaryItem,
  SummaryItemLabel,
  SummaryItemContent,
  TrainNumberLabel,
  RowContainer,
  ButtonsContainer,
  PDFLinkStyle,
} from "./styles";
import { MainButton, PDFDocument } from "@repo/ui/components";
import messages from "@repo/constants/messages";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { IMoveDetails, ITag } from "@repo/models";
import { useExportToPdf, useFormatDate } from "@repo/ui/hooks";
import { colors } from "@repo/themes";
import { MoveStatus } from "@repo/constants/constants";

interface DetailsSummaryProps {
  data: IMoveDetails;
  onCancelMoveClick: () => void;
  isManagement: boolean;
  cancelDisabled: boolean;
}

const DetailsSummary: React.FC<DetailsSummaryProps> = ({
  data,
  onCancelMoveClick,
  isManagement,
  cancelDisabled,
}) => {
  const exportPdf = useExportToPdf();
  const dateFormatter = useFormatDate();

  function checkInspectionLabel(data: IMoveDetails): boolean {
    return (
      (data.inspections_done_by_user &&
        (data.status === MoveStatus.waiting ||
          data.status === MoveStatus.pending_checklist)) ||
      data.inspections.length === 0
    );
  }

  return (
    <RowContainer>
      <SummaryContainer>
        <SummaryItem>
          <SummaryItemLabel>{messages.Labels.yard}</SummaryItemLabel>
          <SummaryItemContent>{data.yard.name}</SummaryItemContent>
        </SummaryItem>

        <SummaryItem>
          <SummaryItemLabel>{messages.Labels.dateTime}</SummaryItemLabel>
          <SummaryItemContent>
            {dateFormatter.formatDateTime(data.created_at)}
          </SummaryItemContent>
        </SummaryItem>

        <SummaryItem>
          <SummaryItemLabel>{messages.Labels.yardmaster}</SummaryItemLabel>
          <SummaryItemContent>
            #{data.yardmaster_user?.badge_number} {data.yardmaster_user?.name}
          </SummaryItemContent>
        </SummaryItem>

        <SummaryItem>
          <SummaryItemLabel>
            {checkInspectionLabel(data)
              ? messages.Labels.assignedTo
              : messages.Labels.doneBy}
          </SummaryItemLabel>
          <SummaryItemContent>
            #{data.inspections_done_by_user?.badge_number}{" "}
            {data.inspections_done_by_user?.name}
          </SummaryItemContent>
        </SummaryItem>

        <SummaryItem>
          <SummaryItemLabel>{messages.Labels.fromTo}</SummaryItemLabel>
          <SummaryItemContent>
            {data.move_from} - {data.move_to}
          </SummaryItemContent>
        </SummaryItem>

        <SummaryItem>
          <SummaryItemLabel>{messages.Labels.order}</SummaryItemLabel>
          <SummaryItemContent>{data.priority_order}</SummaryItemContent>
        </SummaryItem>

        <RowContainer>
          <TrainNumberLabel>{messages.Labels.trainNumber}</TrainNumberLabel>

          <SummaryItem>
            <SummaryItemLabel>{messages.Labels.first}</SummaryItemLabel>
            <SummaryItemContent>
              {data.move_cars[0].first_car.series_number}
              {data.move_cars[0].second_car ? " - " : " "}
              {data.move_cars[0].second_car?.series_number}
            </SummaryItemContent>
          </SummaryItem>

          {data.move_cars.length > 1 && (
            <>
              <SummaryItem>
                <SummaryItemLabel>{messages.Labels.second}</SummaryItemLabel>
                <SummaryItemContent>
                  {data.move_cars[1].first_car.series_number}
                  {data.move_cars[0].second_car ? " - " : " "}
                  {data.move_cars[1].second_car.series_number}
                </SummaryItemContent>
              </SummaryItem>

              <SummaryItem>
                <SummaryItemLabel>{messages.Labels.third}</SummaryItemLabel>
                <SummaryItemContent>
                  {data.move_cars[2]?.first_car?.series_number}
                  {data.move_cars[0].second_car ? " - " : " "}
                  {data.move_cars[2]?.second_car?.series_number}
                </SummaryItemContent>
              </SummaryItem>
            </>
          )}

          <SummaryItem>
            <SummaryItemLabel>{messages.Labels.tags}</SummaryItemLabel>
            <SummaryItemContent>
              {data.tags.map((tag: ITag) => tag.name).join(",")}
            </SummaryItemContent>
          </SummaryItem>
        </RowContainer>
      </SummaryContainer>
      <ButtonsContainer>
        <PDFDownloadLink
          style={PDFLinkStyle.a}
          document={<PDFDocument data={exportPdf.exportToPdf(data)} />}
          fileName={`${dateFormatter.formatDate(data.created_at)}-${
            data.yard.name
          }-inspections.pdf`}
        >
          <MainButton
            text={messages.Labels.exportPdf}
            onClick={() => {}}
            primary={false}
          />
        </PDFDownloadLink>

        {!isManagement && (
          <MainButton
            text={messages.Labels.cancelMove}
            disabled={cancelDisabled}
            onClick={() => onCancelMoveClick()}
            primary={false}
            color={colors.red}
          />
        )}
      </ButtonsContainer>
    </RowContainer>
  );
};

export default DetailsSummary;
