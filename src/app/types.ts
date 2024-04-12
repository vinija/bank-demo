interface Cell {
  value: string;
}

type SpreadsheetRow = Cell[];

interface Spreadsheet {
  title: string;
  data: SpreadsheetRow[];
}
