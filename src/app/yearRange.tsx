import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";

// Import the cn utility if you're using Tailwind CSS classnames
import { cn } from "@/lib/utils"; // <-- Update this path if needed

export default function YearRange() {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="space-y-1">
        <p>To</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value || "Select Year"}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search year..." className="h-9" />
              <CommandList>
                <CommandEmpty>No year found.</CommandEmpty>
                <CommandGroup>
                  {years.map((year) => (
                    <CommandItem
                      key={year}
                      value={year}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {year}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === year ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-1">
        <p>From</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value || "Select Year"}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search year..." className="h-9" />
              <CommandList>
                <CommandEmpty>No year found.</CommandEmpty>
                <CommandGroup>
                  {years.map((year) => (
                    <CommandItem
                      key={year}
                      value={year}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {year}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === year ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>{" "}
      <div className="space-y-1">
        <p>To</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value || "Select Year"}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search year..." className="h-9" />
              <CommandList>
                <CommandEmpty>No year found.</CommandEmpty>
                <CommandGroup>
                  {years.map((year) => (
                    <CommandItem
                      key={year}
                      value={year}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {year}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === year ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-1">
        <p>From</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value || "Select Year"}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search year..." className="h-9" />
              <CommandList>
                <CommandEmpty>No year found.</CommandEmpty>
                <CommandGroup>
                  {years.map((year) => (
                    <CommandItem
                      key={year}
                      value={year}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {year}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === year ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>{" "}
      <div className="space-y-1">
        <p>To</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value || "Select Year"}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search year..." className="h-9" />
              <CommandList>
                <CommandEmpty>No year found.</CommandEmpty>
                <CommandGroup>
                  {years.map((year) => (
                    <CommandItem
                      key={year}
                      value={year}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {year}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === year ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-1">
        <p>From</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value || "Select Year"}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search year..." className="h-9" />
              <CommandList>
                <CommandEmpty>No year found.</CommandEmpty>
                <CommandGroup>
                  {years.map((year) => (
                    <CommandItem
                      key={year}
                      value={year}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {year}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === year ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        
      </div>
    </div>
  );
}
