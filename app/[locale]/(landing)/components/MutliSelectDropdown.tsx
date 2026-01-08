"use client";
import { useState, useRef, useEffect } from "react";

interface Option {
  label: string;
  value: string;
}

interface MultiSelectDropdownProps {
  placeholder?: string;
  options: Option[];
}

export default function MultiSelectDropdown({ placeholder, options }: MultiSelectDropdownProps) {
  const [selected, setSelected] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const addOption = (option: Option) => {
    setSelected([...selected, option]);
    setIsOpen(false);
  };

  const removeOption = (value: string) => {
    setSelected(selected.filter((opt) => opt.value !== value));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div
        className="flex flex-wrap items-center gap-2 border border-black/20 rounded-lg bg-primary/10 px-3 py-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        {selected.map((item) => (
          <span key={item.value} className="flex items-center bg-primary/20 px-2 py-1 rounded-lg text-sm">
            {item.label}
            <button
              onClick={(e) => { e.stopPropagation(); removeOption(item.value); }}
              className="ml-1 text-red-500 hover:text-red-700 cursor-pointer"
            >
              ×
            </button>
          </span>
        ))}

        {selected.length === 0 && (
          <span className="text-secondary/50">{placeholder}</span>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-20 bg-white shadow-xl mt-1 rounded-lg w-full max-h-52 overflow-y-auto">
          {options
            .filter((opt) => !selected.some((s) => s.value === opt.value))
            .map((opt) => (
              <div
                key={opt.value}
                onClick={() => addOption(opt)}
                className="px-3 py-2 text-sm hover:bg-primary/10 cursor-pointer"
              >
                {opt.label}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
