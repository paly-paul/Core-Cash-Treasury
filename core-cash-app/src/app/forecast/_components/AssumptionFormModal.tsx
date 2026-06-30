"use client";

import { useState, type FormEvent } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { FORECAST_ENTITIES, FORECAST_CATEGORIES } from "@/lib/mocks/forecastData";
import type { Assumption, ConfidenceLevel, Currency, NewAssumptionInput } from "@/types/cash";

const CURRENCIES: Currency[] = ["USD", "GBP", "EUR"];
const CONFIDENCE_LEVELS: ConfidenceLevel[] = ["high", "medium", "low"];

const inputClass =
  "w-full rounded-[5px] border border-border-1 bg-bg-surface px-2.5 py-1.5 text-[12.5px] text-text-1 outline-none focus:border-blue";
const labelClass = "mb-1 block text-[10px] font-bold uppercase tracking-wide text-text-muted";

/**
 * Add / edit dialog for manual forecast assumptions (the prototype's
 * `modal-assume` dialog). Pass `assumption` to pre-fill for editing;
 * omit it to create a new one.
 *
 * Usage:
 *   <AssumptionFormModal open={open} onClose={close} onSubmit={(input) => dispatch(addAssumption(input))} />
 */
interface AssumptionFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: NewAssumptionInput) => void;
  assumption?: Assumption;
}

export function AssumptionFormModal({ open, onClose, onSubmit, assumption }: AssumptionFormModalProps) {
  const [form, setForm] = useState<NewAssumptionInput>(
    assumption ?? {
      entity: FORECAST_ENTITIES[0],
      type: "outflow",
      amount: 0,
      currency: "USD",
      description: "",
      date: "",
      category: FORECAST_CATEGORIES[0],
      confidence: "medium",
    }
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(form);
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={assumption ? "Edit Assumption" : "Add Assumption"}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" form="assumption-form">
            {assumption ? "Save Changes" : "Add Assumption"}
          </Button>
        </>
      }
    >
      <form id="assumption-form" onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Entity</label>
          <select
            className={inputClass}
            value={form.entity}
            onChange={(e) => setForm({ ...form, entity: e.target.value })}
          >
            {FORECAST_ENTITIES.map((entity) => (
              <option key={entity}>{entity}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Direction</label>
          <select
            className={inputClass}
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as "inflow" | "outflow" })}
          >
            <option value="inflow">Inflow</option>
            <option value="outflow">Outflow</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Amount</label>
          <input
            type="number"
            min={0}
            step="1000"
            className={inputClass}
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Currency</label>
          <select
            className={inputClass}
            value={form.currency}
            onChange={(e) => setForm({ ...form, currency: e.target.value as Currency })}
          >
            {CURRENCIES.map((ccy) => (
              <option key={ccy}>{ccy}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Description</label>
          <input
            type="text"
            className={inputClass}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="e.g. Payroll — 4 Jul 2026"
            required
          />
        </div>
        <div>
          <label className={labelClass}>Date</label>
          <input
            type="date"
            className={inputClass}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <select
            className={inputClass}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {FORECAST_CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass}>Confidence</label>
          <select
            className={inputClass}
            value={form.confidence}
            onChange={(e) => setForm({ ...form, confidence: e.target.value as ConfidenceLevel })}
          >
            {CONFIDENCE_LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl[0].toUpperCase() + lvl.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </form>
    </Modal>
  );
}
