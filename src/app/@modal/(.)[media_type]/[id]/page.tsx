"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Trailer from "@/app/trailer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";

interface PageProps {
  params: Promise<{ media_type: string; id: number }>;
}

export default function InterceptModal({ params }: PageProps) {
  const { media_type, id } = use(params);
  const router = useRouter();
  const [open, setOpen] = useState(true);
  console.log(media_type, id);
  useEffect(() => {
    // When `open` becomes false, wait for animation to finish, then go back
    if (!open) {
      const timeout = setTimeout(() => {
        router.back();
      }, 300); // Adjust duration to match drawer animation speed
      return () => clearTimeout(timeout);
    }
  }, [open, router]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <Trailer id={id} mediaType={media_type} />
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
