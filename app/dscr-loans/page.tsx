import { createMortgageProductPage } from "@/lib/mortgage-products/create-page";

const { Page, metadata } = createMortgageProductPage("/dscr-loans");

export { metadata };
export default Page;
