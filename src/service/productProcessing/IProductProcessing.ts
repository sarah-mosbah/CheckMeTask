import { IProcessedProducts } from "../../model/IProcessedProducts";
import { IProduct } from "../../model/IProduct";
import { IDataProcessingService } from "./productProcessiong.service";

export class DataProcessingService implements IDataProcessingService {
    public createProductReportData(processedData: IProcessedProducts, product: IProduct): IProcessedProducts {
        if(processedData[product.Name]) {
            const processedProduct = processedData[product.Name]
            processedProduct.totalOrders++;
            if(processedProduct.brands[product.Brand]) {
                processedProduct.brands[product.Brand].noOfPurchasing++;
                processedProduct.brands[product.Brand].quantityPurchased+= product.Quantity;
            } else {
                processedProduct.brands[product.Brand] ={ quantityPurchased: product.Quantity, noOfPurchasing: 1}
            }
        } else {
            processedData[product.Name] = {
                totalOrders: 1,
                brands: {
                    [product.Brand]: {quantityPurchased: product.Quantity, noOfPurchasing: 1}
                }
            }
        }

        return processedData;
    }

}