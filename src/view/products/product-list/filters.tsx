import DateFiled from "@shared/components/controlled-table/date-field";
import PriceField from "@shared/components/controlled-table/price-field";
import StatusField from "@shared/components/controlled-table/status-field";
import { FilterDrawerView } from "@shared/components/controlled-table/table-filter";
import { orderStatusOptions, renderOptionDisplayValue, statusOptions } from "@shared/components/invoice/form-utils";
import ToggleColumns from "@shared/components/table-utils/toggle-columns";
import { getDateRangeStateValues } from "@utils/helperFunctions/get-formatted-date";
import { type Table as ReactTableType } from "@tanstack/react-table";
import { useState } from "react";
import {  PiFunnel, PiMagnifyingGlassBold, PiTrash, PiTrashDuotone } from "react-icons/pi";
import { Button, Flex, Input } from "rizzui";

interface TableToolbarProps<T extends Record<string, any>> {
  table: ReactTableType<T>;
}

export default function Filters<TData extends Record<string, any>>({ table }: TableToolbarProps<TData>) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMultipleSelected = table?.getSelectedRowModel()?.rows?.length > 1;
  const { options: {meta}} = table;

  return (
    <>
    {/* // <Flex className="mb-4"> */}
      {/* <Input
        type="search"
        placeholder="Search by product name..."
        value={table.getState().globalFilter ?? ""}
        onClear={() => table.setGlobalFilter("")}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        inputClassName="h-9"
        clearable={true}
        prefix={<PiMagnifyingGlassBold className="size-4" />}
      /> */}

      <FilterDrawerView
        isOpen={openDrawer}
        drawerTitle="Table Filters"
        setOpenDrawer={setOpenDrawer}
      >
        <div className="grid grid-cols-1 gap-6">
          <FilterElements table={table} />
        </div>
      </FilterDrawerView>

      {/* <Flex align="center" gap="3" className="w-auto"> */}
        {/* {isMultipleSelected ? (
          <Button
            color="danger"
            variant="outline"
            className="h-[34px] gap-2 text-sm"
            onClick={() =>
              meta?.handleMultipleDelete &&
              meta.handleMultipleDelete(
                table.getSelectedRowModel().rows.map((r) => r.original.id)
              )
            }
          >
            <PiTrash size={18} />
            Delete
          </Button>
        ) : null} */}

        <div className="flex gap-2">
          <Button
            variant={"outline"}
            onClick={() => setOpenDrawer(!openDrawer)}
            className="h-9 pe-3 ps-2.5"
          >
            <PiFunnel className="me-1.5 size-[18px]" strokeWidth={1.7} />
            Filters
          </Button>

          <ToggleColumns table={table} />
        </div>
      {/* </Flex> */}
    {/* </Flex> */}
    </>
  );
}

function FilterElements<T extends Record<string, any>>({ table }: TableToolbarProps<T>) {
  // const priceFieldValue = (table.getColumn("amount")?.getFilterValue() ?? [ "", "", ]) as string[];
  // const createdDate = table.getColumn("createdAt")?.getFilterValue() ?? ([null, null] as any);
  // const dueDate = table.getColumn("dueDate")?.getFilterValue() ?? ([null, null] as any);
  const isFiltered = table?.getState()?.globalFilter || table?.getState()?.columnFilters?.length > 0;

  return (
    <>
      {/* <PriceField
        value={priceFieldValue}
        onChange={(v) => table.getColumn("amount")?.setFilterValue(v)}
        label="Amount"
      />
      <DateFiled
        selectsRange
        dateFormat={"dd-MMM-yyyy"}
        className="w-full"
        placeholderText="Select created date"
        endDate={getDateRangeStateValues(createdDate[1])!}
        selected={getDateRangeStateValues(createdDate[0])}
        startDate={getDateRangeStateValues(createdDate[0])!}
        onChange={(date) => table.getColumn("createdAt")?.setFilterValue(date)}
        inputProps={{
          label: "Created Date",
        }}
      /> */}
      {console.log(table?.getColumn("payment"))as any}
      <StatusField
        options={orderStatusOptions}
        value={table.getColumn("payment")?.getFilterValue() ?? []}
        onChange={(e) => table.getColumn("payment")?.setFilterValue(e)}
        getOptionValue={(option: { value: any }) => option.value}
        getOptionDisplayValue={(option: { value: any }) =>
          renderOptionDisplayValue(option.value as string)
        }
        displayValue={(selected: string) => renderOptionDisplayValue(selected)}
        dropdownClassName="!z-20 h-auto"
        className={"w-auto"}
        label="Payment"
      />

      {isFiltered && (
        <Button
          size="sm"
          onClick={() => {
            table.resetGlobalFilter();
            table.resetColumnFilters();
          }}
          variant="flat"
          className="h-9 bg-gray-200/70"
        >
          <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
        </Button>
      )}
    </>
  );
}
