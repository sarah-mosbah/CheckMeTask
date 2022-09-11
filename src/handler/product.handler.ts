import {  Request, Response  } from 'express';
import fs from 'fs';
import csv from 'csv-parser';
import { IProduct } from '../model/IProduct';
import { IReportService } from '../service/reports/IReport.service';
import { ReportService } from '../service/reports/report.service';
import { IProcessedProducts } from '../model/IProcessedProducts';
import { IDataProcessingService } from '../service/productProcessing/productProcessiong.service';
import { DataProcessingService } from '../service/productProcessing/IProductProcessing';
export default class ProductHandler {

    private static instance: ProductHandler;
    private reportService!: IReportService;
    private dataProcessingService!: IDataProcessingService;
    constructor(reportService?: IReportService, dataProcessingService?: IDataProcessingService) {
        if(ProductHandler.instance) {
           return ProductHandler.instance;
        }
        ProductHandler.instance = this;
        this.reportService = reportService || new ReportService();
        this.dataProcessingService = dataProcessingService || new DataProcessingService();
    }

    public async uploadCsvFileToServer(req: Request, res: Response) {
        try {
            const filePath = req.file?.path as string;
            const fileName = req.file?.originalname as string;
            let finalData : IProcessedProducts = {};
            fs.createReadStream(filePath).pipe(csv()).on('data', (data: IProduct) => {
                finalData = this.dataProcessingService.createProductReportData(finalData, data);
            })
            .on('end', () => {
               this.reportService?.createProductAverageSalesByOrderReport(finalData, fileName);
               this.reportService?.createProductMostPopularBrandReport(finalData, fileName);
               fs.unlinkSync(filePath);
            });
            return res.status(200).json({message: 'ok'});
        } catch (error) {
            return res.status(500).json({message: "internal server error"});
        }
    }
}

