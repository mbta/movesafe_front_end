import React from "react";
import {
  Container,
  TotalInspection,
  DivRail,
  RailInfo,
  Title,
  BigNumber,
  Checklist,
  InspectionList,
  Bar,
} from "./styles";
import InspectionForm from "../InspectionForm";
import { IInspectionStat } from "@repo/models";
import messages from "@repo/constants/messages";

interface DashboardPerDayCardProps {
  data: IInspectionStat | undefined;
}

const DashboardPerDayCard: React.FC<DashboardPerDayCardProps> = ({
  data,
}: DashboardPerDayCardProps) => {
  return (
    <Container>
      <Title>{messages.ManagementScreen.totalPerDay}</Title>
      <DivRail>
        <RailInfo>
          <TotalInspection>
            <Title>Total</Title>
            <BigNumber>{data?.totalInspections?.toString() || "0"}</BigNumber>
          </TotalInspection>

          <Bar />

          <Checklist>
            <Title>{messages.ManagementScreen.heavyPerChecklist}</Title>
            <InspectionList>
              <InspectionForm
                inspection={messages.ManagementScreen.inspectionEVI}
                quantity={
                  data?.totalEviInspectionsForHeavyRail?.toString() || "0"
                }
              />
              <InspectionForm
                inspection={messages.ManagementScreen.inspectionSI}
                quantity={
                  data?.totalSafetyInspectionsForHeavyRail?.toString() || "0"
                }
              />
              <InspectionForm
                inspection={messages.ManagementScreen.inspectionPTI}
                quantity={
                  data?.totalPreTripInspectionsForHeavyRail?.toString() || "0"
                }
              />
              <InspectionForm
                inspection={messages.ManagementScreen.inspectionCHCC}
                quantity={
                  data?.totalCarHouseInspectionsForHeavyRail?.toString() || "0"
                }
              />
            </InspectionList>
          </Checklist>
          <Bar />
          <Checklist>
            <Title>{messages.ManagementScreen.lightPerChecklist}</Title>
            <InspectionList>
              <InspectionForm
                inspection={messages.ManagementScreen.inspectionSI}
                quantity={
                  data?.totalSafetyInspectionsForLightRail?.toString() || "0"
                }
              />
              <InspectionForm
                inspection={messages.ManagementScreen.inspectionPTI}
                quantity={
                  data?.totalPreTripInspectionsForLightRail?.toString() || "0"
                }
              />
              <InspectionForm
                inspection={messages.ManagementScreen.inspectionCHCC}
                quantity={
                  data?.totalCarHouseInspectionsForLightRail?.toString() || "0"
                }
              />
            </InspectionList>
          </Checklist>
        </RailInfo>
      </DivRail>
    </Container>
  );
};

export default DashboardPerDayCard;
