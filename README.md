# CheckMeTask


## Project Setup:
1- create .env file in main root of the repository with following variables: 
- HOST: machine host
- PORT: required port

2- run npm i

3- run npm start

## Endpoints:

-  POST: /api/products/upload-csv: 
   body: {
     file: File
   } as FormData

NB: Results should be appear in folder called reports-result!

Missing Points: 
- Validations on file type and content are missing
- Unit Tests