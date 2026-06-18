import { MortgageProductPage } from "@/components/marketing/mortgage-product-page";
import { MORTGAGE_PRODUCTS, type MortgageProductPath } from "@/lib/mortgage-products/content";
import { buildMortgageProductMetadata } from "@/lib/mortgage-products/metadata";
import type { Metadata } from "next";

export function createMortgageProductPage(path: MortgageProductPath) {
  const config = MORTGAGE_PRODUCTS[path];

  function Page() {
    return <MortgageProductPage config={config} />;
  }

  const metadata: Metadata = buildMortgageProductMetadata(config);

  return { Page, metadata, config };
}
