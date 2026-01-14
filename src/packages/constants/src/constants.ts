export type TransportOption = 'Heavy Rail and Light Rail' | 'Heavy Rail' | 'Light Rail';
export const transportOptions: TransportOption[] = ['Heavy Rail and Light Rail', 'Heavy Rail', 'Light Rail'];
export const defaultTransportOption: TransportOption = 'Heavy Rail and Light Rail';

export const TAB_VARIANT_BLUE = 'blue';
export const TAB_VARIANT_WHITE = 'white';

export const SHORT_REFETCH_TIME: number = 30000;
export const LONG_REFETCH_TIME: number = 120000;

export enum StorageNames {
	assignedMove = 'assignedMove',
	selectedYard = 'yard_id',
	selectedLine = 'line_id',
	inspectionForms = 'inspectionForms',
	lines = 'lines',
	yards = 'yards',
}

export enum MoveStatus {
	waiting = "waiting",
	pending_checklist = "pending_checklist",
	pending_move = "pending_move",
	pending_yardmaster_signature = "pending_yardmaster_signature",
	done = "done",
	cancelled = "cancelled",
	inspection_failed = "inspection_failed",
	inspection_failed_pending_signature = "inspection_failed_pending_signature"
}

export enum ComponentSizes {
	small = "small",
	medium = "medium",
	large = "large",
	full = "full"
}

export const TableHeaders: string[] = [
	"Date",
	"Time",
	"Yard",
	"Location",
	"Yardmaster",
	"Employee Badge",
	"First Pair Number",
	"Second Pair Number",
	"Third Pair Number",
	"From",
	"To",
	"Reason For Move",
	"Circle Check Form Received?",
	"Safety Inspection Form Received?",
	"EVI Form Received?",
	"Pre-trip Inspection Form Received?",
	"Status"
];

export const FormsShortNames: string[] = [
	"EVI",
	"Safety Inspection",
	"Pre Trip Inspection",
	"Car House Circle Checklist",
]

export const CarSections: string[] = [
	"Exterior",
	"Operating Cab",
	"Car Interior",
	"Non-Op Cab",
	"All Cabs",
	"Safety Equip",
]