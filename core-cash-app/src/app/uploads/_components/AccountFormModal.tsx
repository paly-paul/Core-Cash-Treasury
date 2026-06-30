"use client";

import { useState, type FormEvent } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { UPLOAD_BANKS, UPLOAD_ENTITIES, UPLOAD_CURRENCIES } from "@/lib/mocks/uploadsData";
import type { NewAccountInput } from "@/types/cash";

const inputClass =
  "w-full rounded-[5px] border border-border-1 bg-bg-surface px-2.5 py-1.5 text-[12.5px] text-text-1 outline-none focus:border-blue";
const labelClass = "mb-1 block text-[10px] font-bold uppercase tracking-wide text-text-muted";

const EMPTY_FORM: NewAccountInput = {
  accountNumber: "",
  accountName: "",
  bank: UPLOAD_BANKS[0],
  entity: UPLOAD_ENTITIES[0],
  currency: UPLOAD_CURRENCIES[0],
  minThreshold: null,
  includeInCashPosition: true,
  restricted: false,
};

export function AccountFormModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: NewAccountInput) => void;
}) {
  const [form, setForm] = useState<NewAccountInput>(EMPTY_FORM);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(form);
    setForm(EMPTY_FORM);
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Account"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" form="account-form">
            Save Account
          </Button>
        </>
      }
    >
      <form id="account-form" onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Account Number *</label>
          <input
            type="text"
            className={`${inputClass} font-data`}
            placeholder="e.g. 12345678"
            value={form.accountNumber}
            onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Account Name *</label>
          <input
            type="text"
            className={inputClass}
            placeholder="Descriptive name"
            value={form.accountName}
            onChange={(e) => setForm({ ...form, accountName: e.target.value })}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Bank *</label>
          <select className={inputClass} value={form.bank} onChange={(e) => setForm({ ...form, bank: e.target.value })}>
            {UPLOAD_BANKS.map((bank) => (
              <option key={bank}>{bank}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Legal Entity *</label>
          <select className={inputClass} value={form.entity} onChange={(e) => setForm({ ...form, entity: e.target.value })}>
            {UPLOAD_ENTITIES.map((entity) => (
              <option key={entity}>{entity}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Currency *</label>
          <select
            className={inputClass}
            value={form.currency}
            onChange={(e) => setForm({ ...form, currency: e.target.value as NewAccountInput["currency"] })}
          >
            {UPLOAD_CURRENCIES.map((ccy) => (
              <option key={ccy}>{ccy}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Min Balance Threshold</label>
          <input
            type="number"
            min={0}
            className={`${inputClass} font-data`}
            placeholder="0.00 (optional)"
            value={form.minThreshold ?? ""}
            onChange={(e) => setForm({ ...form, minThreshold: e.target.value ? Number(e.target.value) : null })}
          />
        </div>
        <div>
          <label className={labelClass}>Include in Cash Position</label>
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              checked={form.includeInCashPosition}
              onChange={(e) => setForm({ ...form, includeInCashPosition: e.target.checked })}
            />
            <span className="text-[11px] text-text-2">{form.includeInCashPosition ? "Yes" : "No"}</span>
          </div>
        </div>
        <div>
          <label className={labelClass}>Restricted Account</label>
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              checked={form.restricted}
              onChange={(e) => setForm({ ...form, restricted: e.target.checked })}
            />
            <span className="text-[11px] text-text-2">{form.restricted ? "Yes" : "No"}</span>
          </div>
        </div>
      </form>
    </Modal>
  );
}
