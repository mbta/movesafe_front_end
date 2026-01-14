"use client";
import { IYardPerson, SignatureTypes } from "@repo/models";
import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

export const useSignature = () => {
  const signatureCanvasRef = useRef<SignatureCanvas | null>(null);

  const returnSignatureCanvasWidth = (): number => signatureCanvasWidth;

  const computeWidth = (): number => {
    if (typeof window === "undefined") return 600;
    const isMobile: boolean = window.innerWidth <= 1100;
    return isMobile ? window.innerWidth * 0.8 : window.innerWidth * 0.45;
  };

  const [signatureCanvasWidth, setSignatureCanvasWidth] = useState<number>(() =>
    computeWidth()
  );

  useEffect(() => {
    const handleResize = () => {
      setSignatureCanvasWidth(computeWidth());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeModal = (onClose: () => void) => {
    clearSignature();
    onClose();
  };

  const clearSignature = () => {
    if (signatureCanvasRef.current) {
      signatureCanvasRef.current.clear();
    }
  };

  //saves signature image as base64 in local storage
  const saveSignature = (
    moveId: string,
    signatureType: SignatureTypes,
    onClose: () => void,
    setIsSignatureCompleted: (isSigned: boolean) => void,
    onEmptySign: () => void,
    user: IYardPerson
  ) => {
    if (signatureCanvasRef.current) {
      if (signatureCanvasRef.current.isEmpty()) {
        onClose();
        onEmptySign();
        return;
      }

      const signatureImage = signatureCanvasRef.current.toDataURL();

      if (typeof window !== "undefined") {
        localStorage.setItem(`${signatureType}-${moveId}`, signatureImage);

        if (user)
          localStorage.setItem(
            `${signatureType}-${moveId}-user`,
            JSON.stringify(user)
          );
      }

      setIsSignatureCompleted(true);
    }
    onClose();
  };

  return {
    signatureCanvasRef,
    closeModal,
    saveSignature,
    clearSignature,
    returnSignatureCanvasWidth,
  };
};
