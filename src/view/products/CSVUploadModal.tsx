import UploadIcon from "@/components/shared/components/shape/upload";
import AuthController from "@/controllers/authController";
import { useProduct } from "@/hooks/product-hook";
import axios from "axios";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { Button, Loader, Modal, Text } from "rizzui";
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const CSVUploadModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const queryParams = {
    page: 1,
    limit: 10,
    status: "active",
  };
  const { token } = AuthController.get();
  const { handleGetProducts } = useProduct(queryParams);
  const [jsonData, setJsonData] = useState<any[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isUploadAllowed, setIsUploadAllowed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCSV = (event: any) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name); // Store file name
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text) return;
      try {
        const result = csvToJson(text);
        setJsonData(result.data);
        setErrors(result.errors);
        setIsUploadAllowed(result.errors.length === 0);
      } catch (error) {
        console.error("Error parsing CSV:", error);
        setErrors(["Invalid CSV format"]);
        setIsUploadAllowed(false);
      }
    };
    reader.readAsText(file);
  };

  function parseCsvRow(row: string): string[] {
    const result = [];
    let current = "";
    let inQuotes = false;
    let inBraces = false;

    for (let i = 0; i < row.length; i++) {
      const char = row[i];

      if (char === '"') {
        inQuotes = !inQuotes;
        continue;
      }

      if (char === "{") {
        inBraces = true;
      }

      if (char === "}") {
        inBraces = false;
      }

      if (char === "," && !inQuotes && !inBraces) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }

    result.push(current.trim()); // push the last value
    return result;
  }

  const csvToJson = (csv: string) => {
    const rows = csv.split("\n").map((row) => parseCsvRow(row));
    const headers = rows[0].map((header) => header.trim());
    const data: any[] = [];
    const errors: string[] = [];
    for (let i = 1; i < rows.length; i++) {
      const values = rows[i];
      if (values.length !== headers.length) continue;
      const obj = {
        name: values[headers.indexOf("name")]?.trim(),
        description: values[headers.indexOf("description")]?.trim(),
        price: Number(values[headers.indexOf("price")]),
        stock: Number(values[headers.indexOf("stock")]),
        category: values[headers.indexOf("category")]?.trim(),
        subCategory: values[headers.indexOf("subCategory")]?.trim(),
        status: values[headers.indexOf("status")]?.trim() || "active",
        available: Number(values[headers.indexOf("available")]) || 0,
        image: values[headers.indexOf("image")]?.trim() || "",
      };
      if (!obj.name) errors.push(`Row ${i + 1}: Missing name`);
      if (!obj.price || isNaN(obj.price))
        errors.push(`Row ${i + 1}: Invalid price`);
      if (!obj.stock || isNaN(obj.stock))
        errors.push(`Row ${i + 1}: Invalid stock`);
      data.push(obj);
    }
    return { data, errors };
  };

  const handleUploadConfirm = async () => {
    if (jsonData.length === 0 || !fileInputRef.current?.files?.[0]) {
      toast.error("No CSV file selected.");
      return;
    }
    setLoading(true);
    try {
      const data = new FormData();
      data.append("csvFile", fileInputRef.current.files[0]);
      const response = await axios.post(
        `${BASE_URL}/api/products/upload-csv`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        onClose();
        await handleGetProducts();
      } else {
        throw new Error(response?.data?.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed. Check logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="container mx-auto p-6  ">
        <h2 className="text-lg font-bold mb-2">Upload CSV</h2>
        <div className="relative lg:h-40 flex cursor-pointer justify-center items-center gap-4 rounded-md border-[1.8px] px-6 py-5 transition-all duration-300">
          <input
            type="file"
            ref={fileInputRef}
            accept=".csv"
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            onChange={handleCSV}
          />
          {fileName ? (
            <Text className="text-base font-medium">{fileName}</Text>
          ) : (
            <>
              <UploadIcon className="h-20 w-20" />
              <Text className="text-base font-medium">Drop or select CSV</Text>
            </>
          )}
        </div>

        {errors.length > 0 && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <h4 className="font-semibold">Errors Found:</h4>
            <ul className="list-disc pl-5">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-6 flex items-end gap-4">
          {/* {jsonData?.length > 0 && ( */}
          <Button
            onClick={onClose}
            variant="outline"
            className="ml-auto px-4 py-2 rounded-md"
          >
            Cancel
          </Button>

          <Button
            onClick={handleUploadConfirm}
            disabled={!isUploadAllowed || loading}
            className="px-4 py-2 rounded-md w-32"
            isLoading={loading}
          >
            Upload CSV
          </Button>
          {/* // )} */}
        </div>
      </div>
    </Modal>
  );
};

export default CSVUploadModal;
