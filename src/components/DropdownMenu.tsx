import {
    MenuTrigger,
    Button,
    Popover,
    Menu,
    MenuItem,
} from 'react-aria-components'

type DropdownMenuProps = {
    label: string
    items: { id: string; href: string; label: string }[]
}

export function DropdownMenu({ label, items }: DropdownMenuProps) {
    return (
        <MenuTrigger>
            <Button className="min-w-37.5 cursor-pointer rounded-lg transition-colors outline-none hover:text-[#4765FF] focus-visible:ring-2 focus-visible:ring-[#4765FF] focus-visible:ring-offset-2">
                <span>{label}</span>
            </Button>

            <Popover
                placement="bottom end"
                className="mt-2 min-w-37.5 rounded-lg border border-gray-200 bg-white p-8 shadow-lg outline-none"
            >
                <Menu items={items} className="flex flex-col outline-none">
                    {(item) => (
                        <MenuItem
                            id={item.id}
                            href={item.href}
                            className="cursor-pointer rounded-md px-4 py-3.5 text-sm text-black transition-colors outline-none hover:bg-gray-100 hover:text-[#4765FF] focus-visible:bg-gray-100 focus-visible:text-[#4765FF]"
                        >
                            {item.label}
                        </MenuItem>
                    )}
                </Menu>
            </Popover>
        </MenuTrigger>
    )
}
