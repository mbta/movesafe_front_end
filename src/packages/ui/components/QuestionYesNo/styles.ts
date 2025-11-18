import styled from 'styled-components';
import { metrics, colors, fonts } from "@repo/themes";

interface ButtonProps {
  isSelected: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${colors.softGray};
  border-radius: ${metrics.borderRadius};
  background-color: ${colors.softSky};
  padding: ${metrics.largePadding};
  margin-bottom: ${metrics.largePadding};

  @media (max-width: 768px) {
    padding: ${metrics.defaultPadding};
  }
`;

export const QuestionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.p`
	color: ${colors.black};
	font-size: ${fonts.xxLarge};
	padding-right: ${metrics.defaultPadding};
	text-align: left;
  width: 100%;

	@media (max-width: 768px) {
		font-size: ${fonts.large};
	}
`;

export const TitleButton = styled.p`
  font-size: ${fonts.xLarge};
  font-weight: 500;
`;

export const ButtonDiv = styled.div`
  height: 70px;
  width: 30%;
  display: flex;
  margin-left: 0.5em;
`;

export const YesButton = styled.button<ButtonProps>`
  height: 100%;
  width: 80px;
  border: 1px solid ${colors.darkBlue};
  border-top-left-radius: ${metrics.borderRadius};
  border-bottom-left-radius: ${metrics.borderRadius};
  background-color: ${(props) => (props.isSelected ? colors.vibrantGreen : colors.white)};
  color: ${(props) => (props.isSelected ? colors.white : colors.primaryBlue)};
`;

export const NoButton = styled.button<ButtonProps>`
  height: 100%;
  width: 80px;
  border: 1px solid ${colors.darkBlue};
  border-top-right-radius: ${metrics.borderRadius};
  border-bottom-right-radius: ${metrics.borderRadius};
  background-color: ${(props) => (props.isSelected ? colors.red : colors.white)};
  color: ${(props) => (props.isSelected ? colors.white : colors.primaryBlue)};
`;