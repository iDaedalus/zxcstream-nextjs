"use client";
import {
  Film,
  HomeIcon,
  Settings,
  Tv,
  Search,
  LayoutGrid,
  Layers,
  TrendingUp,
  LayoutDashboard,
  Menu,
  Home,
  ChevronDown,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/nav-drawer";

import logo from "../assets/zxzx.png";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function NavBar() {
  const router = useRouter();
  const items = [
    {
      name: "Movie",
      logo: Film,
      tags: [
        {
          title: "Popular",
          link: "movie",
          icon: Film,
          details: "Most watched movies right now",
        },
        {
          title: "Trending",
          link: "#",
          icon: TrendingUp,
          details: "Movies gaining popularity today",
        },
        {
          title: "Top Rated",
          link: "#",
          icon: Layers,
          details: "Highest rated movies by viewers",
        },
        {
          title: "Collections",
          link: "#",
          icon: LayoutDashboard,
          details: "Curated sets of related movies",
        },
      ],
    },
    {
      name: "TV Show",
      logo: Tv,
      tags: [
        {
          title: "Popular",
          link: "#",
          icon: Film,
          details: "Most watched TV shows currently",
        },
        {
          title: "Trending",
          link: "#",
          icon: TrendingUp,
          details: "TV shows getting attention now",
        },
        {
          title: "Top Rated",
          link: "#",
          icon: Layers,
          details: "Top rated shows by audiences",
        },
        {
          title: "Collections",
          link: "#",
          icon: LayoutDashboard,
          details: "Themed TV show bundles",
        },
      ],
    },
  ];

  return (
    <header className="absolute z-20   w-full flex justify-center items-center py-5">
      <div className=" lg:absolute lg:left-30 h-8.5 ">
        <img
          className="h-full w-full object-contain z-10"
          src={logo.src}
          alt=""
        />
      </div>

      <Drawer>
        <DrawerTrigger className="absolute cursor-pointer left-4  text-white lg:hidden">
          <Menu size={30} />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="flex flex-col text-white gap-5 mt-5">
              <div className="flex gap-2 items-center">
                <Home size={20} /> Home
              </div>
              <div className="flex gap-2 items-center">
                <Search size={20} /> Search
              </div>

              {items.map((meow) => (
                <Collapsible key={meow.name}>
                  <CollapsibleTrigger className="flex justify-between w-full items-center">
                    <div className="flex items-center gap-2">
                      <meow.logo size={20} />
                      {meow.name}
                    </div>
                    <ChevronDown size={20} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="flex flex-col gap-3 mt-3 ">
                    {meow.tags.map((arf) => (
                      <span
                        key={arf.title}
                        className="flex gap-2 items-center text-sm ml-5 font-light"
                      >
                        <arf.icon size={15} />
                        {arf.title}
                      </span>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ))}

              <div className="flex gap-2 items-center">
                <LayoutGrid size={20} /> Watchlist
              </div>

              <div className="flex gap-2 items-center">
                <Settings size={20} /> Settings
              </div>
            </DrawerTitle>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>

      <nav className="hidden lg:flex items-center text-gray-300">
        <Link href="/" className="px-5 hover:bg-blue-800">
          <HomeIcon size={16} />
        </Link>

        <div className="border-l border-gray-500/50 h-5"></div>

        <NavigationMenu className="px-3">
          <NavigationMenuList>
            {items.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuTrigger className="flex items-center gap-3 ">
                  <item.logo size={16} />
                  {item.name}
                </NavigationMenuTrigger>

                {item.tags && (
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 grid-rows-3 w-[480px] h-[200px] gap-1">
                      {item.tags.map((tag, index) => (
                        <NavigationMenuLink
                          key={tag.title}
                          className={`relative bg-blue-100 rounded-sm ${
                            index === 0 ? "row-span-3" : ""
                          }`}
                          onClick={() => router.push(`/${tag.link}`)}
                        >
                          <p className="absolute bottom-3 left-3 flex gap-2 text-sm zxc font-bold">
                            <tag.icon /> {tag.title}
                          </p>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                )}
              </NavigationMenuItem>
            ))}

            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <span className="flex items-center gap-3">
                  <LayoutGrid size={16} /> Watchlist
                </span>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/search"
                className={navigationMenuTriggerStyle()}
              >
                <span className="flex items-center gap-3">
                  <Search size={16} /> Search
                </span>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="border-l border-gray-500/50 h-5"></div>
        <div className="px-5">
          <Settings size={16} />
        </div>
      </nav>
    </header>
  );
}
