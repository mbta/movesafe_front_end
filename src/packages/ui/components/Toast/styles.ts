import styled from 'styled-components';
import { FiXCircle } from 'react-icons/fi';
import { colors } from '@repo/themes';

export const ToastContainer = styled.div<{ visible: boolean, isSuccess: boolean }>`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${props => (props.isSuccess ? colors.vibrantGreen : colors.red)};
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease-in-out;
  opacity: ${props => (props.visible ? '1' : '0')};
  pointer-events: ${props => (props.visible ? 'auto' : 'none')};
`;

export const ToastContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ToastMessage = styled.span`
  flex: 1;
  margin-right: 10px;
	font-size: 26px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 1.2rem;
`;

export const CloseIcon = styled(FiXCircle)`
  font-size: 2.5rem;
`;
