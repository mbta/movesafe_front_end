"use client";
import React, { useEffect } from "react";
import {
  ToastContainer,
  ToastContent,
  ToastMessage,
  CloseButton,
  CloseIcon,
} from "./styles";

interface ToastProps {
  message: string;
  onClose?: () => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  isSuccess?: boolean;
}

const Toast: React.FC<ToastProps> = ({
  message,
  onClose,
  visible,
  setVisible,
  isSuccess = false,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose, visible]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  return (
    <ToastContainer visible={visible} isSuccess={isSuccess}>
      <ToastContent>
        <ToastMessage>{message}</ToastMessage>
        <CloseButton onClick={handleClose}>
          <CloseIcon />
        </CloseButton>
      </ToastContent>
    </ToastContainer>
  );
};

export default Toast;
