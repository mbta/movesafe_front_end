import React from "react";
import { Container, DivRail, Title } from "./styles";
import TotalInspectionsInfo from "../TotalInspectionsInfo";
import messages from "@repo/constants/messages";

interface DashboardTotalCardProps {
  heavyRailImg: any;
  lightRailImg: any;
  data: {
    totalLightRailInspections: number;
    totalHeavyInspections: number;
    concludedLightRailInspections: number;
    concludedHeavyRailInspections: number;
  };
}

const DashboardTotalCard: React.FC<DashboardTotalCardProps> = ({
  heavyRailImg,
  lightRailImg,
  data,
}: DashboardTotalCardProps) => {
  const iconSize = 65;
  return (
    <Container>
      <Title>{messages.ManagementScreen.totalCarriedOut}</Title>
      <DivRail>
        <TotalInspectionsInfo
          bigNumber={data.concludedHeavyRailInspections?.toString() || "0"}
          smallNumber={data.totalHeavyInspections?.toString() || "0"}
          icon={
            <img
              src={heavyRailImg.src}
              alt={messages.RailType.heavy}
              width={iconSize}
              height={iconSize}
            />
          }
          title={messages.RailType.heavy}
        />
        <TotalInspectionsInfo
          bigNumber={data.concludedLightRailInspections?.toString() || "0"}
          smallNumber={data.totalLightRailInspections?.toString() || "0"}
          icon={
            <img
              src={lightRailImg.src}
              alt={messages.RailType.light}
              width={iconSize}
              height={iconSize}
            />
          }
          title={messages.RailType.light}
        />
      </DivRail>
    </Container>
  );
};

export default DashboardTotalCard;
