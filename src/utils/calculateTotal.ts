import type { TableData } from "../types/tableTypes";

export function calculateTotal<T extends keyof TableData>(
  data: TableData[],
  field: T
): number {
  return data.reduce((sum, item) => sum + (item[field] as number), 0);
}