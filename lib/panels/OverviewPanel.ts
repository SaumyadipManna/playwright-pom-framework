import { expect, Page } from "@playwright/test";

interface overviewInfo{
    taxPrice:number,
    productPrices:number[]
}



export class OverviewPanel{
    private page:Page;
    constructor(page:Page){
        this.page=page;
    }

    async validateCartPrice({taxPrice=0,productPrices=[]}:overviewInfo){
        let productPrice=0;
        for (let i = 0; i < productPrices.length; i++) {
            productPrice+=productPrices[i];
        }
        let totalProductPrice=productPrice+taxPrice;
        let actualPrice = await this.page.locator("//div[@class='summary_total_label']").innerText()
        let isExpected = false;
        if(parseFloat(actualPrice.split(":").at(1)?.replace("$",'').trim() || "0") == totalProductPrice){
            isExpected=true;
        }
        expect(isExpected).toBeTruthy();
        await this.finish();
        await expect( this.page.locator("//h2[normalize-space(text())='Thank you for your order!']")).toBeVisible();
        return this;
        
    }
    async finish() {
        await this.page.getByRole("button", {name:"finish"}).click();
        await this.page.waitForLoadState("domcontentloaded");
        return this;
    }

}