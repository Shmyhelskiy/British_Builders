export interface TableData {
  id: number;
  quote: string;
  date: string;
  customer: string;
  siteDelivery: string;
  numberOfQuotes: number;
  subTotal: number;
  vat: number;
  total: number;
  deposit: number;
  outstanding: number;
  profit: number;
  email: string;
  description: string;
  customerJobRef: string;
}

export type RowsPerPage = 10 | 20 | 50;