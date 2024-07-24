import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

interface DropDownProps {
    label: string,
    selected: string,
    setSelected: (selected: string) => void,
    items: string[],
}

export default function DropDown({ label, selected, setSelected, items }: DropDownProps) {
    return (
        <div className="flex items-center">
            <p className="font-bold text-sm text-gray-900">
                {`${label}: `}
            </p>
            <Menu as="div">
                <div>
                    <MenuButton className="min-w-32 mx-1 flex justify-between items-center rounded-sm bg-white px-4 py-2 text-gray-900 text-sm ring-1 ring-gray-300 hover:bg-gray-50">
                        {selected === "" ? "Options" : selected}
                        <IoMdArrowDropdown />
                    </MenuButton>
                </div>

                <MenuItems
                    transition
                    className="absolute z-10 my-2 mx-1 max-h-[240px] min-w-32 overflow-y-scroll rounded-sm bg-white shadow-lg ring-1 ring-gray-300 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                    <div className="py-1">
                        {items.map((item, i) =>
                            <MenuItem key={i}>
                                <div
                                    key={i}
                                    className="px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                    onClick={() => setSelected(item)}
                                >
                                    {item}
                                </div>
                            </MenuItem>
                        )}
                    </div>
                </MenuItems>
            </Menu>
        </div>
    )
}
