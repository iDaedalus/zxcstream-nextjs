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
} from "lucide-react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

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
import { Button } from "@/components/ui/button";

export default function NavBar() {
  const router = useRouter();
  const items = [
    {
      name: "Movie",
      logo: Film,
      tags: [
        {
          title: "Popular",
          link: "explore/movie/popular",
          icon: Film,
          details: "Most watched movies right now",
        },
        {
          title: "Top Rated",
          link: "explore/movie/top-rated",
          icon: Layers,
          details: "Highest rated movies by viewers",
        },
        {
          title: "Now Playing",
          link: "explore/movie/now-playing",
          icon: TrendingUp,
          details: "Movies gaining popularity today",
        },
        {
          title: "Coming Soon",
          link: "explore/movie/coming-soon",
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
          link: "explore/tv/popular",
          icon: Film,
          details: "Most watched TV shows currently",
        },
        {
          title: "Top Rated",
          link: "explore/tv/top-rated",
          icon: TrendingUp,
          details: "TV shows getting attention now",
        },
        {
          title: "Now Playing",
          link: "explore/tv/now-playing",
          icon: Layers,
          details: "Top rated shows by audiences",
        },
        {
          title: "Coming Soon",
          link: "explore/tv/coming-soon",
          icon: LayoutDashboard,
          details: "Themed TV show bundles",
        },
      ],
    },
  ];

  return (
    <>
      <header className="absolute z-20 hidden lg:flex   w-full  justify-center items-center py-5">
        <div className=" lg:absolute lg:left-30 h-8.5 ">
          <img
            className="h-full w-full object-contain z-10"
            src={logo.src}
            alt=""
          />
        </div>

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
                      <div className="grid grid-cols-2  w-[480px] gap-1 p-2">
                        {item.tags.map((tag) => (
                          <NavigationMenuLink
                            key={tag.title}
                            className="relative border rounded-sm flex flex-col justify-end p-2"
                            onClick={() => router.push(`/${tag.link}`)}
                          >
                            <p className=" flex gap-2 text-sm zxc font-bold">
                              <tag.icon /> {tag.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {tag.details}
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
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
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

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="flex items-center justify-around px-2 py-2">
          {/* Home */}
          <Link
            href="/"
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <HomeIcon size={20} className="text-foreground" />
            <span className="text-xs text-muted-foreground">Home</span>
          </Link>

          {/* Movies Drawer */}
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                className="flex flex-col items-center gap-1 p-2 h-auto"
              >
                <Film size={20} className="text-foreground" />
                <span className="text-xs text-muted-foreground">Movies</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="flex items-center gap-2">
                  <Film size={20} />
                  Movies
                </DrawerTitle>
              </DrawerHeader>
              <div className="grid grid-cols-1 gap-3 p-4 pb-8">
                {items[0].tags.map((tag) => (
                  <Button
                    key={tag.title}
                    variant="outline"
                    className="flex flex-col items-start gap-2 h-auto p-4"
                    onClick={() => router.push(`/${tag.link}`)}
                  >
                    <div className="flex items-center gap-2">
                      <tag.icon size={16} />
                      <span className="font-medium">{tag.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground text-left">
                      {tag.details}
                    </span>
                  </Button>
                ))}
              </div>
            </DrawerContent>
          </Drawer>

          {/* TV Shows Drawer */}
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                className="flex flex-col items-center gap-1 p-2 h-auto"
              >
                <Tv size={20} className="text-foreground" />
                <span className="text-xs text-muted-foreground">TV Shows</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="flex items-center gap-2">
                  <Tv size={20} />
                  TV Shows
                </DrawerTitle>
              </DrawerHeader>
              <div className="grid grid-cols-1 gap-3 p-4 pb-8">
                {items[1].tags.map((tag) => (
                  <Button
                    key={tag.title}
                    variant="outline"
                    className="flex flex-col items-start gap-2 h-auto p-4"
                    onClick={() => router.push(`/${tag.link}`)}
                  >
                    <div className="flex items-center gap-2">
                      <tag.icon size={16} />
                      <span className="font-medium">{tag.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground text-left">
                      {tag.details}
                    </span>
                  </Button>
                ))}
              </div>
            </DrawerContent>
          </Drawer>

          {/* Watchlist */}
          <Link
            href="/watchlist"
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <LayoutGrid size={20} className="text-foreground" />
            <span className="text-xs text-muted-foreground">Watchlist</span>
          </Link>

          {/* Search */}
          <Link
            href="/search"
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <Search size={20} className="text-foreground" />
            <span className="text-xs text-muted-foreground">Search</span>
          </Link>
        </div>
      </div>
    </>
  );
}
