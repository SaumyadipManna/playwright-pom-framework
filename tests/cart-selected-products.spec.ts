import test from '../lib/BaseTest';
import { CartPanel } from "@ngp-lib/panels/CartPanel";
import { CheckOutPanel } from "@ngp-lib/panels/CheckOutPanel";
import { OverviewPanel } from "@ngp-lib/panels/OverviewPanel";
import { excelUtil } from "@ngp-lib/utils/inatializeSauceDemo";

test("Cart selected product", async ({ inventoryPage }) => {
    let products = ["Sauce Labs Backpack", "Sauce Labs Bike Light"];
    let productPrices = [29.99, 9.99];
    
    (await(await (await (await inventoryPage.addToCart({ productName: products }) as CartPanel)
        .cartManagement({ cartProducts: products, nextStep: 'checkoutpanel' }) as CheckOutPanel)
        .checkOutProduct({firstName:"Admin", lastName:"User", postalCode:"700001", nextStep:"overviewPanel"})as OverviewPanel)
        .validateCartPrice({taxPrice:3.20, productPrices:productPrices}));
});

test.afterEach("upadte status", async({}, testInfo)=>{
    const execTime : number = testInfo.duration ?? 0;
    const status: string = testInfo.status ?? 'Not Executed';
    await excelUtil.updateTestReport({testId:"TC_03",executionTime:execTime,status:status});
})