import { useState } from "react";

function useInformationModal() {
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

	const setInfoModalVisibility = (visibility: boolean) => {
		setShowInfoModal(visibility);
	} 

	const items: string[] = [
    "Brake Cut-Out",
    "Door Leafs",
    "Brake Bypass",
    "End/Cab Door",
    "No Motion Bypass",
    "Glass",
    "Trip Cut-Out",
    "Sliding Window",
    "Air Spring Cut-Out",
    "Headlights",
    "No Manual PAs",
    "Horn",
    "Motor Cut-Out",
    "Wipers",
    "3 Blue Lights",
    "Safety Equipment",
    "Door Bypass",
    "MTU",
    "Safety Loop Bypass",
    "Pantograph",
    "Pilot Light",
    "Safety Defect",
  ];

  const isPreTripStep = (step: any): boolean =>
    step?.short_name === "Pre Trip Inspection";

	return { showInfoModal, setInfoModalVisibility, items, isPreTripStep };
}

export default useInformationModal;