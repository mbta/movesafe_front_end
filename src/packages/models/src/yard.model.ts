import { ILine } from "./line.model";

export interface IYard {
    id: string;
    name: string;
    is_main_yard: boolean;
    line?: Partial<ILine>;
}

export interface IYardPerson {
    id?: string;
    name: string;
    badge_number: string;
}