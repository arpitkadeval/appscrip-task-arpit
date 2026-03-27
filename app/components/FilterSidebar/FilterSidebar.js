"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./FilterSidebar.module.css";

const FILTER_GROUPS = [
  { label: "IDEAL FOR",     options: ["All", "Men", "Women", "Baby & Kids"] },
  { label: "OCCASION",      options: ["All"] },
  { label: "WORK",          options: ["All"] },
  { label: "FABRIC",        options: ["All"] },
  { label: "SEGMENT",       options: ["All"] },
  { label: "SUITABLE FOR",  options: ["All"] },
  { label: "RAW MATERIALS", options: ["All"] },
  { label: "PATTERN",       options: ["All"] },
];

export default function FilterSidebar({ onFilterChange }) {
  const [openGroups, setOpenGroups] = useState({ "IDEAL FOR": true });
  const [customizable, setCustomizable] = useState(false);
  const [selected, setSelected] = useState({});

  function toggleGroup(label) {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  }

  function toggleOption(groupLabel, option) {
    setSelected((prev) => {
      const curr = prev[groupLabel] || [];
      const next = curr.includes(option)
        ? curr.filter((o) => o !== option)
        : [...curr, option];
      const updated = { ...prev, [groupLabel]: next };
      onFilterChange?.(updated);
      return updated;
    });
  }

  return (
    <aside className={styles.sidebar} aria-label="Product filters">

      {/* --- Customizable toggle --------------------------- */}
      <label className={styles.customizableRow} htmlFor="filter-customizable">
        <span className={styles.checkWrap}>
          <input
            id="filter-customizable"
            type="checkbox"
            className={styles.hiddenCheck}
            checked={customizable}
            onChange={(e) => setCustomizable(e.target.checked)}
          />
          <span className={styles.checkBox} aria-hidden="true" />
        </span>
        <span className={styles.customizableLabel}>CUSTOMIZABLE</span>
      </label>

      {/* --- Filter groups --------------------------------- */}
      {FILTER_GROUPS.map((group) => {
        const isOpen = !!openGroups[group.label];
        return (
          <div key={group.label} className={styles.group}>
            <button
              className={styles.groupBtn}
              onClick={() => toggleGroup(group.label)}
              aria-expanded={isOpen}
              aria-controls={`filter-${group.label.replace(/\s/g, "-")}`}
            >
              <span className={styles.groupLabel}>{group.label}</span>
              <ChevronDown
                size={13}
                strokeWidth={2}
                aria-hidden="true"
                className={isOpen ? styles.chevronOpen : styles.chevronClosed}
              />
            </button>

            {isOpen && (
              <ul
                className={styles.optionList}
                id={`filter-${group.label.replace(/\s/g, "-")}`}
              >
                {group.options.map((option) => {
                  const checked = selected[group.label]?.includes(option) ?? false;
                  const id = `filter-${group.label}-${option}`.replace(/\s/g, "-");
                  return (
                    <li key={option}>
                      <label className={styles.optionLabel} htmlFor={id}>
                        <span className={styles.checkWrap}>
                          <input
                            id={id}
                            type="checkbox"
                            className={styles.hiddenCheck}
                            checked={checked}
                            onChange={() => toggleOption(group.label, option)}
                          />
                          <span className={styles.checkBox} aria-hidden="true" />
                        </span>
                        {option}
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </aside>
  );
}
