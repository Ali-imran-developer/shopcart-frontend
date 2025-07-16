import InputNumber from "@/components/ui/input-number";
import cn from "@/utils/helperFunctions/class-names";
import {
  ensureArray,
  formatPrice,
} from "@/utils/helperFunctions/formater-helper";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { PiTrash } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Radio, Select, Title } from "rizzui";
import toast from "react-hot-toast";
import { useCategories } from "@/hooks/categories";
import { useAppSelector } from "@/hooks/store-hook";
import ResaleController from "@/controllers/resaleController";

const CreateListing = () => {
  const navigate = useNavigate();  
  const location = useLocation();
  const listingData = location.state?.listingProduct;
  const [listing, setListing] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [subCategoryOptions, setSubCategoryOptions] = useState<any>(null);
  const { getPublicCategories } = useCategories();
  const { publicData } = useAppSelector((state) => state.Categories);

  const clearItemFromCart = (itemToRemove: any) => {
    setListing((prevListing: any[]) => prevListing?.filter((item) => item?._id !== itemToRemove?._id));
  };

  useEffect(() => {
    getPublicCategories()

  }, [])

  useEffect(() => {
    if (listingData) {
      setListing(listingData);
    }
  }, [listingData]);

  const initialValues = {
    category: listingData?.listForResale?.category || "",
    subCategory: listingData?.listForResale?.subCategory || "",
    myResellers: listingData?.isList ?? false,
    discount: listingData?.listForResale?.discount ?? null,
    inventory: listingData?.listForResale?.inventory ?? 100,
    shipping: "",
  };

  const CategoriesOptions = ensureArray(publicData?.categories)?.map((product) => ({
    value: product,
    label: product?.name,
  }));

  const rawSubCategories = ensureArray(subCategoryOptions?.subCategory);
  const SubCategoriesOptions = ensureArray(rawSubCategories)?.map(
    (product: any) => ({
      value: product?.name,
      label: product?.name,
    })
  );

  const handleDiscountChange = (e: any, formik: any) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      const numericValue = Number(value);
      if (value === "") {
        formik.setFieldValue("discount", null);
      } else if (numericValue >= 0 && numericValue <= 99) {
        formik.setFieldValue("discount", numericValue);
      } else if (numericValue > 99) {
        formik.setFieldValue("discount", 99);
      }
    }
  };

  const handleInventoryChange = (e: any, formik: any) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      const numericValue = Number(value);
      if (value === "") {
        formik.setFieldValue("inventory", null);
      } else if (numericValue >= 0 && numericValue <= 100) {
        formik.setFieldValue("inventory", numericValue);
      } else if (numericValue > 100) {
        formik.setFieldValue("inventory", 100);
      }
    }
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      setIsLoading(true);
      const uniqueIds = [...new Set(ensureArray(listing)?.map((item: any) => item?._id)),];
      const payloads = ensureArray(uniqueIds)?.map((productId) => ({
        productId,
        resale: {
          discount: values.discount,
          inventory: values.inventory,
          shipping: values.shipping,
          category: values.category,
          subCategory: values.subCategory,
          myResellers: values.myResellers,
        },
      }));
      await Promise.all(ensureArray(payloads)?.map((payload) => ResaleController.createResaleProduct(payload)));
      toast.success("Products listed successfully!");
      resetForm();
      navigate("/list-products");
    } catch (error) {
      console.error("Error listing products:", error);
      toast.error("Failed to list products!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full grid grid-cols-2">
        <div>
          <Title as="h4" className="pb-4">
            Listing Product:
          </Title>
          <div className="px-2 space-y-2 max-h-[calc(100vh-150px)] overflow-y-auto">
            {ensureArray(listing)?.map((item: any) => {
              return (
                <>
                  <div className="w-full flex items-center justify-between pe-4">
                    <div className="flex items-center gap-2">
                      <Avatar
                        size="lg"
                        src={item?.image}
                        name={item?.name}
                        className="border rounded-full"
                      />
                      <div className="text-gray-500">
                        <Title
                          as="h3"
                          className="text-sm font-medium text-gray-700"
                        >
                          {item?.name}
                        </Title>
                        Rs. {formatPrice(item?.price)}
                      </div>
                    </div>
                    <div className="">
                      <button
                        type="button"
                        disabled={listing?.length === 1}
                        onClick={() => clearItemFromCart(item)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <PiTrash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2 px-12 border-l-2 border-gray-300">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            // validationSchema={validationSchema}
            enableReinitialize={true}
          >
            {(formik) => {
              return (
                <form
                  onSubmit={formik.handleSubmit}
                  className={cn(
                    "w-full space-y-3 !h-full pt-3 pb-6 px-3 flex flex-col justify-between"
                  )}
                >
                  <div className="flex flex-col space-y-4 mb-12">
                    <div className="flex gap-12 items-center border border-gray-200 p-2 rounded-lg">
                      <Radio
                        label="My Resellers Only"
                        name="myResellers"
                        size="sm"
                        value={formik?.values?.myResellers}
                        checked={formik.values.myResellers === true}
                        onChange={() =>
                          formik.setFieldValue("myResellers", true)
                        }
                      />
                      <Radio
                        label="Global MarketPlace"
                        name="myResellers"
                        size="sm"
                        value={formik?.values?.myResellers}
                        checked={formik.values.myResellers === false}
                        onChange={() =>
                          formik.setFieldValue("myResellers", false)
                        }
                      />
                    </div>

                    <InputNumber
                      name="discount"
                      placeholder="0"
                      label="Discount"
                      value={formik?.values?.discount as any}
                      setFieldValue={formik.setFieldValue}
                      onChange={(e: any) => handleDiscountChange(e, formik)}
                      suffix="%"
                      className="w-full p-0 m-0"
                    />

                    <InputNumber
                      name="inventory"
                      type="number"
                      label="Inventory (Percentage of total available inventory)"
                      placeholder="0"
                      value={formik?.values?.inventory as any}
                      onChange={(e: any) => handleInventoryChange(e, formik)}
                      setFieldValue={formik.setFieldValue}
                      suffix="%"
                      className="w-full p-0"
                    />

                    <Select
                      options={CategoriesOptions}
                      value={formik?.values?.category}
                      name="category"
                      label="Categories"
                      placeholder="Select Category"
                      onChange={(selected: any) => {
                        formik?.setFieldValue("category", selected?.name);
                        setSubCategoryOptions(selected);
                      }}
                      getOptionValue={(option) => option?.value}
                      dropdownClassName="h-auto"
                      error={
                        formik?.touched?.category &&
                        typeof formik?.errors?.category === "string"
                          ? formik.errors.category
                          : undefined
                      }
                    />

                    <Select
                      label="Sub Category"
                      options={SubCategoriesOptions}
                      value={formik?.values?.subCategory}
                      placeholder="Select SubCategory"
                      getOptionValue={(option) => option?.value}
                      onChange={(value) => {
                        formik.setFieldValue("subCategory", value);
                      }}
                      dropdownClassName="h-auto"
                      error={
                        formik?.touched?.subCategory &&
                        typeof formik?.errors?.subCategory === "string"
                          ? formik.errors.subCategory
                          : undefined
                      }
                    />

                    <InputNumber
                      label="Shipping"
                      placeholder="0"
                      name={"shipping"}
                      value={formik?.values?.shipping}
                      setFieldValue={formik.setFieldValue}
                      className="w-full p-0"
                    />
                  </div>

                  <div className="flex space-x-6">
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="text-white bg-black flex-1"
                      size="lg"
                      type="submit"
                      isLoading={isLoading}
                    >
                      Save
                    </Button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default CreateListing;
