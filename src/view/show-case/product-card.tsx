import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";
import cn from "@utils/helperFunctions/class-names";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Text } from "rizzui";

interface ProductProps {
  product: any;
  className?: string;
  routes: any;
}

export default function untProductModernCard({
  product,
  className,
  routes,
}: ProductProps) {
  const navigate = useNavigate();
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const groupedBySubCategory: Record<string, any[]> = {};
  ensureArray(product)?.forEach((item: any) => {
    const subCat = item?.resale?.subCategory;
    if (!groupedBySubCategory[subCat]) groupedBySubCategory[subCat] = [];
    groupedBySubCategory[subCat]?.push(item);
  });

  const scrollLeft: any = (subCat: string) => {
    const ref = scrollRefs.current[subCat];
    ref?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = (subCat: string) => {
    const ref = scrollRefs.current[subCat];
    ref?.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <>
      {Object.entries(groupedBySubCategory)?.map(([subCat, products], idx) => {
        return (
          <div key={idx} className="mb-12">
            <h2 className="text-xl font-bold mb-4 ps-8">{subCat}</h2>

            <div className="relative">
              <button
                onClick={() => scrollLeft(subCat)}
                className="absolute left-0 top-1/3 -translate-y-1/2 z-10 bg-white dark:bg-black p-2 rounded-full shadow-md"
              >
                <PiArrowLeft size={20} />
              </button>

              <div
                ref={(el) => (scrollRefs.current[subCat] = el)}
                className="flex overflow-x-auto gap-4 no-scrollbar px-8 scroll-smooth"
              >
                {ensureArray(products)?.map((item: any, index: number) => (
                  <div
                    className={cn(
                      "min-w-[220px] max-w-[220px] bg-white rounded-lg",
                      className
                    )}
                    key={index}
                  >
                    <div className="rounded-lg overflow-hidden bg-gray-100 h-[200px] cursor-pointer border">
                      <img
                        alt={item?.product?.name ?? ""}
                        src={item?.product?.image ?? ""}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="p-2">
                      <div className="text-black font-semibold text-base">
                        Rs. {item?.product?.price ?? 0}
                      </div>
                      <p className="text-gray-500 font-medium line-clamp-2 cursor-pointer mt-1">
                        {item?.product?.name ?? ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => scrollRight(subCat)}
                className="absolute right-0 top-1/3 -translate-y-1/2 z-10 bg-white dark:bg-black p-2 rounded-full shadow-md"
              >
                <PiArrowRight size={20} />
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
