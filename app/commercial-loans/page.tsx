import { createMortgageProductPage } from "@/lib/mortgage-products/create-page";

const { Page, metadata } = createMortgageProductPage("/commercial-loans");

export { metadata };
export default Page;
