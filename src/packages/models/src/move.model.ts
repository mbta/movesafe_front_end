import { IInspection } from "./inspection.model";
import { IMoveCar } from "./moveCar.model";
import { IMoveReason } from "./moveReason.model";
import { ITag } from "./tag.model";
import { IYard } from "./yard.model";

export interface IMove {
  id: string;
  due_date: string;
  priority_order: number;
  move_from: string;
  move_to: string;
  move_cars: IMoveCar[];
  inspections: IInspection[];
  move_reason: IMoveReason;
  yard: IYard | Partial<IYard>;
  status: string;
  last_update: string;
  created_at: string;
  inspections_done_by_user: { name: string; badge_number: string } | null;
  yardmaster_user: { name: string; badge_number: string };
  tags: ITag[];
  inspections_selected_by_user_id: string | null;
}
