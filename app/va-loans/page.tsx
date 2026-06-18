import { createMortgageProductPage } from "@/lib/mortgage-products/create-page";

const { Page, metadata } = createMortgageProductPage("/va-loans");

export { metadata };
export default Page;
