import { createMortgageProductPage } from "@/lib/mortgage-products/create-page";

const { Page, metadata } = createMortgageProductPage("/conventional-loans");

export { metadata };
export default Page;
