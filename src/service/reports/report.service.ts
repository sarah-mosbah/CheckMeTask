import { IProcessedProducts } from "../../model/IProcessedProducts";
import { IReportRepository } from "../../repository/IReportRepositoty";
import { ReportRepository } from "../../repository/report.repository";
import { IReportService } from "./IReport.service";


export class ReportService implements IReportService {
    constructor(private reportRepository?: IReportRepository) {
      this.reportRepository = reportRepository || new ReportRepository();
    }

    public createProductAverageSalesByOrderReport(data: IProcessedProducts, filePath: string): void {
      try {
            const finalReportData: any = [];
            const totalNumberOfAllOrders = Object.values(data).reduce((a,b) => a + b.totalOrders, 0);
            Object.keys(data).forEach((key: string) => {
                const totalQuantityOfPurchasingForAllBrands =
                 Object.values(data[key].brands).reduce((a,b) => a + b.quantityPurchased, 0);
                finalReportData.push({
                    productName: key,
                    average: totalQuantityOfPurchasingForAllBrands / totalNumberOfAllOrders
                })
            }); 
            const newFileName = `0_${filePath}`
            this.reportRepository?.createReport(filePath, newFileName, finalReportData)
      } catch (error) {
        // Do some Logging 
        throw error;
      }
    }
    public createProductMostPopularBrandReport(data: IProcessedProducts, fileName: string): void {
        try {
            const finalReportData: any = [];
            Object.keys(data).forEach((key: string) => {
                const brands = data[key].brands;
                finalReportData.push({
                    productName: key,
                    mostPopularBrand: Object.keys(brands)
                    .reduce((a, b) => brands[a].noOfPurchasing > brands[b].noOfPurchasing ? a : b)
                })
            }); 
            const newFileName = `1_${fileName}`
            this.reportRepository?.createReport(fileName, newFileName, finalReportData)
        } catch (error) {
            console.log(error);
          // Do some Logging 
          throw error;
        }
    }
}