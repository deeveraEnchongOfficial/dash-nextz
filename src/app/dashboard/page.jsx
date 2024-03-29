import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata = {
  title:
    "Next.js E-commerce Dashboard | DashNextz - Next.js Dashboard",
  description: "This is Next.js Home for DashNextz Dashboard",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
