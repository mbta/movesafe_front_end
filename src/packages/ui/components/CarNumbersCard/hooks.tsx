import { useState, useEffect } from 'react';
import { IMoveCar } from '@repo/models';

const useSortMoveCars = (initialMoveCars: IMoveCar[]) => {
	const [sortedMoveCars, setSortedMoveCars] = useState<IMoveCar[]>([]);

	useEffect(() => {
			const sortMoveCars = (moveCars: IMoveCar[]): IMoveCar[] => {
					moveCars.sort((a, b) => a.pair_order - b.pair_order);

					return moveCars.map(moveCar => {
							const cars = [moveCar.first_car, moveCar.second_car];
							cars.sort((a, b) => a?.series_number.localeCompare(b?.series_number));

							return {
									...moveCar,
									first_car: cars[0],
									second_car: cars[1]
							};
					});
			};

			const sorted = sortMoveCars(initialMoveCars);
			setSortedMoveCars(sorted);
	}, [initialMoveCars]);

	return sortedMoveCars;
};

export default useSortMoveCars;