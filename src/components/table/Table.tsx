import { useMemo } from 'react';
import checkbox from '../../assets/table/checkbox.svg'
import NomberIcon from '../../assets/table/NomberIcon.svg'
import { usePagination } from '../../hooks/usePagination';
import { useSearchModalStore } from '../../store/useSearchModalStore';
import useTableStore from '../../store/useTableStore';
import type { TableData } from '../../types/tableTypes';
import { calculateTotal } from '../../utils/calculateTotal';
import { formatCurrency } from '../../utils/formatCurrency';
import PaginationControls from './PaginationControls';
import TableRow from './TableRow';

type TableProps = {
  tableData: TableData[];
};

const Table: React.FC<TableProps> = ({tableData}) => {
  
  const { rowsPerPage } = useTableStore();
  const {searchParams} = useSearchModalStore();

  const {
    paginatedData,
    currentPage,
    totalPages,
    paginationRange,
    totalItems,
    goToPage,
    nextPage,
    prevPage
  } = usePagination(tableData, rowsPerPage);

  const filteredData = useMemo(() => {
    if (!searchParams) return paginatedData;
    if (!searchParams.trim()) return paginatedData;

    const lowerSearch = searchParams.toLowerCase();

    return paginatedData.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(lowerSearch)
      )
    );
  }, [paginatedData, searchParams]);

  const pageSubTotal = calculateTotal(filteredData, 'subTotal');
  const pageVatTotal = calculateTotal(filteredData, 'vat');
  const pageTotalAmount = calculateTotal(filteredData, 'total');
  const pageDepositTotal = calculateTotal(filteredData, 'deposit');
  const pageOutstandingTotal = calculateTotal(filteredData, 'outstanding');
  const pageProfitTotal = calculateTotal(filteredData, 'profit');

  
  return (
    <div className="w-full overflow-x-auto">
      <table className='w-full min-w-[1200px]'>
        <thead className='text-base'>
          <tr className='flex gap-3 py-4'>
            <th className="px-3 py-4 w-[2%] flex items-center justify-center">
              <img src={checkbox} alt='checkbox' width={18}  height={18}/>
            </th>
            <th className="w-[2%] flex items-center justify-center">
              <img src={NomberIcon} alt='Nomber' width={29} height={18} />
            </th>
            <th className="px-3 py-4 w-[6%] flex items-center">Quote</th>
            <th className="px-3 py-4 w-[6%] flex items-center">Date</th>
            <th className="px-3 py-4 w-[9%] flex items-center">Customer</th>
            <th className="px-3 py-4 w-[10%] flex items-center">Site/Delivery</th>
            <th className="px-3 py-4 w-[8%] flex items-center">No. Quotes</th>
            <th className="px-3 py-4 w-[8%] flex items-center">Sub Total</th>
            <th className="px-3 py-4 w-[4%] flex items-center">VAT</th>
            <th className="px-3 py-4 w-[6%] flex items-center">Total</th>
            <th className="px-3 py-4 w-[5%] flex items-center">Deposit</th>
            <th className="px-3 py-4 w-[6%] flex items-center">Outstanding</th>
            <th className="px-3 py-4 w-[6%] flex items-center">Profit</th>
            <th className="px-3 py-4 w-[12%] flex items-center">Email</th>
            <th className="px-3 py-4 w-[12%] flex items-center">Description</th>
            <th className="px-3 py-4 w-[6%] flex items-center">Customer Job Ref</th>
            <th className="px-3 py-4 w-[2%]"></th>
            <th className="px-3 py-4 w-[2%]"></th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((row, index) => {
            return <TableRow data={row} key={row.id} count={index + 1} />
          })}
        </tbody>

        <tfoot className="text-sm font-semibold bg-gray-100 border-t-2 border-gray-300">
          <tr className="flex gap-2.5 py-3">
            <td className={`px-3 py-2 w-1/2 flex items-center text-lg`}>
              Page Sub Total:
            </td>

            <td className="px-3 py-2 w-[8%] flex items-center">
              {formatCurrency(pageSubTotal)}
            </td>
            <td className="px-3 py-2 w-[4%] flex items-center">
              {formatCurrency(pageVatTotal)}
            </td>
            <td className="px-3 py-2 w-[6%] flex items-center">
              {formatCurrency(pageTotalAmount)}
            </td>
            <td className="px-3 py-2 w-[5%] flex items-center">
              {formatCurrency(pageDepositTotal)}
            </td>
            <td className="px-3 py-2 w-[6%] flex items-center">
              {formatCurrency(pageOutstandingTotal)}
            </td>
            <td className="px-3 py-2 w-[6%] flex items-center">
              {formatCurrency(pageProfitTotal)}
            </td>
            <td className="px-3 py-2 w-[12%]"></td>
            <td className="px-3 py-2 w-[12%]"></td>
            <td className="px-3 py-2 w-[6%]"></td>
            <td className="px-3 py-2 w-[2%]"></td>
            <td className="px-3 py-2 w-[2%]"></td>
          </tr>
        </tfoot>
      </table>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
        nextPage={nextPage}
        prevPage={prevPage}
        paginationRange={paginationRange}
        totalItems={totalItems}
      />
    </div>
  )
}

export default Table