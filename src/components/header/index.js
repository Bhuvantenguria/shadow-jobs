'use client'

import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";

function Header(){

    const menuItems = [
        {
            label : 'Home',
            path : '/',
            show :true
        },
        {
            label : 'Log-In',
            path : '/sign-in',
            show :true
        },
        {
            label : 'Register',
            path : '/sign-up',
            show :true
        },
    ]

    return (
        <div>
            <header className="flex h-16 w-full shrink-0 items-center">
                {/* For Mobile Versions */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button className ="lg:hidden">
                            <AlignJustify className="h-6 w-6"/>
                            <span className="sr-only">Toggle Navigation Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side = "left">
                        <Link className="mr-6 hidden lg:flex" href={"#"}>
                            <h3>Shadow Jobs</h3>
                        </Link>
                        <div className="grid gap-2 py-6">
                            {
                                menuItems.map(menu => 
                                    menu.show ? 
                                    <Link href={menu.path} className="flex w-full items-center py-2 text-lg font-semibold" >{menu.label}</Link>
                                    : null
                                )
                            }
                        </div>
                    </SheetContent>
                </Sheet>

                {/* For Desktop Versions */}

                <Link className="hidden lg:flex mr-6" href={'/'}>Shadow Jobs</Link>
                <nav className="ml-auto hidden lg:flex gap-6">
                    {
                        menuItems.map(menu => 
                            menu.show ? 
                            <Link href={menu.path} className="group inline-flex h-9 w-max items-center rounded-md px-4 py-2 bg-white text-sm font-medium  " >{menu.label}</Link>
                            : null
                        )
                    }
                </nav>
                
            </header>
        </div>
    )
}

export default Header;