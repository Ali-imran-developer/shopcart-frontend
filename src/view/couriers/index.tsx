import { useState, useEffect } from "react";
import { Button, Loader } from "rizzui";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { useCouriers } from "@/hooks/courier-hook";
import { Card } from "./courier-grid";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/components/shared/page-header";
import { Link } from "react-router-dom";
import { PiPlusBold } from "react-icons/pi";
import toast from "react-hot-toast";

export const metadata = {
  ...metaObject("Couriers"),
};

const pageHeader = {
  title: "Couriers",
  breadcrumb: [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Couriers",
    },
  ],
};

const Couriers = () => {
  const { getCourier, getCourierKeys, defaultCouriers, isLoading } = useCouriers();
  const { courierData, courierCreds } = useAppSelector((state) => state.Courier);
  const [defaultCourier, setDefaultCourier] = useState<string | null>("");
  const [updateCouriers, setUpdateCouriers] = useState<any>();
  const [selectedCourierLabels, setSelectedCourierLabels] = useState<string[]>([]);

  useEffect(() => {
    getCourier();
    getCourierKeys();
  }, []);

  useEffect(() => {
    if (!courierData?.courier || !courierCreds?.creds) return;
    const matchedCourierIds = courierCreds.creds.map((cred: any) => cred.courier);
    const matchedCouriers = courierData.courier.filter((courier: any) =>
      matchedCourierIds.includes(courier._id)
    );
    setSelectedCourierLabels(matchedCouriers.map((courier: any) => courier.name));
    const defaultCred = courierCreds.creds.find((cred: any) => cred.isDefault);
    if (defaultCred) {
      const matchedDefaultCourier = matchedCouriers.find(
        (courier: any) => courier._id === defaultCred.courier
      );
      if (matchedDefaultCourier) {
        setDefaultCourier(matchedDefaultCourier._id);
      }
    }
  }, [courierData?.courier, courierCreds?.creds]);

  const handleDefaultCourierChange = async (selectedCourier: any) => {
    try {
      const selectedCredential = courierCreds?.creds?.find(
        (cred: any) => cred?.courier === selectedCourier?._id
      );
      if (!selectedCredential) {
        toast.error("No matching credential found for selected courier.");
        return;
      }
      await defaultCouriers(selectedCredential._id, { isDefault: true });
      setDefaultCourier(selectedCredential.courier);
    } catch (error) {
      console.log("Error setting default courier:", error);
    }
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link to="/create-courier-management" className="w-full @lg:w-auto">
            <Button as="span" className="@lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Create LoadSheet
            </Button>
          </Link>
        </div>
      </PageHeader>

      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader size="xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {ensureArray(courierData?.courier)?.map((item: any, index) => (
            <Card
              key={index}
              item={item}
              updateCouriers={updateCouriers}
              className="min-w-[200px] hover:-translate-y-0 hover:shadow-none"
              courier={courierData?.courier}
              courierCreds={courierCreds?.creds}
              isDefault={defaultCourier === item?._id}
              switchCourier={selectedCourierLabels?.includes(item.name)}
              onDefaultChange={handleDefaultCourierChange}
              updateCourier={undefined as any}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Couriers;