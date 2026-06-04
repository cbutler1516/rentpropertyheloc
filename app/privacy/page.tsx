import { PRIVACY_POLICY_PATH } from "@/lib/legal/routes";
import { redirect } from "next/navigation";

export default function PrivacyPage() {
  redirect(PRIVACY_POLICY_PATH);
}
