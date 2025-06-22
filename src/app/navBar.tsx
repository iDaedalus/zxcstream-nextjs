"use client";

import {
  Film,
  Home,
  Settings,
  Tv,
  Search,
  Bookmark,
  MenuIcon,
} from "lucide-react";
import logo from "../assets/zxzx.png";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NavBar() {


  return (
    <header className="absolute top-10 left-0 right-0 z-50    ">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between lg:justify-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className=" lg:absolute lg:left-30 h-8.5 ">
              <img
                className="h-full w-full object-contain z-10"
                src={logo.src || "/placeholder.svg"}
                alt=""
              />
            </div>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <div>
                <MenuIcon className="h-7 w-7" />
                <span className="sr-only">Toggle navigation menu</span>
              </div>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle className="text-left">Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-6">
                <Link
                  href="/"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </Link>

                <Link
                  href="/search"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
                >
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </Link>

                <Link
                  href="/movies"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
                >
                  <Film className="w-5 h-5" />
                  <span>Movies</span>
                </Link>

                <Link
                  href="/tv"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
                >
                  <Tv className="w-5 h-5" />
                  <span>TV Shows</span>
                </Link>

                <Link
                  href="/watchlist"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
                >
                  <Bookmark className="w-5 h-5" />
                  <span>Watchlist</span>
                </Link>

                <Link
                  href="/settings"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Button variant="ghost" size="sm" asChild>
              <Link
                prefetch={true}
                href="/"
                className="flex items-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span className="font-light tracking-wide">Home</span>
              </Link>
            </Button>

            {/* Replace the NavigationMenu section with simple buttons */}
            <Button variant="ghost" size="sm" asChild>
              <Link
                prefetch={true}
                href="/movies"
                className="flex items-center space-x-2"
              >
                <Film className="w-4 h-4" />
                <span className="font-light tracking-wide">Movies</span>
              </Link>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <Link
                prefetch={true}
                href="/tv"
                className="flex items-center space-x-2"
              >
                <Tv className="w-4 h-4" />
                <span className="font-light tracking-wide">TV Shows</span>
              </Link>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <Link
                prefetch={true}
                href="/watchlist"
                className="flex items-center space-x-2"
              >
                <Bookmark className="w-4 h-4 mr-2" />
                <span className="font-light tracking-wide">Watchlist</span>
              </Link>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <Link
                prefetch={true}
                href="/search"
                className="flex items-center space-x-2"
              >
                <Search className="w-4 h-4 mr-2" />
                <span className="font-light tracking-wide">Search</span>
              </Link>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <Link
                prefetch={true}
                href="/settings"
                className="flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span className="font-light tracking-wide">Settings</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
