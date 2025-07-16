import TrashIcon from "@/components/shared/components/icons/trash";
import SearchDropdown from "@/components/shared/components/search-filter";
import { routes } from "@/config/routes";
import ResaleProductController from "@/controllers/resaleProductController";
import { useCategories } from "@/hooks/categories";
import { useAppSelector } from "@/hooks/store-hook";
import cn from "@/utils/helperFunctions/class-names";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import {
  ValidationSchema,
  validationSchema,
} from "@/validators/listProduct-schema";
import { Field, FieldArray, Formik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import React from "react";
import { PiMinusBold, PiPlusBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { ActionIcon, Button, Drawer, Input, Select, Text, Title } from "rizzui";
import InputNumber from "@/components/ui/input-number";

export default function ResellersDrawer({
  isDrawerOpen,
  closeDrawer,
  row,
  table,
  allRows,
  handleGetProducts,
}: {
  isDrawerOpen: any;
  row?: any;
  table?: any;
  allRows?: any;
  closeDrawer: () => void;
  handleGetProducts: (val: number) => void;
}) {
  const [aboveShippingCharge, setAboveShippingCharge] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useAppSelector((state) => state.Categories);
  const [publicCategories, setPublicCategories] = useState([]);
  const { handleGetPublicCategories } = useCategories();
  const [subCategoryOptions, setSubCategoryOptions] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetPublicCategories().then((e) => setPublicCategories(e));
  }, []);

  console.log(row);

  const initialValues: ValidationSchema = {
    category: row?.listForResale?.category || "",
    subCategory: row?.listForResale?.subCategory || "",
    isList: row?.isList ?? true,
    discount: row?.listForResale?.discount ?? null,
    inventory: row?.listForResale?.inventory ?? null,
    threshold: row?.threshold ?? 0,
    shippingCharges:
      row?.listForResale?.shippingCharges?.length > 0
        ? row.listForResale.shippingCharges
        : [{ fromPrice: 1, toPrice: 0, totalPrice: 0 }],
  };

  useEffect(() => {
    if (publicCategories.length > 0 && row?.listForResale?.category) {
      const matchingCategory = publicCategories?.find(
        (cat: {name: string}) => cat?.name === row?.listForResale?.category
      );
      if (matchingCategory) {
        setSubCategoryOptions(matchingCategory);
      }
    }
  }, [publicCategories, row]);

  const CategoriesOptions = ensureArray(publicCategories)?.map((product) => ({
    value: product,
    label: product?.name,
  }));

  const SubCategoriesOptions = ensureArray(
    subCategoryOptions?.subCategory
  )?.map((product) => ({
    value: product,
    label: product,
  }));

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      setIsLoading(true);
      const validCharges = values.shippingCharges.filter(
        (item: any) =>
          item.toPrice !== "" &&
          item.totalPrice !== "" &&
          item.toPrice != null &&
          item.totalPrice != null
      );
      const lastToPrice = Number(validCharges[0].toPrice || 0);
      validCharges.push({
        fromPrice: lastToPrice + 1,
        toPrice: 10000000000,
        totalPrice: Number(aboveShippingCharge || 0),
      });
      values.shippingCharges = validCharges;
      // console.log("@finalValues", values);
      const idList = allRows?.length > 0 ? allRows : [row?._id];
      console.log(idList);
      const allApiCalls = ensureArray(idList).map((productId: string) => {
        console.log("API calling for:", values, productId);
        return ResaleProductController.getResaleProducts(values, productId);
      });
      resetForm();
      const responses = await Promise.all(allApiCalls);
      console.log("responses", responses);
      toast.success("Product listed successfully!");
      handleGetProducts(1);
      closeDrawer();
      table.resetRowSelection();
      // navigate("/reselling-product");
    } catch (error) {
      console.error("Error listing products:", error);
      toast.error("Failed to list products!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="@container ">
      <Drawer
        size="sm"
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        containerClassName="!overflow-y-auto"
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          {(formik) => {
            const handleDiscountChange = (
              e: React.ChangeEvent<HTMLInputElement>
            ) => {
              const value = e.target.value;

              if (/^\d*\.?\d*$/.test(value)) {
                const numericValue = Number(value);
                // console.log("@numericValue", numericValue);

                if (value === "") {
                  formik.setFieldValue("discount", null);
                } else if (numericValue >= 0 && numericValue <= 99) {
                  formik.setFieldValue("discount", numericValue);
                } else if (numericValue > 99) {
                  formik.setFieldValue("discount", 99);
                }
              }
            };

            const handleInventoryChange = (e: any) => {
              let value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                const numericValue = Number(value);
                if (value === "") {
                  formik.setFieldValue("inventory", null);
                } else if (numericValue >= 0 && numericValue <= 100) {
                  formik.setFieldValue("inventory", numericValue);
                } else if (numericValue > 99) {
                  formik.setFieldValue("inventory", 100);
                }
              }
            };

            return (
              <form
                onSubmit={formik.handleSubmit}
                className={cn(
                  "space-y-3 !h-full pt-3 pb-6 px-3 flex flex-col justify-between"
                )}
              >
                {/* {console.log("@Inventory is required", formik.values) as any} */}

                <div className="flex flex-col space-y-3">
                  <Title as="h3" className="">
                    List Products:
                  </Title>
                  <Input
                    label="Discount"
                    type="number"
                    placeholder="0"
                    name="discount"
                    value={formik?.values?.discount as any}
                    onChange={handleDiscountChange}
                    suffix="%"
                    error={
                      formik?.touched?.discount &&
                      typeof formik?.errors?.discount === "string"
                        ? formik.errors.discount
                        : undefined
                    }
                    className="flex-grow"
                    onKeyDown={(e) => {
                      if (["e", ".", "E", "+", "-"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    onPaste={(e) => {
                      // console.log("onPaste", e);
                      const pasteData = e?.clipboardData?.getData("text");
                      if (
                        ["e", ".", "E", "+", "-"].some((char) =>
                          pasteData.includes(char)
                        )
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onFocus={(e: any) => {
                      // console.log("onFocus", e);
                      const pasteData = e?.clipboardData?.getData("text");
                      if (
                        ["e", ".", "E", "+", "-"].some((char) =>
                          pasteData?.includes(char)
                        )
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />
                  <Input
                    label="Inventory"
                    type="number"
                    placeholder="0"
                    name="inventory"
                    value={formik?.values?.inventory as any}
                    onChange={handleInventoryChange}
                    suffix="%"
                    error={
                      formik?.touched?.inventory &&
                      typeof formik?.errors?.inventory === "string"
                        ? formik.errors.inventory
                        : undefined
                    }
                    className="flex-grow"
                    onKeyDown={(e) => {
                      if (["e", ".", "E", "+", "-"]?.includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    onPaste={(e) => {
                      const pasteData = e?.clipboardData?.getData("text");
                      if (
                        ["e", ".", "E", "+", "-"]?.some((char) =>
                          pasteData?.includes(char)
                        )
                      ) {
                        e.preventDefault();
                      }
                    }}
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

                  <SearchDropdown
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

                  <Text className="font-semibold py-2 text-black text-lg">
                    Shipping Charges
                  </Text>

                  <div className="flex items-center gap-4 text-sm text-gray-500 font-medium pe-2">
                    <span>From Price</span>
                    <span>To Price</span>
                    <span className="ms-[70px]">Shipping Price</span>
                  </div>

                  <FieldArray name="shippingCharges">
                    {(arrayHelpers) => (
                      <div className="max-h-[110px] overflow-y-auto pr-2 space-y-2">
                        {formik.values.shippingCharges.map(
                          (_: any, index: any) => (
                            <div
                              key={index}
                              className="flex items-center gap-4 relative"
                            >
                              <InputNumber
                                name={`shippingCharges.${index}.fromPrice`}
                                disabled
                                readOnly
                                value={
                                  index === 0
                                    ? 1
                                    : Number(
                                        formik.values.shippingCharges[index - 1]
                                          ?.toPrice || 0
                                      ) + 1
                                }
                                setFieldValue={formik.setFieldValue}
                                className="w-[70px] p-0"
                              />
                              <InputNumber
                                name={`shippingCharges.${index}.toPrice`}
                                value={
                                  formik.values.shippingCharges[index].toPrice
                                }
                                setFieldValue={formik.setFieldValue}
                                className="w-[100px] p-0"
                              />
                              <div className="flex items-center gap-2">
                                <PiMinusBold className="h-4 w-4 text-gray-500" />
                                <InputNumber
                                  name={`shippingCharges.${index}.totalPrice`}
                                  value={
                                    formik.values.shippingCharges[index]
                                      .totalPrice
                                  }
                                  setFieldValue={formik.setFieldValue}
                                  className="w-[80px] p-0"
                                />
                                {index > 0 && (
                                  <ActionIcon
                                    as="span"
                                    size="sm"
                                    variant="text"
                                  >
                                    <TrashIcon
                                      className="h-5 w-5 hover:cursor-pointer text-red-600"
                                      onClick={() => arrayHelpers.remove(index)}
                                    />
                                  </ActionIcon>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </FieldArray>

                  <div className="flex items-center justify-between mx-2">
                    <Text className="font-semibold text-base">
                      Above{" "}
                      {formik.values.shippingCharges[
                        formik.values.shippingCharges.length - 1
                      ]?.toPrice + 1 || 0}
                    </Text>
                    <div className="flex items-center gap-4">
                      <PiMinusBold className="h-4 w-4 text-gray-500" />
                      <InputNumber
                        name=""
                        value={aboveShippingCharge as any}
                        onChange={(e) =>
                          setAboveShippingCharge(Number(e.target.value) as any)
                        }
                        className="w-[80px] p-0"
                      />
                      <FieldArray name="shippingCharges">
                        {(arrayHelpers) => (
                          <ActionIcon
                            as="span"
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const lastToPrice =
                                Number(
                                  formik.values.shippingCharges[
                                    formik.values.shippingCharges.length - 1
                                  ]?.toPrice
                                ) || 0;
                              arrayHelpers.push({
                                fromPrice: lastToPrice + 1,
                                toPrice: "",
                                totalPrice: "",
                              });
                            }}
                          >
                            <PiPlusBold className="h-4 w-4 hover:cursor-pointer" />
                          </ActionIcon>
                        )}
                      </FieldArray>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-6">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    type="button"
                    onClick={closeDrawer}
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
                {/* </div> */}
              </form>
            );
          }}
        </Formik>
      </Drawer>
    </div>
  );
}
