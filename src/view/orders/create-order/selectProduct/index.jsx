import { Button, Input } from "rizzui";
import { NavLink } from "react-router-dom";
import SelectedItems from "./selectedItems";
import { useModal } from "@/components/shared/modal-views/use-modal";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/store-hook";
import { ProductsModal } from "./producstModal";
import { useProduct } from "@/hooks/product-hook";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";

export const SelectProduct = ({ formik, products, setProducts }) => {
  const { onOpen, onClose, show } = useModal();
  const { data } = useAppSelector((state) => state?.Products);
  const [search, setSearch] = useState("");
  const [modalSearch, setModalSearch] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const { handleGetProducts, isLoading } = useProduct();

  useEffect(() => {
    handleGetProducts();
  }, []);

  useEffect(() => {
    if (data?.products && data?.products.length > 0) {
      setProducts(data?.products);
      setOriginalData(data?.products);
    }
  }, [data?.products]);

  useEffect(() => {
    if (!formik.values.products) {
      formik.setFieldValue("products", []);
    }
  }, []);

  const handleAddSelectedItems = () => {
    const selectedProducts = ensureArray(products)?.filter(
      (item) => item?.checked
    );
    const formikProductsValue = ensureArray(selectedProducts)?.map(
      (product) => ({
        productId: product?._id,
        productQty: product?.quantity || 1,
      })
    );
    formik?.setFieldValue("products", formikProductsValue);
    setSearch("");
    onClose();
  };

  const addItemToCart = (product) => {
    const updatedProducts = ensureArray(products)?.map((item) => {
      if (item?._id === product?._id) {
        const newQuantity = (item?.quantity || 0) + 1;
        return {
          ...item,
          quantity: newQuantity,
          checked: true,
        };
      }
      return item;
    });
    setProducts(updatedProducts);
    updateFormikProductValues(updatedProducts);
  };

  const removeItemFromCart = (product) => {
    const updatedProducts = ensureArray(products)?.map((item) => {
      if (item?._id === product?._id) {
        const newQuantity = (item?.quantity || 0) - 1;
        return {
          ...item,
          quantity: newQuantity > 0 ? newQuantity : 0,
          checked: newQuantity > 0 ? true : false,
        };
      }
      return item;
    });
    setProducts(updatedProducts);
    updateFormikProductValues(updatedProducts);
  };

  const clearItemFromCart = (product) => {
    const updatedProducts = ensureArray(products)?.map((item) => {
      if (item?._id === product?._id) {
        return {
          ...item,
          quantity: 0,
          checked: false,
        };
      }
      return item;
    });
    setProducts(updatedProducts);
    updateFormikProductValues(updatedProducts);
  };

  const updateFormikProductValues = (updatedProducts) => {
    const selectedProducts = ensureArray(updatedProducts)?.filter(
      (item) => item?.checked && item?.quantity > 0
    );
    const formikProductsValue = ensureArray(selectedProducts)?.map(
      (product) => ({
        productId: product?._id,
        productQty: product?.quantity || 1,
      })
    );
    formik?.setFieldValue("products", formikProductsValue);
  };

  const getTotalCheckedCount = (products) => {
    let totalChecked = 0;
    ensureArray(products)?.forEach((item) => {
      if (item?.checked) {
        totalChecked += 1;
      }
      // item.variants?.forEach((variant) => {
      //   if (variant?.checked) {
      //     totalChecked += 1;
      //   }
      // });
    });
    return totalChecked;
  };

  const productSearchHandle = (e) => {
    const { value } = e.target;
    setSearch(value);
    setModalSearch(value);
    onOpen();
  };

  const handleCheck = (e, val) => {
    const { checked } = e.target;
    const updatedProducts = ensureArray(products)?.map((item) => {
      if (item?._id === val?._id) {
        return {
          ...item,
          checked,
          quantity: checked ? item?.quantity || 1 : 0,
        };
      }
      return item;
    });
    setProducts(updatedProducts);
    const updatedOriginalData = ensureArray(originalData)?.map((item) => {
      if (item?._id === val?._id) {
        return {
          ...item,
          checked,
          quantity: checked ? item?.quantity || 1 : 0,
        };
      }
      return item;
    });
    setOriginalData(updatedOriginalData);
    updateFormikProductValues(updatedProducts);
  };

  const productModalSearchHandle = (e) => {
    const { value } = e.target;
    setModalSearch(value);
    const filteredProducts = ensureArray(originalData)?.filter(
      (item) =>
        item?.title?.toLowerCase()?.includes(value?.toLowerCase()) ||
        item?.name?.toLowerCase()?.includes(value?.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  return (
    <div>
      <div className="flex items-center space-x-2">
        <Input
          className="w-[60%]"
          placeholder="Select Product"
          name="search"
          value={search}
          onChange={productSearchHandle}
        />
        <Button className="self-end" onClick={() => onOpen()}>
          Browse
        </Button>
        <NavLink
          to={"/create-products"}
          className=" cursor-pointer text-[#3872fa] underline"
          target="_blank"
        >
          Add Custom Product
        </NavLink>
      </div>

      <SelectedItems
        products={products}
        showControls
        className="gap-0"
        itemClassName="p-4 pb-5 md:px-6"
        addItemToCart={addItemToCart}
        removeItemFromCart={removeItemFromCart}
        clearItemFromCart={clearItemFromCart}
      />

      <ProductsModal
        formik={formik}
        products={data?.products}
        onClose={onClose}
        handleCheck={handleCheck}
        show={show}
        handleAddSelectedItems={handleAddSelectedItems}
        checkedItemsCount={getTotalCheckedCount(products)}
        search={setSearch}
        modalSearch={modalSearch}
        productModalSearchHandle={productModalSearchHandle}
        isLoading={isLoading}
      />
    </div>
  );
};
