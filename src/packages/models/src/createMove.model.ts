export interface ICreateMove {
  yard_id: string;
  move_reason_id: string;
  due_date: string;
  priority_order: number;
  move_from: string;
  move_to: string;
  move_done_by_user_id?: string;
  move_cars: ICreateMoveCar[];
  yardmaster_user_id: string;
  created_at?: string;
}

export interface ICreateMoveCar {
  first_car_id: string;
  second_car_id: string | undefined;
  pair_order: number;
}
