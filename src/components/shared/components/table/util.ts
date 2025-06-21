import { Column } from "@tanstack/react-table";

// Define a custom meta type
interface CustomColumnMeta {
  isColumnDraggable?: boolean;
}

// Extend the column with your custom meta type
export function getColumnOptions<TData extends Record<string, any>>(
  column: Column<TData, unknown> & { columnDef: { meta?: CustomColumnMeta } }
) {
  const isColumnDraggable = column.columnDef.meta?.isColumnDraggable ?? true;
  const canResize = column.getCanResize();
  const canPin = column.getCanPin();
  const isPinned = column.getIsPinned();
  const isLeftPinned = isPinned === "left" && column.getIsLastColumn("left");
  const isRightPinned =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    canPin,
    isPinned,
    canResize,
    isLeftPinned,
    isRightPinned,
    isColumnDraggable,
  };
}
