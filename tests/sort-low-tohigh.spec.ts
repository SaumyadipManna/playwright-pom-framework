import test from "@ngp-lib/BaseTest";
import { InventoryPage } from "@ngp-lib/pages/InventoryPage";
import { CartPanel } from "@ngp-lib/panels/CartPanel";
import { excelUtil } from "@ngp-lib/utils/inatializeSauceDemo";

test('Sort product Low to High', async ({ inventoryPage }) => {
    (await(await inventoryPage.sortLowTOHigh() as InventoryPage)
        .validateSortLowTOHigh());
});

test.afterEach("upadte status", async({}, testInfo)=>{
    const execTime : number = testInfo.duration ?? 0;
    const status: string = testInfo.status ?? 'Not Executed';
    await excelUtil.updateTestReport({testId:"TC_04",executionTime:execTime,status:status});
})