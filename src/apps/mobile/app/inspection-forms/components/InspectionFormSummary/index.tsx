import { IoCompassOutline } from "react-icons/io5";
import {
  Description,
  Bold,
  CarInfo,
  Title,
  Container,
  Link,
  ListTable,
  ListItem,
} from "./styles";
import { colors, metrics } from "@repo/themes";
import { IMove, IMoveCar } from "@repo/models";
import { IInspectionFormsStep } from "../../../../models/inspectionFormsStep.model";
import { InformationModal } from "@repo/ui/components";
import { useInformationModal } from "@repo/ui/hooks";
import messages from "@repo/constants/messages";

interface InspectionFormSummaryProps {
  move: IMove;
  step: IInspectionFormsStep | null;
}

const InspectionFormSummary: React.FC<InspectionFormSummaryProps> = ({
  move,
  step,
}: InspectionFormSummaryProps) => {
  const { showInfoModal, setInfoModalVisibility, items, isPreTripStep } =
    useInformationModal();
  return (
    <>
      <Container>
        <Title>{step?.name}</Title>
        <Description>
          <Bold>Instruction:</Bold> {step?.description}
          {isPreTripStep(step) && (
            <Link onClick={() => setInfoModalVisibility(true)}>
              {messages.Labels.completeInstructions}
            </Link>
          )}
        </Description>
        <CarInfo>
          <IoCompassOutline size={metrics.iconBig} color={colors.darkBlue} />
          <Bold>South to North</Bold>
          {move.move_cars.map((e: IMoveCar) => {
            return (
              <div key={e.pair_order}>
                {e.first_car.series_number} {e.second_car?.series_number}
              </div>
            );
          })}
        </CarInfo>
      </Container>

      <InformationModal
        visibility={showInfoModal}
        onClose={() => setInfoModalVisibility(false)}
        title={step?.short_name ?? messages.Labels.instruction}
        content={
          <div style={{ width: "98%" }}>
            <div>
              Below is the list of major defects. Any defect beyond this is a
              minor defect.
            </div>

            <ListTable>
              {items.map((item, index) => (
                <ListItem key={index} $index={index}>
                  {item}
                </ListItem>
              ))}
            </ListTable>
          </div>
        }
      />
    </>
  );
};

export default InspectionFormSummary;
