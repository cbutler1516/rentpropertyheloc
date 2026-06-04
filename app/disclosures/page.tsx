import { LICENSING_INFORMATION_PATH } from "@/lib/legal/routes";
import { redirect } from "next/navigation";

/** Legacy URL — licensing content lives on the dedicated page */
export default function DisclosuresPage() {
  redirect(LICENSING_INFORMATION_PATH);
}
