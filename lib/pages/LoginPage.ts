import { Page } from "@playwright/test";
import { DEFAULT_USERNAME,DEFAULT_PASSWORD } from "@sdconfig";


interface LoginInfo{
    userName?: string,
    password?: string
}

export class LoginPage {
    private page: Page;
    
    constructor(page:Page) {
        this.page=page;
    }

    async loginAs({userName = DEFAULT_USERNAME, password= DEFAULT_PASSWORD}:LoginInfo) {
        // await this.sdLoad();
        await this.userName(userName);
        await this.password(password);
        await this.login();
        return this;
    }

    private async login() {
        await this.page.getByRole('button',{name:'Login'}).click();
        await this.sdLoad();
        return this;
    }

    private async password(password: string) {
        await this.page.getByPlaceholder("Password").fill(password);
        return this;
    }

    private async userName(userName: string){
        await this.page.getByPlaceholder("Username").fill(userName);
        return this;
    }

    private async sdLoad() {
        await this.page.locator("//div[@class='app_logo']").waitFor({state:"attached"});
        return this;
    }



}