import { type Table as ReactTableType } from "@tanstack/react-table";
import {
  ActionIcon,
  Box,
  Flex,
  Grid,
  Select,
  SelectOption,
  Text,
} from "rizzui";
import {
  PiCaretLeftBold,
  PiCaretRightBold,
  PiCaretDoubleLeftBold,
  PiCaretDoubleRightBold,
} from "react-icons/pi";
import cn from "@utils/helperFunctions/class-names";

export default function TablePagination<TData extends Record<string, any>>({
  table,
  currentPage,
  totalPages,
  updateParams,
  showSelectedCount = false,
  className,
}: {
  table: ReactTableType<TData>;
  currentPage: number;
  totalPages: number;

  showSelectedCount?: boolean;
  updateParams: (page: Record<string, string | number>) => void;
  className?: string;
}) {
  const options = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];
  return (
    <Flex
      gap="6"
      align="center"
      justify="between"
      className={cn("@container", className)}
    >
      <Flex align="center" className="w-auto shrink-0">
        <Text className="hidden font-normal text-gray-600 @md:block">
          Rows per page
        </Text>
        <Select
          size="sm"
          variant="flat"
          options={options}
          className="w-14"
          value={table.getState().pagination.pageSize}
          onChange={(v: SelectOption) => {
            table.setPageSize(Number(v.value));
            updateParams({ limit: Number(v.value) });
          }}
          suffixClassName="[&>svg]:size-3"
          selectClassName="font-semibold text-xs ring-0 shadow-sm h-7"
          optionClassName="font-medium text-xs px-2 justify-center"
        />
      </Flex>
      {showSelectedCount && (
        <Box className="hidden @2xl:block w-full">
          <Text>
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </Text>
        </Box>
      )}
      <Flex justify="end" align="center">
        <Text className="hidden font-normal text-gray-600 @3xl:block">
          Page {currentPage} of{" "}
          {totalPages ? (totalPages === 0 ? currentPage : totalPages) : 1}
        </Text>
        <Grid gap="2" columns="4">
          <ActionIcon
            size="sm"
            rounded="lg"
            variant="outline"
            aria-label="Go to first page"
            onClick={() => updateParams({ page: 1 })}
            disabled={currentPage <= 1}
            className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none"
          >
            <PiCaretDoubleLeftBold className="size-3.5" />
          </ActionIcon>

          <ActionIcon
            size="sm"
            rounded="lg"
            variant="outline"
            aria-label="Go to previous page"
            onClick={() => updateParams({ page: currentPage - 1 })}
            disabled={currentPage <= 1}
            className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none"
          >
            <PiCaretLeftBold className="size-3.5" />
          </ActionIcon>

          <ActionIcon
            size="sm"
            rounded="lg"
            variant="outline"
            aria-label="Go to next page"
            onClick={() => updateParams({ page: currentPage + 1 })}
            // disabled={
            //   currentPage ===
            //   (totalPages ? (totalPages === 0 ? currentPage : totalPages) : 1)
            // }
            disabled={currentPage >= Math.max(1, totalPages)}
            className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none"
          >
            <PiCaretRightBold className="size-3.5" />
          </ActionIcon>

          <ActionIcon
            size="sm"
            rounded="lg"
            variant="outline"
            aria-label="Go to last page"
            onClick={() => updateParams({ page: totalPages })}
            disabled={currentPage >= Math.max(1, totalPages)}
            className="text-gray-900 shadow-sm disabled:text-gray-400 disabled:shadow-none"
          >
            <PiCaretDoubleRightBold className="size-3.5" />
          </ActionIcon>
        </Grid>
      </Flex>
    </Flex>
  );
}
