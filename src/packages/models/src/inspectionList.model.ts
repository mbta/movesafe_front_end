export interface InspectionsResp {
  id: string;
  due_date: string;
  priority_order: number;
  move_from: string;
  move_to: string;
  created_at: string;
  status: string;
  move_cars: {
    first_car: { series_number: string };
    second_car: { series_number: string };
  }[];
  inspections: object[];
  move_reason: { name: string };
  yard: { name: string; line: { name: string } };
  inspections_done_by_user: { name: string; badge_number: string } | null;
  yardmaster_user: { name: string; badge_number: string };
}

export interface InspectionData {
  id: string;
  time: string;
  yardmasterNumber: string;
  yardmasterName: string;
  employeeNumber: string;
  employeeName: string;
  firstF: string;
  secondF: string;
  firstS: string;
  secondS: string;
  firstT: string;
  secondT: string;
  from: string;
  to: string;
  reasonMove: string;
  order: string;
  status: string;
  line: string;
  location: string;
}
