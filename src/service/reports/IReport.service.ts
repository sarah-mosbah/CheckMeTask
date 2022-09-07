import { IProcessedProducts } from "../../model/IProcessedProducts";

export interface IReportService {
    createProductAverageSalesByOrderReport(data: IProcessedProducts, filename: string): void;
    createProductMostPopularBrandReport(data: IProcessedProducts, filename: string): void;
}

