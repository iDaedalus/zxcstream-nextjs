import InterceptModal from "@/app/@modal/(.)[media_type]/[id]/page";
import { use } from "react";

interface PageProps {
  params: Promise<{ media_type: string; id: string }>;
}
export default function InterceptModal2({ params }: PageProps) {
  const { media_type, id } = use(params);

  return <InterceptModal params={params} />;
}
