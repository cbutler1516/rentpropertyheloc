import { buildStateMortgagePage } from "../lib/build-state-mortgage-page";

const page = buildStateMortgagePage("florida-mortgage");

export const metadata = page.metadata;
export default page.default;
