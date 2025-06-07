import { Page } from "@playwright/test";
import { ExcelUtil } from "./ExcelUtil";


export let excelUtil: ExcelUtil;


export async function inatializeSauceDemo(page:Page) {
    excelUtil = new ExcelUtil(page);
}