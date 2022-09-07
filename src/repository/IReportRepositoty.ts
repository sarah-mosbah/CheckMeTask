export interface IReportRepository {
    createReport(folderName: string, filename: string, data: any[]): void
}