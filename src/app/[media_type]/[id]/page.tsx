"use client";
import { useState, use } from "react";
import DrawerMetadata from "./metadata";
import { useRouter } from "next/navigation";
import NavBar from "@/app/navBar";
interface PageProps {
  params: Promise<{ media_type: string; id: string }>;
}
export default function InterceptModal({ params }: PageProps) {
  const { media_type, id } = use(params);
  const [open, setOpen] = useState(true);
  const [navigate, setNavigate] = useState(false);
  const router = useRouter();
  if (!open && !navigate) {
    router.back();
  }

  return (
    <div>
      <NavBar />
      <div className="lg:w-[65%] w-[95%] mx-auto ">
        {" "}
        <DrawerMetadata
          id={id}
          media_type={media_type}
          setOpen={setOpen}
          setNavigate={setNavigate}
        />
      </div>
    </div>
  );
}
