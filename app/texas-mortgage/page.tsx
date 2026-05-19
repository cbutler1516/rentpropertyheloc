import { buildStateMortgagePage } from "../lib/build-state-mortgage-page";

const page = buildStateMortgagePage("texas-mortgage");

export const metadata = page.metadata;
export default page.default;
