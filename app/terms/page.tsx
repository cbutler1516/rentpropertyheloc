import { TERMS_OF_USE_PATH } from "@/lib/legal/routes";
import { redirect } from "next/navigation";

export default function TermsPage() {
  redirect(TERMS_OF_USE_PATH);
}
