import { useState } from "react";
import { DatePicker } from "@ui/datepicker";
import WidgetCard from "@shared/components/cards/widget-card";
import { Avatar, Button, Text, Title } from "rizzui";
// import { topProducts } from '@data/top-products-data';
import Rating from "@shared/components/rating";
import { useNavigate } from "react-router-dom";

const currentDate = new Date();
const previousMonthDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() - 1,
  currentDate.getDate()
);

export default function BestSellers({ className, dashboardData }: { className?: string, dashboardData: any }) {
  const [rangeDate, setRangeDate] = useState<[Date | null, Date | null]>([
    previousMonthDate,
    currentDate,
  ]);
  const navigate = useNavigate();

  return (
    <WidgetCard
      title={"Top Products"}
      // description={
      //   <>
      //     Overview:
      //     <DatePicker
      //       selected={rangeDate?.[0]}
      //       onChange={(dates) => setRangeDate(dates)}
      //       startDate={rangeDate?.[0] as Date}
      //       endDate={rangeDate?.[1] as Date}
      //       monthsShown={1}
      //       placeholderText="Select Date in a Range"
      //       selectsRange
      //       inputProps={{
      //         variant: "text",
      //         inputClassName: "p-0 pe-1 h-auto ms-2 [&_input]:text-ellipsis",
      //         prefixClassName: "hidden",
      //       }}
      //     />
      //   </>
      // }
      action={
        <Button variant="text" onClick={() => navigate("/products")} className="whitespace-nowrap underline">
          View All
        </Button>
      }
      descriptionClassName="mt-1 flex items-center [&_.react-datepicker-wrapper]:w-full [&_.react-datepicker-wrapper]:max-w-[228px] text-gray-500"
      className={className}
    >
      <div className="custom-scrollbar mt-[18px] grid max-h-[460px] overflow-y-auto">
        {dashboardData?.topProducts?.map((product: any) => (
          <div key={product?.product?._id} className="flex items-start p-1">
            <div className="relative me-3 h-11 w-11 shrink-0 overflow-hidden rounded @sm:h-12 @sm:w-12">
              <Avatar
                src={product?.product?.image}
                name={product?.product?.name}
                className="object-cover"
              />
            </div>
            <div className="flex w-full items-start justify-between">
              <div>
                <Text className="font-lexend text-sm font-medium text-gray-900 dark:text-gray-700">
                  {product?.product?.name}
                </Text>
                <Text className="text-gray-500">Rs. {product?.product?.price}</Text>
              </div>
              <div className="flex flex-col items-center">
                <Text className="font-lexend text-sm font-medium text-gray-900 dark:text-gray-700">
                  Stock
                </Text>
                <Text className="font-lexend text-sm">
                  {product?.product?.stock}
                </Text>
              </div>
              <div className="flex flex-col items-center">
                <Text className="font-lexend text-sm font-medium text-gray-900 dark:text-gray-700">
                  Cateogry
                </Text>
                <Text className="font-lexend text-sm">
                  {product?.product?.category}
                </Text>
              </div>
              <div className="flex flex-col items-center">
                <Text className="font-semibold text-black">Total Orders</Text>
                <Text>{product?.totalSold}</Text>
                {/* <Rating rating={product.rating} /> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
