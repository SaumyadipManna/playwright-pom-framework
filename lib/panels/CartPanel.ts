import { expect, Page } from "@playwright/test";
import { InventoryPage } from "@ngp-lib/pages/InventoryPage";
import { CheckOutPanel } from "./CheckOutPanel";

interface cartInfo{
    cartProducts:String[],
    nextStep?: String
}

interface productDetails{
    cartProducts:String[];
    productPrices:Number[];
}

export class CartPanel {
    private page: Page;
    constructor(page:Page) {
        this.page=page;
    }

    async cartManagement({cartProducts = [], nextStep = "checkout" }: cartInfo) {
        await this.goTOCart();
        return (await this.returnPanel(nextStep));
    }

    async validateProductCount({cartProducts=[]}:cartInfo) {
        let expectedProductCount:Number= cartProducts.length;
        let actualProductCount = this.page.locator("//span[@data-test='shopping-cart-badge']").innerText();
        let isExpected=false;
        if(expectedProductCount == parseInt(await actualProductCount)){
            isExpected=true;
        }
        expect(isExpected).toBeTruthy();
        return this;
    }

    async validateProducts({cartProducts=[], productPrices=[]}:productDetails) {
        let isMatch=false;
        let actualProductName = await this.page.locator("//div[@class='inventory_item_name']").allInnerTexts();
        let actualProductPrices = await this.page.locator("//div[@data-test='inventory-item-price']").allInnerTexts();
        for(let i=0;i<actualProductName.length;i++){
            if(actualProductName[i]==cartProducts[i]){
                if(productPrices[i]== parseFloat(actualProductPrices[i].replace("$",""))){
                    isMatch=true;
                }
            }
            expect(isMatch).toBeTruthy();
            return this;
        }
    }
    
    private async goTOCart() {
        await this.page.locator("//a[@data-test='shopping-cart-link']").click();
        await this.page.waitForLoadState('domcontentloaded');
        return this;
    }

    private async returnPanel(nextStep: String) {
        nextStep = nextStep.toLowerCase();
        switch (nextStep) {
            case 'inventorypage':
                return new InventoryPage(this.page);
                break;  

            case 'checkoutpanel':
                return new CheckOutPanel(this.page);   
                break; 

            default:
                return new CartPanel(this.page);
                break;
        }
    }
}