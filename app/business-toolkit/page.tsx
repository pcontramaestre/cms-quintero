import type { Metadata } from "next"
import BusinessToolkitClientPage from "@/app/business-toolkit/BusinessToolkitClientPage"

export const metadata: Metadata = {
  title: "Business Toolkit | Quintero and Associates",
  description: "Essential tools for entrepreneurs and taxpayers that facilitate tax and business planning.",
}

export default function BusinessToolkitPage() {
  return <BusinessToolkitClientPage />
}
