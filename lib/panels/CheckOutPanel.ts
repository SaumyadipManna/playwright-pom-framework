import { Page } from "@playwright/test";
import { CartPanel } from "./CartPanel";
import { OverviewPanel } from "./OverviewPanel";

interface checkOutInfo{
    firstName:string,
    lastName:string,
    postalCode:string,
    nextStep?:string
}


export class CheckOutPanel{
    private page:Page;

    constructor(page:Page){
        this.page=page;
    }

    async checkOutProduct({firstName="",lastName="",postalCode="",nextStep=""}:checkOutInfo){
        await this.checkOut();
        await this.firstName(firstName);
        await this.lastName(lastName);
        await this.postalCode(postalCode);
        await this.continue();
        return (await this.returnPanel(nextStep));
    }
    private async continue() {
        await this.page.getByRole("button", {name:"continue"}).click();
        await this.page.waitForLoadState("domcontentloaded");
        return this;
    }

    async postalCode(postalCode: string) {
        await this.page.getByPlaceholder("Zip/Postal Code").fill(postalCode)
        return this;
    }

    async lastName(lastName: string) {
        await this.page.getByPlaceholder("Last Name").fill(lastName);
        return this;
    }

    async firstName(firstName: string) {
        await this.page.getByPlaceholder("First Name").fill(firstName);
        return this;
    }

    async checkOut() {
        await this.page.getByRole('button', {name: "checkout"}).click();
        await this.page.waitForLoadState('domcontentloaded');
        return this;
    }

    private async returnPanel(nextStep: String) {
            nextStep = nextStep.toLowerCase();
            switch (nextStep) {
                case 'overviewpanel':
                    return new OverviewPanel(this.page);
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