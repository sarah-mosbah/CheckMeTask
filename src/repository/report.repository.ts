import { IReportRepository } from "./IReportRepositoty";
import fs from 'fs';
import { format } from '@fast-csv/format';
export class ReportRepository implements IReportRepository{
    public createReport(folderName: string, filename: string, data: any[]): void {    
        const writableStream = fs.createWriteStream(`${this.createDirectory(folderName)}/${filename}`);
        const csvStream = format({ headers: Object.keys(data[0]) });
        writableStream.on('error',  (error) => {
            console.log(`An error occured while writing to the file. Error: ${error.message}`);
        });
        csvStream.pipe(writableStream);
        data.forEach(element => {
            csvStream.write(Object.values(element));
        });
       
        csvStream.end();
    }

    private createDirectory(folderName: string) {
        const path = `./reports-result/${folderName}`;
        if (!fs.existsSync(path)){
            fs.mkdirSync(path, { recursive: true });
        }
        return path;
    }
}