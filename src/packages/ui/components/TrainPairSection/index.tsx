import messages from "@repo/constants/messages";
import { ICar, SelectOption } from "@repo/models";
import colors from "@repo/themes/colors";
import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import IconButton from "../IconButton";
import InputBox from "../InputBox";
import InputSelect from "../InputSelect";
import {
  DeleteView,
  DestinationView,
  InputView,
  OrderView,
  PairViewComboBox,
  ViewPair,
} from "./styles";

interface ISelectOptionItem {
  from: string;
  to: string;
  moveOrder: string;
  firstPair1: any;
  firstPair2: any;
  secondPair1: any;
  secondPair2: any;
  thirdPair1: any;
  thirdPair2: any;
}

interface TrainPairSectionProps {
  carsSelectData: SelectOption<ICar>[];
  item: ISelectOptionItem;
  handleCarChange: (name: string, value: any) => void;
  handleChangeTextInput: (name: string, value: string) => void;
  handleMoveOrderChange: (value: string) => void;
  isMobile: boolean;
  index: number;
  onRemove?: () => void;
}

const TrainPairSection: React.FC<TrainPairSectionProps> = ({
  carsSelectData,
  item,
  handleCarChange,
  handleChangeTextInput,
  handleMoveOrderChange,
  isMobile,
  index,
  onRemove,
}) => {
  return (
    <div style={{ display: "flex" }}>
      <OrderView>
        <InputBox
          inputTitle={messages.CreateMove.order}
          placeholder={messages.CreateMove.order}
          size="small"
          type="number"
          value={item.moveOrder || (index + 1).toString()}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = event.target.value.replace(/\D/g, "");
            handleMoveOrderChange(newValue);
          }}
        />
      </OrderView>

      <PairViewComboBox $isMobile={isMobile}>
        <ViewPair title="true" $isMobile={isMobile}>
          <InputSelect
            inputTitle={messages.CreateMove.first}
            options={carsSelectData}
            size={isMobile ? "small" : "full"}
            width={isMobile ? "85%" : undefined}
            onChange={(value) => handleCarChange("firstPair1", value)}
            value={item.firstPair1}
          />
        </ViewPair>
        <ViewPair title="false" $isMobile={isMobile}>
          <InputSelect
            options={carsSelectData}
            size={isMobile ? "small" : "full"}
            width={isMobile ? "85%" : undefined}
            onChange={(value) => handleCarChange("firstPair2", value)}
            value={item.firstPair2}
          />
        </ViewPair>
      </PairViewComboBox>

      <PairViewComboBox $isMobile={isMobile}>
        <ViewPair title="true" $isMobile={isMobile}>
          <InputSelect
            inputTitle={messages.CreateMove.second}
            options={carsSelectData}
            size={isMobile ? "small" : "full"}
            width={isMobile ? "85%" : undefined}
            onChange={(value) => handleCarChange("secondPair1", value)}
            value={item.secondPair1}
            disabled={!item.firstPair1 || !item.firstPair2}
          />
        </ViewPair>
        <ViewPair title="false" $isMobile={isMobile}>
          <InputSelect
            options={carsSelectData}
            size={isMobile ? "small" : "full"}
            width={isMobile ? "85%" : undefined}
            onChange={(value) => handleCarChange("secondPair2", value)}
            value={item.secondPair2}
            disabled={!item.firstPair1 || !item.firstPair2}
          />
        </ViewPair>
      </PairViewComboBox>

      <PairViewComboBox $isMobile={isMobile}>
        <ViewPair title="true" $isMobile={isMobile}>
          <InputSelect
            inputTitle={messages.CreateMove.third}
            options={carsSelectData}
            size={isMobile ? "small" : "full"}
            width={isMobile ? "85%" : undefined}
            onChange={(value) => handleCarChange("thirdPair1", value)}
            value={item.thirdPair1}
            disabled={!item.secondPair1 || !item.secondPair2}
          />
        </ViewPair>
        <ViewPair title="false" $isMobile={isMobile}>
          <InputSelect
            options={carsSelectData}
            size={isMobile ? "small" : "full"}
            width={isMobile ? "85%" : undefined}
            onChange={(value) => handleCarChange("thirdPair2", value)}
            value={item.thirdPair2}
            disabled={!item.secondPair1 || !item.secondPair2}
          />
        </ViewPair>
      </PairViewComboBox>

      <DestinationView $isMobile={isMobile}>
        <InputView $isMobile={isMobile}>
          <InputBox
            inputTitle={messages.CreateMove.destination}
            placeholder={messages.CreateMove.from}
            size={isMobile ? "small" : "small"}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeTextInput("from", event.target.value)
            }
            value={item.from}
          />
        </InputView>
        <InputView $isMobile={isMobile}>
          <InputBox
            placeholder={messages.CreateMove.to}
            size={isMobile ? "small" : "small"}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeTextInput("to", event.target.value)
            }
            value={item.to}
          />
        </InputView>
      </DestinationView>

      <DeleteView>
        {onRemove && (
          <IconButton
            onClick={onRemove}
            icon={<IoTrashOutline color={colors.primaryBlue} size={25} />}
            noBorder
          />
        )}
      </DeleteView>
    </div>
  );
};

export default TrainPairSection;
