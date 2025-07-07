import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button, Loader } from "rizzui";
import { ensureArray } from "@/utils/helperFunctions/formater-helper";

export interface Order {
  _id: string;
  name: string;
  amount: number;
  createdAt?: string;
}

export interface OrderApiResponse {
  data: Order[];
  meta: {
    total: number;
    page: number;
    pages: number;
  };
}

const initialParams = {
  search: "",
  page: 1,
  limit: 5,
};

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [params, setParams] = useState<typeof initialParams>(initialParams);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const apiParams: Record<string, string | number> = {
        page: params.page,
        limit: params.limit,
      };
      if (params.search.trim()) apiParams.search = params.search;
      const res = await axios.get<OrderApiResponse>("http://localhost:5000/api/orders/get", { params: apiParams });
      setOrders(res?.data?.data);
      setTotalPages(res.data.meta.pages);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [params.page, params.limit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setParams({ ...params, page: 1 });
    fetchOrders();
  };

  const goToPage = (p: number) => {
    if (p >= 1 && p <= totalPages) {
      setParams({ ...params, page: p });
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <Input
          type="text"
          value={params.search}
          placeholder="Search"
          onChange={(e) => setParams({ ...params, search: e.target.value })}
          disabled={loading}
        />
        <Button type="submit" isLoading={loading} disabled={loading}>
          Search
        </Button>
      </form>

      <div className="mb-4">
        {loading ? (
          <p className="text-center my-4 flex justify-center">
            <Loader />
          </p>
        ) : ensureArray(orders).length === 0 ? (
          <p className="text-center font-semibold my-4">
            No matching result found
          </p>
        ) : (
          ensureArray(orders).map((order) => (
            <div
              key={order._id}
              className="mb-2 border-b pb-2 flex gap-12 items-center justify-center"
            >
              <div className="flex flex-col items-center">
                <span className="font-bold text-lg">Order Name</span>
                <span className="font-semibold text-base">{order.name}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-lg">Order Price</span>
                <span className="font-semibold text-base">
                  Rs. {order.amount}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pt-4 flex items-center w-full justify-between">
        <div>
          <label className="text-sm font-semibold">Limit per page:</label>
          <select
            value={params.limit}
            onChange={(e) =>
              setParams({ ...params, page: 1, limit: Number(e.target.value) })
            }
            disabled={loading}
            className="ml-2 px-2 py-1 w-16 border rounded-md border-gray-200"
          >
            {[5, 10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <Button
            size="sm"
            variant="outline"
            onClick={() => goToPage(params.page - 1)}
            disabled={params.page === 1 || loading}
          >
            Prev
          </Button>
          <span>
            Page {params.page} of {totalPages}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => goToPage(params.page + 1)}
            disabled={params.page === totalPages || loading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderList;