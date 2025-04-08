import React, { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

interface DropDownProps {
    label: string;
    selected: string;
    setSelected: (selected: string) => void;
    items: string[];
}

export default function DropDown({
    label,
    selected,
    setSelected,
    items,
}: DropDownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex flex-col items-center">
            <p className="font-bold text-sm text-gray-900">{label}</p>
            <div className="relative" ref={dropdownRef}>
                <button
                    type="button"
                    className="min-w-32 mx-1 flex justify-between items-center rounded-sm bg-white px-4 py-2 text-gray-900 text-sm ring-1 ring-gray-300 hover:bg-gray-50"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selected === "" ? "Options" : selected}
                    <IoMdArrowDropdown />
                </button>

                {isOpen && (
                    <div className="absolute z-10 my-2 mx-1 max-h-[240px] min-w-32 overflow-y-scroll rounded-sm bg-white shadow-lg ring-1 ring-gray-300">
                        <div className="py-1">
                            {items.map((item, i) => (
                                <div
                                    key={i}
                                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                                    onClick={() => {
                                        setSelected(item);
                                        setIsOpen(false);
                                    }}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
