"use client";

import Link from "next/link";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { usePathname } from "next/navigation";

const bookingOptions = [
  { name: "Birthday Parties", href: "/birthday" },
  { name: "Engagements", href: "/other" },
  { name: "Housewarming", href: "/house_warming" },
  { name: "Puja Events", href: "/puja" },
  { name: "Baby Showers", href: "/other" },
  { name: "Naming Ceremony", href: "/other" },
];

const navigation = [
  { name: "Home", href: "/" },
  { name: "Past-events", href: "/past_events" },
  { name: "Feedback", href: "/feedback" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();

  const NavigationMenu = ({ isMobile = false, closeMenu }: { isMobile?: boolean; closeMenu: () => void }) => (
    <>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={closeMenu}
          className={classNames(
            pathname === item.href
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-800 hover:text-white",
            isMobile ? "block" : "",
            "rounded-md px-3 py-2 text-lg font-medium"
          )}
        >
          {item.name}
        </Link>
      ))}

      <Menu as="div" className="relative inline-block text-left">
        {({ open }) => (
          <>
            <MenuButton
              className="text-gray-300 hover:bg-gray-800 hover:text-white rounded-md px-3 py-2 text-lg font-medium"
            >
              Book_Now
            </MenuButton>
            {open && (
              <MenuItems static className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-900 shadow-lg ring-1 ring-gray-700 focus:outline-none">
                <div className="py-1">
                  {bookingOptions.map((option) => (
                    <MenuItem key={option.name}>
                      {({ active }) => (
                        <Link
                          href={option.href}
                          onClick={closeMenu}
                          className={classNames(
                            active ? "bg-gray-800" : "",
                            "block px-4 py-2 text-sm text-gray-300 hover:text-white"
                          )}
                        >
                          {option.name}
                        </Link>
                      )}
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            )}
          </>
        )}
      </Menu>
    </>
  );

  return (
    <Disclosure as="nav" className="bg-black sticky top-0 z-50">
      {({ open, close }) => (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-9 py-1">
          <div className="relative flex h-16 items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-700">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </DisclosureButton>
            </div>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <Link href="/" onClick={() => close()}>
                  <Image src="/rounded_logo2.png" alt="logo" width={52} height={52} />
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <NavigationMenu closeMenu={close} />
                </div>
              </div>
            </div>

            {/* Avatar and Instagram */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-2 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={() => {
                  close();
                  window.location.href =
                    "https://www.instagram.com/v3_event_planners?igsh=MTZhY3J6ZWljNHV6ag==";
                }}
              >
                <span className="sr-only">View Instagram</span>
                <FaInstagram aria-hidden="true" className="h-7 w-7" />
              </button>

              {/* Avatar - Redirect to Auth Page */}
              <Link href="/auth" onClick={() => close()}>
                <Image
                  src="/avatar.png"
                  alt="avatar"
                  width={40}
                  height={40}
                  className="ml-4 rounded-full cursor-pointer"
                />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <NavigationMenu isMobile closeMenu={close} />
            </div>
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
}