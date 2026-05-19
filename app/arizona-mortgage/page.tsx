import { buildStateMortgagePage } from "../lib/build-state-mortgage-page";

const page = buildStateMortgagePage("arizona-mortgage");

export const metadata = page.metadata;
export default page.default;
