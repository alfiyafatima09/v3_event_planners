"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/app/lib/firebase";

const bookingOptions = [
  { name: "Birthday Parties", href: "/order?category=birthday" },
  { name: "Engagements", href: "/order?category=engagement" },
  { name: "Housewarming", href: "/order?category=housewarming" },
  { name: "Puja Events", href: "/order?category=puja" },
  { name: "Baby Showers", href: "/order?category=babyShower" },
  { name: "Naming Ceremony", href: "/order?category=namingCeremony" },
];

const navigation = [
  { name: "Home", href: "/" },
  { name: "Past-events", href: "/past_events" },
  { name: "Feedback", href: "/feedback" },
  { name: "My Orders", href: "/my-orders", requireAuth: true },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// Admin user ID - only this user can see admin button
const ADMIN_USER_ID = process.env.NEXT_PUBLIC_ADMIN_USER_ID;

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      // Check if current user is the admin
      setIsAdmin(firebaseUser?.uid === ADMIN_USER_ID);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const NavigationMenu = ({ isMobile = false, closeMenu }: { isMobile?: boolean; closeMenu: () => void }) => (
    <>
      {navigation.map((item) => {
        // Hide "My Orders" if user is not logged in
        if (item.requireAuth && !user) return null;
        
        return (
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
        );
      })}
      
      {/* Admin Link - Only visible to admins */}
      {isAdmin && (
        <Link
          href="/admin"
          onClick={closeMenu}
          className={classNames(
            pathname === "/admin" || pathname.startsWith("/admin/")
              ? "bg-purple-900 text-white"
              : "text-purple-300 hover:bg-purple-800 hover:text-white",
            isMobile ? "block" : "",
            "rounded-md px-3 py-2 text-lg font-medium"
          )}
        >
          Admin
        </Link>
      )}

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

            {/* Avatar, Instagram, and Logout */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-2">
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

              {!loading && (
                <>
                  {user ? (
                    <>
                      {/* User Menu with Avatar and Logout */}
                      <Menu as="div" className="relative">
                        <MenuButton className="flex items-center focus:outline-none">
                          <Image
                            src="/avatar.png"
                            alt="avatar"
                            width={40}
                            height={40}
                            className="rounded-full cursor-pointer border-2 border-gray-700 hover:border-pink-500 transition-colors"
                          />
                        </MenuButton>
                        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-900 shadow-lg ring-1 ring-gray-700 focus:outline-none">
                          <div className="py-1">
                            <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                              <p className="font-medium text-white">{user.email}</p>
                            </div>
                            <MenuItem>
                              {({ active }) => (
                                <Link
                                  href="/my-orders"
                                  onClick={() => close()}
                                  className={classNames(
                                    active ? "bg-gray-800" : "",
                                    "block px-4 py-2 text-sm text-gray-300 hover:text-white"
                                  )}
                                >
                                  My Orders
                                </Link>
                              )}
                            </MenuItem>
                            {isAdmin && (
                              <MenuItem>
                                {({ active }) => (
                                  <Link
                                    href="/admin"
                                    onClick={() => close()}
                                    className={classNames(
                                      active ? "bg-purple-800" : "",
                                      "block px-4 py-2 text-sm text-purple-300 hover:text-white"
                                    )}
                                  >
                                    Admin Panel
                                  </Link>
                                )}
                              </MenuItem>
                            )}
                            <MenuItem>
                              {({ active }) => (
                                <button
                                  onClick={() => {
                                    close();
                                    handleLogout();
                                  }}
                                  className={classNames(
                                    active ? "bg-gray-800" : "",
                                    "block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white"
                                  )}
                                >
                                  Logout
                                </button>
                              )}
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </Menu>
                    </>
                  ) : (
                    /* Login Link when not authenticated */
                    <Link href="/login" onClick={() => close()}>
                      <Image
                        src="/avatar.png"
                        alt="avatar"
                        width={40}
                        height={40}
                        className="rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <NavigationMenu isMobile closeMenu={close} />
              {!loading && user && (
                <div className="pt-4 border-t border-gray-700 mt-2">
                  <div className="px-3 py-2 text-sm text-gray-300 space-y-2">
                    <p className="font-medium text-white mb-2">{user.email}</p>
                    <Link
                      href="/my-orders"
                      onClick={() => close()}
                      className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                    >
                      My Orders
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => close()}
                        className="block px-3 py-2 text-sm text-purple-300 hover:text-white hover:bg-purple-800/20 rounded-md"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        close();
                        handleLogout();
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-800 rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
}