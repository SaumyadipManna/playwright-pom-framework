import {test as baseTest} from "@playwright/test";
import { LOGIN_URL } from "@sdconfig";
import { LoginPage } from "@pages/LoginPage";
import { InventoryPage } from "@pages/InventoryPage"
// import { LogoutPage } from '@pages/LogoutPage';
import { _baseTest } from "@playwright/test";
import { inatializeSauceDemo } from "./utils/inatializeSauceDemo";


const test = baseTest.extend<{
    loginPage: LoginPage;
    inventoryPage:InventoryPage;
    // logoutPage: LogoutPage;
}>({
    loginPage: async ({ page }, use) => {
        await inatializeSauceDemo(page);
        await page.goto(LOGIN_URL);
        await page.keyboard.press("F11");
        await use(new LoginPage(page));
    },
    inventoryPage: async({page},use)=>{
        await inatializeSauceDemo(page);
        await page.goto(LOGIN_URL);
        await page.keyboard.press("F11");
        let loginPage = new LoginPage(page);
        await loginPage.loginAs({});
        await use(new InventoryPage(page));
    },

});

export default test;