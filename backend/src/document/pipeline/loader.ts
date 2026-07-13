import PdfParse from "pdf-parse";

export const loadPDF=async(buffer:Buffer):Promise<string>=>{
    const data=await PdfParse(buffer);
    return data.text;
}