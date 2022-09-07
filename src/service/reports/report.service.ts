import { IProcessedProducts } from "../../model/IProcessedProducts";
import { IReportRepository } from "../../repository/IReportRepositoty";
import { ReportRepository } from "../../repository/report.repository";
import { IReportService } from "./IReport.service";


export class ReportService implements IReportService {
/*

    list the product Name. The second column
    should contain the average quantity of the product purchased per order.

*/
    constructor(private reportRepository?: IReportRepository) {
      this.reportRepository = reportRepository || new ReportRepository();
    }
// list the product Name. The second column
// should be the most popular Brand for that product. Most popular is defined as the brand
// with the most total orders for the item, not the quantity purchased. If two or more brands
// have the same popularity for a product, include any one.

/*
    shoes: {
        brand: {
            "Air": 2, --> Number of Orders Not Quantity
            "BonPeid": 1
        }
    }

    shoes: {totalamount: 0, brand: {
        brandName:  {quantityPurchased: quantityPurchased+ current, noOfPurchasing++}
    }

*/
// let amount =5;
// 
/*
 shoes -> totalamount: 1, 
 mostPopularBrand: Math.max(...array.map(o => o.y)) || Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
*/

     public createProductAverageSalesByOrderReport(data: IProcessedProducts, filePath: string): void {
      try {
       
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