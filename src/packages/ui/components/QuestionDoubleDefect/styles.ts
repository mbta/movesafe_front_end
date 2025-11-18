import styled from 'styled-components';
import { metrics, colors, fonts } from "@repo/themes";

export const Container = styled.div`
    height: 20%;
    align-items: center;
    border: 1px solid ${colors.softGray};
    border-radius: ${metrics.borderRadius};
    background-color: ${colors.softWhiteBlue};
	padding: ${metrics.defaultPadding};
    margin-bottom: ${metrics.largePadding};
	
    @media (max-width: 730px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
  	}
`;

export const Title = styled.p`
    font-size: 30px;
    color: ${colors.black};
    font-weight: 500;
    margin-top: 2%;

    @media (max-width: 768px) {
      font-size: ${fonts.large};
  	}
`;

export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const TrainUnitContainer = styled.div<{ index: number }>`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    margin: ${({ index }) => (index % 2 === 0 ? '5px 5px 5px 10px' : '5px 15px 5px 5px')};
`;

export const TrainContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const Button = styled.button<{ selected?: boolean, color?: string, isSmall?: boolean }>`
    width: 6em;
    height: 6em;
    border: ${metrics.borderWidth} solid ${colors.softGray};
    border-radius: ${metrics.borderRadius};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ color }) => color || colors.softWhiteBlue};

    @media (max-width: 768px) {
      width: ${(props) => props.isSmall ? '5em' : '6em'};
      height: ${(props) => props.isSmall ? '5em' : '6em'};
  	}
`;

export const Icon = styled.img`
    width: 40px;
    height: 50px;
`;

export const IconOption = styled.img<{ isTrainIcon: boolean }>`
    width: ${({ isTrainIcon }) => (isTrainIcon ? '40px' : '50px')};
    height: '50px';
`;

export const CarNumberText = styled.div`
    font-family: sans-serif;
    font-size: ${fonts.xLarge};
    color: ${colors.gray};
    font-weight: 100;
    margin: 0.5em;

    @media (max-width: 768px) {
      font-size: ${fonts.medium};
      margin: 0em;
  	}
`;

export const CarOrderIndicator = styled.p`
    font-family: sans-serif;
    font-size: ${fonts.xLarge};
    color: ${colors.gray};
    margin-top: ${metrics.smallPadding};
    margin-bottom: 1.8em;
    display: flex;
	align-self: flex-end;

    @media (max-width: 730px) {
      font-size: ${fonts.medium};
  	}
`;

export const SupText = styled.sup`
    font-size: ${fonts.xLarge};
    vertical-align: middle;

    @media (max-width: 730px) {
      font-size: ${fonts.medium};
  	}
`;

export const DefectOptionsContainer = styled.div<{ isSmall?: boolean }>`
    display: flex;
    position: absolute;
    flex-direction: column;
    background-color: ${colors.softWhiteBlue};
    align-items: center;
    justify-content: center;
    margin-top: 130%;
    z-index: 1; 

    @media (max-width: 730px) {
      margin-top: ${(props) => props.isSmall ? '140%' : '160%'};
  	}
`;

export const DefectOption = styled.div<{ isSmall?: boolean }>`
    width: 5em;
    height: 5em;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.softWhiteBlue};
    border: 1px solid ${colors.softGray};
    border-radius: 2px;
    cursor: pointer;
    &:hover {
        background-color: ${colors.lightGray};
    }

    @media (max-width: 725px) {
      width: ${(props) => props.isSmall ? '2.5em' : '6em'};
      height: ${(props) => props.isSmall ? '2.5em' : '6em'};
  	}
`;

export const QuestionText = styled.p`
	color: ${colors.black};
	font-size: ${fonts.xxLarge};
	padding-right: ${metrics.defaultPadding};
	text-align: left;

	@media (max-width: 768px) {
		font-size: ${fonts.large};
	}
`;

export const CollapsedInfoContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	align-content: center;
`;