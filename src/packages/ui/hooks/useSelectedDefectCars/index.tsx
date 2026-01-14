import { useState } from "react";

export const useSelectedDefectCars = (initialCars: string[] = []) => {
  const [selectedCars, setSelectedCars] = useState<string[]>(initialCars);

  const handleButtonClick = (serial: string) => {
    let updatedSelectedCars: string[];
    if (selectedCars.includes(serial)) {
      updatedSelectedCars = selectedCars.filter((s) => s !== serial);
    } else {
      updatedSelectedCars = [...selectedCars, serial];
    }
    setSelectedCars(updatedSelectedCars);
  };

  return {
    selectedCars,
    handleButtonClick,
  };
};
