import { Select } from "rizzui";
import cn from "@utils/helperFunctions/class-names";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { useShipperData } from "@/hooks/shipper-hook";

interface CustomerInfoProps {
  className?: string;
  formik: any;
}

export default function CustomerInfo({ className, formik }: CustomerInfoProps) {
  const { fetchShippers, shippers } = useShipperData();

  useEffect(() => {
    fetchShippers();
  }, []);

  const shipperOptions = ensureArray(shippers)?.map((item: any) => ({
    value: item?.city,
    label: item?.city,
  }));

  useEffect(() => {
    if (shipperOptions.length > 0 && !formik.values.shipperCity) {
      formik.setFieldValue("shipperCity", shipperOptions[0]?.value);
    }
  }, [shipperOptions, formik]);

  return (
    <div className={cn("pb-6 @container @5xl:col-span-4 @5xl:py-0 @6xl:col-span-3", className)}>
      <div className="relative ">
        {ensureArray(shippers)?.length === 0 && (
          <Link
            className="absolute right-2 cursor-pointer text-[#3872fa] underline"
            to={"/add-shipper-info"}
          >
            Add Shipper
          </Link>
        )}
        <Select
          dropdownClassName="!z-0"
          options={shipperOptions}
          name="shipperCity"
          label="Shipper Address"
          value={formik?.values?.shipperCity}
          onChange={(option: { value: string }) =>
            formik.setFieldValue("shipperCity", option)
          }
          getOptionValue={(option) => option.value}
          onBlur={() => formik.setFieldTouched("shipperId", true)}
          error={formik?.touched?.shipperId && formik?.errors?.shipperId}
        />
      </div>
    </div>
  );
}
