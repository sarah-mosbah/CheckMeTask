import express, { Router } from "express";
import multer from 'multer';
import ProductHandler from "../handler/product.handler";

export class ProductRoutes {
    private static instance: ProductRoutes;
    private handler = new ProductHandler();

    public router: Router = express.Router();
    public upload = multer({ dest: 'temp/csv/' });
    constructor() {
0
    }

    protected registerRoutes(): void {
        this.router.post('/upload-csv', this.upload.single('file'), this.handler.uploadCsvFileToServer);
    }

}