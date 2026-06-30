import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { mockUploadsData } from "@/lib/mocks/uploadsData";
import type { AccountMasterRow, NewAccountInput, UploadFileStatus, UploadZoneKind, UploadsData } from "@/types/cash";

export type UploadsTab = "files" | "mapping" | "accounts";

interface UploadsState {
  data: UploadsData;
  activeTab: UploadsTab;
}

const initialState: UploadsState = {
  data: mockUploadsData,
  activeTab: "files",
};

function makeAccountId() {
  return `acct-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

const uploadsSlice = createSlice({
  name: "uploads",
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<UploadsTab>) {
      state.activeTab = action.payload;
    },
    setZoneUploading(state, action: PayloadAction<{ kind: UploadZoneKind; fileName: string }>) {
      const zone = state.data.uploadZones.find((z) => z.kind === action.payload.kind);
      if (zone) {
        zone.fileName = action.payload.fileName;
        zone.statusNote = "Uploading…";
      }
    },
    completeZoneUpload(
      state,
      action: PayloadAction<{ kind: UploadZoneKind; status: UploadFileStatus; statusNote: string }>
    ) {
      const zone = state.data.uploadZones.find((z) => z.kind === action.payload.kind);
      if (zone) {
        zone.status = action.payload.status;
        zone.statusNote = action.payload.statusNote;
      }
    },
    toggleAccountActive(state, action: PayloadAction<string>) {
      const account = state.data.accounts.find((a) => a.id === action.payload);
      if (account) account.active = !account.active;
    },
    addAccount(state, action: PayloadAction<NewAccountInput>) {
      const row: AccountMasterRow = {
        id: makeAccountId(),
        accountNumber: action.payload.accountNumber,
        accountName: action.payload.accountName,
        bank: action.payload.bank,
        entity: action.payload.entity,
        currency: action.payload.currency,
        active: action.payload.includeInCashPosition,
        minThreshold: action.payload.minThreshold,
        frequency: "Daily",
        status: action.payload.restricted ? "restricted" : "active",
        restricted: action.payload.restricted,
        includeInCashPosition: action.payload.includeInCashPosition,
      };
      state.data.accounts.push(row);
    },
  },
});

export const { setActiveTab, setZoneUploading, completeZoneUpload, toggleAccountActive, addAccount } =
  uploadsSlice.actions;
export default uploadsSlice.reducer;
