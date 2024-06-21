'use client';

import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

function Header({ user }) {
  console.log(!user);

  const menuItems = [
    {
      label: 'Home',
      path: '/',
      show: true,
    },
    {
      label: 'Log-In',
      path: '/sign-in',
      show: !user,
    },
    {
      label: 'Register',
      path: '/sign-up',
      show: !user,
    },
    {
      label: 'Jobs',
      path: '/jobs',
      show: user,
    },
    {
      label: 'Activity',
      path: '/activity',
      show: user,
    },
    {
      label: 'Membership',
      path: '/membership',
      show: user,
    },
    {
      label: 'Account',
      path: '/account',
      show: user,
    },
  ];

  return (
    <div>
      <header className="flex h-16 w-full shrink-0 items-center">
        {/* For Mobile Versions */}
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden">
              <AlignJustify className="h-6 w-6" />
              <span className="sr-only">Toggle Navigation Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link className="mr-6 hidden lg:flex" href="#">
              <h3>Shadow Jobs</h3>
            </Link>
            <div className="grid gap-2 py-6">
              {menuItems.map((menu, index) =>
                menu.show ? (
                  <Link
                    key={index}
                    href={menu.path}
                    className="flex w-full items-center py-2 text-lg font-semibold"
                  >
                    {menu.label}
                  </Link>
                ) : null
              )}
            </div>
            <UserButton afterSignOutUrl="/" />
          </SheetContent>
        </Sheet>

        {/* For Desktop Versions */}
        <Link className="hidden lg:flex mr-6" href="/">
          Shadow Jobs
        </Link>
        <nav className="ml-auto hidden lg:flex gap-6">
          {menuItems.map((menu, index) =>
            menu.show ? (
              <Link
                key={index}
                href={menu.path}
                className="group inline-flex h-9 w-max items-center rounded-md px-4 py-2 bg-white text-sm font-medium"
              >
                {menu.label}
              </Link>
            ) : null
          )}
          <UserButton afterSignOutUrl="/" />
        </nav>
      </header>
    </div>
  );
}

export default Header;
