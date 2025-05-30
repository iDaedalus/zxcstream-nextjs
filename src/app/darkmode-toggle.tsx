"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32" align="end">
        <div className="flex flex-col space-y-1">
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => setTheme("light")}
          >
            Light
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => setTheme("dark")}
          >
            Dark
          </Button>
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => setTheme("system")}
          >
            System
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
