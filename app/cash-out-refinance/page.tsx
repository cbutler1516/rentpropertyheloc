import { createMortgageProductPage } from "@/lib/mortgage-products/create-page";

const { Page, metadata } = createMortgageProductPage("/cash-out-refinance");

export { metadata };
export default Page;
