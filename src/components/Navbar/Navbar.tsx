/* eslint-disable @next/next/no-img-element */
import { forwardRef, Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Image from "next/image";

import { useUser } from "../../utils/useUser";

import { supabase } from "../../utils/supabase-client";

const MENU_ITEMS = [
  { title: "Home", path: "/", type: "main" },
  { title: "Features", path: "/features", type: "main" },
  { title: "Account", path: "/account", type: "profile" },
  { title: "Sign Out", path: "/api/auth/logout", type: "profile" },
];

export default function Navbar() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const router = useRouter();

  const { user, userDetails } = useUser();

  const profileAvatarUrl = userDetails?.avatarUrl;
  useEffect(() => {
    async function getImageUrl(profileAvatarUrl: string) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(profileAvatarUrl);

        if (error) {
          throw error;
        }

        if (!data) {
          throw new Error("No image object found.");
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error: any) {
        console.log("Error downloading image: ", error.message);
      }
    }

    if (profileAvatarUrl) getImageUrl(profileAvatarUrl);
  }, [profileAvatarUrl]);

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  {MENU_ITEMS.filter((link) => link.type === "main").map(
                    (link, index) => (
                      <Link href={link.path} passHref key={index}>
                        <a
                          className={
                            router.pathname === link.path
                              ? "border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                          }
                        >
                          {link.title}
                        </a>
                      </Link>
                    )
                  )}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/* Desktop Profile dropdown */}
                {!user && (
                  <Link href={"/signin"} passHref>
                    <a
                      className={
                        "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      }
                    >
                      Sign In
                    </a>
                  </Link>
                )}
                {user && (
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <Image
                          className="h-8 w-8 rounded-full"
                          src={avatarUrl ? avatarUrl : "/profile_image.jpg"}
                          alt="avatar"
                          height="32"
                          width="32"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {MENU_ITEMS.filter(
                          (link) => link.type === "profile"
                        ).map((link, index) => (
                          <Menu.Item key={index}>
                            {({ active }) => (
                              <ProfileMenuLink active={active} href={link.path}>
                                {link.title}
                              </ProfileMenuLink>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              {MENU_ITEMS.filter((link) => link.type === "main").map(
                (link, index) => (
                  <Disclosure.Button
                    as="a"
                    key={index}
                    className={
                      router.pathname === link.path
                        ? "bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                        : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    }
                    onClick={() => {
                      router.push(`${link.path}`);
                    }}
                  >
                    {link.title}
                  </Disclosure.Button>
                )
              )}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={avatarUrl ? avatarUrl : "/profile_image.jpg"}
                    alt="avatar"
                    height="40"
                    width="40"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {userDetails?.fullName
                      ? userDetails?.fullName
                      : "A Cool User"}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user?.email ? user?.email : "No email yet"}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                {MENU_ITEMS.filter((link) => link.type === "profile").map(
                  (link, index) => (
                    <Disclosure.Button
                      as="a"
                      key={index}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                      onClick={() => {
                        router.push(`${link.path}`);
                      }}
                    >
                      {link.title}
                    </Disclosure.Button>
                  )
                )}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ProfileMenuLink = forwardRef((props: any, ref) => {
  let { href, children, active, ...rest } = props;
  return (
    <Link href={href}>
      <a
        ref={ref}
        {...rest}
        className={classNames(
          active ? "bg-gray-100" : "",
          "block px-4 py-2 text-sm text-gray-700"
        )}
      >
        {children}
      </a>
    </Link>
  );
});
ProfileMenuLink.displayName = "ProfileMenuLink";
