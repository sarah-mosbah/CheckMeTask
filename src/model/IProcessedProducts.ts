export interface IProcessedProducts {
    [productName: string]: {
        totalOrders: number,
        brands: {
            [brandName: string]: { quantityPurchased: number, noOfPurchasing: number} 
        }
    }    
}