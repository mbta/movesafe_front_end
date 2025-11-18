"use client";
import React from "react";
import { IMoveDetailsAuditLog } from "@repo/models";
import { useFormatDate, useFormatString } from "@repo/ui/hooks";
import { LogsTable, TableCell } from "./styles";
import messages from "@repo/constants/messages";

interface HistoryTabContentProps {
  logs: IMoveDetailsAuditLog[];
}

const HistoryTabContent: React.FC<HistoryTabContentProps> = ({
  logs,
}: HistoryTabContentProps) => {
  const formatDate = useFormatDate();
  const formatString = useFormatString();

  const orderedLogs: IMoveDetailsAuditLog[] = logs.sort(function (
    a: IMoveDetailsAuditLog,
    b: IMoveDetailsAuditLog
  ) {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <>
      <LogsTable>
        <thead>
          <tr>
            <th>{messages.EmployeeHistory.dateTime}</th>
            <th>{messages.EmployeeHistory.name}</th>
            <th>{messages.EmployeeHistory.action}</th>
          </tr>
        </thead>
        <tbody>
          {orderedLogs.map((e) => (
            <tr key={e.created_at}>
              <TableCell>{formatDate.formatDateTime(e.created_at)}</TableCell>
              <TableCell>{e.user.name}</TableCell>
              <TableCell>{formatString.formatEmployeeAction(e.action)}</TableCell>
            </tr>
          ))}
        </tbody>
      </LogsTable>
    </>
  );
};

export default HistoryTabContent;
