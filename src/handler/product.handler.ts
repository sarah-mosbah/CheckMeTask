import {  Request, Response  } from 'express';
import fs from 'fs';
import csv from 'csv-parser';
export default class ProductHandler {

    private static instance: ProductHandler
    constructor() {
        if(ProductHandler.instance) {
           return ProductHandler.instance;
        }
        ProductHandler.instance = this;
    }

    public async uploadCsvFileToServer(req: Request, res: Response) {
        try {
            const fileRows: any[] = [];
            const filePath =req.file?.path as string;
            fs.createReadStream(filePath).pipe(csv())
            .on('data', (data: any) => {
                console.log(data);
            })
            .on('end', () => {
               fs.unlinkSync(filePath);
            });
            return res.status(200).send('Uploaded Successfully');
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "internal server error"});
        }
    }
}

