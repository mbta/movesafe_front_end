import { IMoveDetailsAuditLog, IMoveDetailsInspection, IMoveDetailsSignature } from "./moveDetails.model";

export interface IPDFData {
	reason: string;
	yard: string;
	yardmaster: string;
	employeeBadge: string;
	date: string;
	time: string;
	fromTo: string;
	first: string;
	second: string;
	third: string;
	orderedMoveCars: string[];
	inspections: IMoveDetailsInspection[];
	signatures: IMoveDetailsSignature[];
	employeeHistory: IMoveDetailsAuditLog[];
}