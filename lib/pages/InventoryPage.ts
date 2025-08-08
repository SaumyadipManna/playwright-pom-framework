import { expect, Page } from "@playwright/test";
import { CartPanel } from "../panels/CartPanel";
// import { CartPanel } from "@ngp-lib/panels/CartPanel";

interface inventoryInfo {
    productName: string[]
}

export class InventoryPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    private getProductLocator(product: string) {
        return this.page.locator(`//div[normalize-space(text())='${product}']`);
    }

    async openProductDescription({ productName = [] }: inventoryInfo) {
        for (let i = 0; i < productName.length; i++) {
            let product = this.getProductLocator(productName[i]);
            await product.click();
        }
        return this;
    }

    async addToCart({ productName = [] }: inventoryInfo) {
        for (let i = 0; i < productName.length; i++) {
            let product = this.getProductLocator(productName[i]);
            let productLabel = product.locator("//ancestor::div[@class='inventory_item_label']");
            await productLabel.locator("//following-sibling::div//button[normalize-space(text())='Add to cart']").click();
            await productLabel.locator("//following-sibling::div//button[normalize-space(text())='Remove']").waitFor({ state: "visible" });
        }

        return new CartPanel(this.page);
    }

    async sortLowTOHigh() {
        await this.page.locator("//select[@class='product_sort_container']").selectOption("lohi");
        let isVisible = await this.page.getByText("Products").isVisible();
        expect(isVisible).toBeTruthy();
        return this;
    }

    async validateSortLowTOHigh() {
        let price = await this.page.locator("//div[@class='inventory_item_price']").allInnerTexts();
        let isExpected=false;
        for (let i = 0; i < price.length - 1; i++) {
            if (parseFloat(price[i + 1].replace('$', '')) >= parseFloat(price[i].replace('$', ''))) {
                isExpected = true;
            }
        }
        expect(isExpected).toBeTruthy();
        return this;
    }

}