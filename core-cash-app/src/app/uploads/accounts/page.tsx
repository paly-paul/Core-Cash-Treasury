"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { setActiveTab } from "@/store/uploadsSlice";
import { UploadsPageContent } from "../_components/UploadsPageContent";

// Sidebar's "Account Master" nav item links directly here — same Uploads
// page/store, just pre-selecting the accounts tab on entry.
export default function AccountMasterPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setActiveTab("accounts"));
  }, [dispatch]);

  return <UploadsPageContent />;
}
