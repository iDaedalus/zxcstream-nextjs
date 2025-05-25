"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import Trailer from "@/app/trailer";
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
    if (!open) {
      const timeout = setTimeout(() => {
        router.back();
      }, 300);
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
