import express, { Router } from "express";
import multer from 'multer';
import ProductHandler from "../handler/product.handler";

export class ProductRoutes {
    private static instance: ProductRoutes;
    private handler = new ProductHandler();
    public router: Router = express.Router();
    public upload = multer({ dest: 'temp/csv/' })

    constructor() {
      if(ProductRoutes.instance) {
        return ProductRoutes.instance;
      }
      ProductRoutes.instance = this;
      this.registerRoutes();
    }
    public registerRoutes(): void {
      this.router.post('/upload-csv', this.upload.single('file'), this.handler.uploadCsvFileToServer.bind(this.handler));
    }
}