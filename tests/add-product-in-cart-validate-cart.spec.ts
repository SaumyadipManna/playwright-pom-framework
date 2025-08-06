import test from '../lib/BaseTest';
import { CartPanel } from "@ngp-lib/panels/CartPanel";
import { excelUtil } from "@ngp-lib/utils/inatializeSauceDemo";

test('Add product in cart and validate cart', async ({  inventoryPage }) => {
    let products=["Sauce Labs Backpack","Sauce Labs Bike Light"];
    let productPrices=[29.99,9.99];
        (await(await(await inventoryPage.addToCart({productName:products}) as CartPanel)
        .cartManagement({ cartProducts:products, nextStep:'cartPanel'}) as CartPanel)
        .validateProducts({cartProducts:products,productPrices:productPrices}));
});

test.afterEach("upadte status", async({}, testInfo)=>{
    const execTime : number = testInfo.duration ?? 0;
    const status: string = testInfo.status ?? 'Not Executed';
    await excelUtil.updateTestReport({testId:"TC_02",executionTime:execTime,status:status});
})