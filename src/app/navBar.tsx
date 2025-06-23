"use client";
import { Film, Home, Settings, Tv, Search, Bookmark } from "lucide-react";
import logo from "../assets/zxzx.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="lg:absolute lg:left-30 h-8.5">
                <img
                  className="h-full w-full object-contain z-10"
                  src={logo.src || "/placeholder.svg"}
                  alt=""
                />
              </div>
            </Link>

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

      {/* Mobile Bottom Dock */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
        <div className="flex items-center justify-around px-4 py-2">
          <Link
            href="/"
            className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-accent transition-colors min-w-0"
          >
            <Home className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Home</span>
          </Link>

          <Link
            href="/search"
            className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-accent transition-colors min-w-0"
          >
            <Search className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Search</span>
          </Link>

          <Link
            href="/movies"
            className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-accent transition-colors min-w-0"
          >
            <Film className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Movies</span>
          </Link>

          <Link
            href="/tv"
            className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-accent transition-colors min-w-0"
          >
            <Tv className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">TV</span>
          </Link>

          <Link
            href="/watchlist"
            className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-accent transition-colors min-w-0"
          >
            <Bookmark className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">List</span>
          </Link>

          <Link
            href="/settings"
            className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-accent transition-colors min-w-0"
          >
            <Settings className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">Settings</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
