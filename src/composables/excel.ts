import * as XLSX from 'xlsx';

export type ExcelData<T = unknown> = {
  header: string[];
  data: Array<Array<unknown>>;
  result: T[];
  meta: {
    sheetName: string;
  };
};

export function useExcel() {
  function fileParse(file: File) {
    return new Promise<ExcelData[]>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const data = event.target && event.target.result;
          const workbook = XLSX.read(data, { type: 'array' });
          resolve(excelParse(workbook));
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }

  function excelParse(workbook: XLSX.WorkBook): ExcelData[] {
    const excelData: ExcelData[] = [];
    for (const sheetName of workbook.SheetNames) {
      const worksheet = workbook.Sheets[sheetName];
      const header: string[] = getHeader(worksheet);
      const data: Array<Array<unknown>> = [];
      const result = XLSX.utils.sheet_to_json(worksheet) as Array<Record<string, unknown>>;
      result.forEach((row) => {
        const arr = [];
        for (const key in row) {
          arr.push(row[key]);
        }
        data.push(arr);
      });
      excelData.push({
        header,
        data,
        result,
        meta: { sheetName }
      });
    }
    return excelData;
  }

  function getHeader(worksheet: XLSX.WorkSheet) {
    if (!worksheet || !worksheet['!ref']) return [];
    const header: string[] = [];
    const range: XLSX.Range = XLSX.utils.decode_range(worksheet['!ref']);
    const R = range.s.r;
    for (let C = range.s.c; C <= range.e.c; C++) {
      const cell: XLSX.CellObject = worksheet[XLSX.utils.encode_cell({ r: R, c: C })];
      let title = cell.v ? cell.v.toString() : '';
      if (cell.t) title = XLSX.utils.format_cell(cell);
      header.push(title);
    }
    return header;
  }

  return { fileParse };
}
