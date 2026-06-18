import { createMortgageProductPage } from "@/lib/mortgage-products/create-page";

const { Page, metadata } = createMortgageProductPage("/bank-statement-loans");

export { metadata };
export default Page;
