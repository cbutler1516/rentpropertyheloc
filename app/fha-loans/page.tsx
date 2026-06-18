import { createMortgageProductPage } from "@/lib/mortgage-products/create-page";

const { Page, metadata } = createMortgageProductPage("/fha-loans");

export { metadata };
export default Page;
