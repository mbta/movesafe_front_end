export interface IMoveCar {
    pair_order: number;
    first_car: ICar;
    second_car: ICar;
}

export interface ICar {
    id: string;
    series_number: string;
}