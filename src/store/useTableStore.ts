import { create } from 'zustand'
import mockTableData from '../data/tableData'
import type { RowsPerPage, TableData } from '../types/tableTypes'
import { createDate, incrementQuoteNumber } from '../utils/formatCurrency';
import type { MyFormData } from '../types/modalTypes';


interface TableStore {
  TableData: TableData[];
  selectedIds: number[];
  rowsPerPage: RowsPerPage;
  addRow: (formData: Partial<MyFormData>) => void;
  editRow: (formData: Partial<MyFormData>, id: number) => void;
  toggleSelectId: (id: number) => void;
  deleteSelectedRow: () => void;
  setRowsPerPage: (value: RowsPerPage) => void;
}


const useTableStore = create<TableStore>((set) => ({
  TableData: mockTableData,
  selectedIds: [],
  rowsPerPage: 10,
  addRow: (formData) => set((state) => {
    const lastItem = state.TableData[state.TableData.length - 1];
    const lastId = lastItem ? Number(lastItem.id) : 0;

    const newQuote = incrementQuoteNumber(lastItem.quote);

    const newRow: TableData = {
      id: lastId + 1,
      quote: newQuote,
      date: createDate(),
      numberOfQuotes: 0,
      subTotal: 0,
      vat: 0,
      total: 0,
      deposit: 0,
      outstanding: 0,
      profit: 0,
      customer: formData.customer || '',
      siteDelivery: formData.siteDelivery || '',
      email: formData.email || '',
      description: formData.description || '',
      customerJobRef: '',
    };

    return {
      TableData: [...state.TableData, newRow],
    };
  }),

  editRow: (formData, id) => set((state) => {
    const updatedTableData = state.TableData.map((item) => {
      if (item.id === id) {
        return { ...item, ...formData };
      }
      return item;
    });

    return {
      TableData: updatedTableData,
    };
  }),

  toggleSelectId: (id) => set((state) => {
    const alreadySelected = state.selectedIds.includes(id);
    return {
      selectedIds: alreadySelected
        ? state.selectedIds.filter((item) => item !== id)
        : [...state.selectedIds, id],
    };
  }),

  deleteSelectedRow: () => set((state) => {
    const filteredTableData = state.TableData.filter((item) => !state.selectedIds.includes(item.id));

    return {
      TableData: filteredTableData,
      selectedIds: [],
    };
  }),

  setRowsPerPage: (value) => set({ rowsPerPage: value })
}))

export default useTableStore;