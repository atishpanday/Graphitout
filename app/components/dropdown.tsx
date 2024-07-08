import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";

interface DropDownProps {
    selected: string,
    setSelected: Dispatch<SetStateAction<string>>,
    items: string[],
}

export default function DropDown({ selected, setSelected, items }: DropDownProps) {
    return (
        <Menu as="div">
            <div>
                <MenuButton className="inline-flex min-w-32 mx-1 justify-center rounded-md bg-white px-3 py-2 text-gray-900 text-sm shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {selected === "" ? "Options" : selected}
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute z-10 my-2 mx-1 max-h-[240px] w-32 overflow-y-scroll rounded-md bg-white shadow-lg ring-1 ring-inset ring-gray-300 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">
                    {items.map((item, i) =>
                        <MenuItem key={i}>
                            <div
                                key={i}
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                onClick={() => setSelected(item)}
                            >
                                {item}
                            </div>
                        </MenuItem>
                    )}
                </div>
            </MenuItems>
        </Menu>
    )
}
