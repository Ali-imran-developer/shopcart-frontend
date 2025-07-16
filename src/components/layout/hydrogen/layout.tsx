import { Outlet } from "react-router-dom";
import Header from "./header";
import Sidebar from "./sidebar";
import { Suspense, useState } from "react";
import { Loading } from "@/components/shared/loader";

export default function HydrogenLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-grow">
      <Sidebar
        className="fixed hidden xl:block dark:bg-gray-50"
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex w-full flex-col xl:ms-[220px] xl:w-[calc(100%-220px)] 2xl:ms-60 2xl:w-full">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
