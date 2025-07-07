import StatusField from "@shared/components/controlled-table/status-field";
import { FilterDrawerView } from "@shared/components/controlled-table/table-filter";
import { orderStatusOptions, renderOptionDisplayValue } from "@shared/components/invoice/form-utils";
import ToggleColumns from "@shared/components/table-utils/toggle-columns";
import { type Table as ReactTableType } from "@tanstack/react-table";
import { useState } from "react";
import { PiFunnel, PiTrashDuotone } from "react-icons/pi";
import { Button } from "rizzui";
import { useQueryParams } from "@/hooks/useQueryParams";

interface TableToolbarProps<T extends Record<string, any>> {
  table: ReactTableType<T>;
  isLoading?: boolean;
  deleteParams?: any;
  setOpenDrawer?: any;
  paymentStatus?: String;
  setPaymentStatus?: any;
  onFilterApply?: any;
}

export default function Filters<TData extends Record<string, any>>({
  table,
  isLoading,
  onFilterApply,
  paymentStatus,
  setPaymentStatus,
}: TableToolbarProps<TData>) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMultipleSelected = table?.getSelectedRowModel()?.rows?.length > 1;
  const {options: { meta }} = table;
  const { deleteParams } = useQueryParams();

  return (
    <>
      <FilterDrawerView
        isOpen={openDrawer}
        isLoading={isLoading}
        drawerTitle="Table Filters"
        onFilterApply={onFilterApply}
        setOpenDrawer={setOpenDrawer}
      >
        <div className="grid grid-cols-1 gap-6">
          <FilterElements
            table={table}
            deleteParams={deleteParams}
            paymentStatus={paymentStatus}
            setOpenDrawer={setOpenDrawer}
            setPaymentStatus={setPaymentStatus}
          />
        </div>
      </FilterDrawerView>

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
    </>
  );
}

function FilterElements<T extends Record<string, any>>({
  table,
  deleteParams,
  setOpenDrawer,
  paymentStatus,
  setPaymentStatus,
}: TableToolbarProps<T>) {
  const isFiltered = Boolean(paymentStatus);

  return (
    <>
      <StatusField
        options={orderStatusOptions}
        value={orderStatusOptions?.find((opt) => opt?.value === paymentStatus)}
        onChange={(option: any) => setPaymentStatus(option?.value)}
        getOptionDisplayValue={(option: { value: any }) =>
          renderOptionDisplayValue(option?.value as string)
        }
        dropdownClassName="!z-20 h-auto"
        className={"w-auto"}
        label="Payment"
      />
      {isFiltered && (
        <Button
          size="sm"
          onClick={() => {
            setPaymentStatus("");
            deleteParams(["payment"]);
            setOpenDrawer(false);
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
