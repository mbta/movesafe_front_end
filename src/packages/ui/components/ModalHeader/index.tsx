import { metrics } from "@repo/themes";
import { MdClose } from "react-icons/md";
import { 
	TitleView,
	ModalTitle,
	CloseBtnContainer
 } from "./styles";

interface ModalHeaderProps {
	title: string;
	onClose: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  onClose
}) => {
	return(
		<TitleView>
			<ModalTitle>{title}</ModalTitle>
			<CloseBtnContainer>
				<MdClose 
					onClick={onClose} 
					size={metrics.iconBig}
				/>
			</CloseBtnContainer>
    </TitleView>
	);
}

export default ModalHeader;