import React from 'react';
import { CarNumbersCard } from '@repo/ui/components';
import { IMove } from '@repo/models';
import { 
	useFormatDate, 
	useFormatString, 
	useStatus 
} from '@repo/ui/hooks';
import {
	CardContainer, 
	RowContainer,
	DateTimeText, 
	LeftAlignContainer,
	ReasonTitle,
	StatusText,
	InspectionFailedText,
	FailedVehicleContainer
} from './styles';
import messages from '@repo/constants/messages';
import { MoveStatus } from '@repo/constants/constants';
import { MdOutlineWarningAmber } from "react-icons/md";
import { metrics, colors } from '@repo/themes';

interface MoveHistoryCardProps {
	item: IMove;
	onClick: (item: IMove) => void;
} 

const MoveHistoryCard: React.FC<MoveHistoryCardProps> = ({ 
	item,
	onClick
} : MoveHistoryCardProps) => {
	const selectColor = useStatus();
	const date = useFormatDate();
	const useString = useFormatString();
 	const statusColor = selectColor.moveStatusColor(item.status);
	const statusName = selectColor.moveStatusName(item.status);
	const failedVehicle = 
		item.status === MoveStatus.inspection_failed || 
		item.status === MoveStatus.inspection_failed_pending_signature;

	return (
		<CardContainer onClick={() => onClick(item) }>
			{failedVehicle &&
				<FailedVehicleContainer>
					<MdOutlineWarningAmber  size={metrics.iconSize} color={colors.red} />
					<InspectionFailedText>{messages.Error.doNotMoveVehicle}</InspectionFailedText>
				</FailedVehicleContainer>
			}
			<RowContainer>
				<LeftAlignContainer>
					<StatusText color={statusColor}>{statusName}</StatusText>
					<StatusText>{messages.Labels.in}</StatusText>
					<DateTimeText>{date.formatDateTime(item.last_update)}</DateTimeText>
				</LeftAlignContainer>
			</RowContainer>
			<ReasonTitle>{useString.formatReasonName(item.move_reason.name)}</ReasonTitle>
			<CarNumbersCard carNumbers={item.move_cars} />
		</CardContainer>
	);
}

export default MoveHistoryCard;