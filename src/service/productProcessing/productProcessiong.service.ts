import { IProcessedProducts } from "../../model/IProcessedProducts";
import { IProduct } from "../../model/IProduct";

export interface IDataProcessingService {
    createProductReportData(processedData: IProcessedProducts, product: IProduct): IProcessedProducts;
}