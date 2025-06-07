import * as XLSX from 'xlsx';
import { Page } from 'playwright';


interface excelInfo {
    testId: string;
    executionTime: number;
    status: string;
}

export class ExcelUtil {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async updateTestReport({ testId = "", executionTime = 0, status = "" }: excelInfo) {
        const reportFilePath = './data/test-report.xlsx';
        const { workbook, sheetName, data } = this.readExcelSheet(reportFilePath);
        const updatedData = this.updateTestData(data, testId, executionTime, status);
        this.writeUpdatedSheet(workbook, updatedData, sheetName, reportFilePath);
    }

    private readExcelSheet(filePath: string) {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        // console.log('data', data);
        return { workbook, sheetName, data };
    }

    private updateTestData(data: any[], testId: string, executionTime: number, status: string) {
        for (let row of data) {
            // console.log(row.Test_ID);
            if (row.Test_ID === testId && row.Test_ID !== null) {
                row.Execution_Time = `${executionTime} ms`;
                row.Status = status;
                break;
            }
        }
        return data;
    }

    private writeUpdatedSheet(workbook: XLSX.WorkBook, data: any[], sheetName: string, filePath: string) {
        const updatedSheet = XLSX.utils.json_to_sheet(data);
        workbook.Sheets[sheetName] = updatedSheet;
        XLSX.writeFile(workbook, filePath);
    }

}
