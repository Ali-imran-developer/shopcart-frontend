import { Avatar, Text } from "rizzui";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import DeletePopover from "@/components/shared/components/table/delete-popover";

const CustomExpandedComponent = ({ row, handleDeleteSubCategory }: any) => {
  const selectedRow = row?.original;
  const selectedSubCategories = ensureArray(selectedRow?.subCategory);

  return (
    <div className="py-4 ps-[180px]">
      {selectedSubCategories && selectedSubCategories.length > 0 ? (
        ensureArray(selectedSubCategories)?.map((sub: any, index: number) => (
          <div
            key={index}
            className={`my-1 flex items-center justify-between ${
              index !== selectedSubCategories?.length - 1
                ? "border-b border-gray-300"
                : ""
            }`}
          >
            <div className="text-gray-800 py-2 font-medium flex gap-4 items-center">
              <Avatar name={sub.name ?? ""} src="" />
              <Text className="font-semibold">{sub.name ?? ""}</Text>
            </div>
            <DeletePopover
              description="Are u really want to delete this subCategory!"
              onDelete={() => handleDeleteSubCategory(selectedRow?._id, sub?._id,)}
            />
          </div>
        ))
      ) : (
        <div className="text-gray-500 font-semibold ms-[150px]">
          No Subcategories Available
        </div>
      )}
    </div>
  );
};

export default CustomExpandedComponent;