import type { TableData } from "../../types/tableTypes";
import { formatCurrency } from "../../utils/formatCurrency";
import EditIcon from '../../assets/table/EditIcon.svg'
import { useState } from "react";
import { useModalStore } from "../../store/useModalStore";
import useTableStore from "../../store/useTableStore";
import clsx from "clsx";

type TableRowProps = {
  data: TableData;
  count: number;
}

const TableRow: React.FC<TableRowProps> = ({data, count}) => {
  const {id, quote, date, customer, siteDelivery, numberOfQuotes, subTotal, vat, total, deposit, outstanding, profit, email, description, customerJobRef} = data;

  const [isSelected, setIsSelected] = useState(false); 

  const { open } = useModalStore();
  const { toggleSelectId } = useTableStore();

  const rowBgColor = count % 2 === 0 ? 'bg-[#EFEFEF]' : '';  
  
  const handleSubmit = () => {
    const preparedData  = {
      customer,
      siteDelivery,
      email,
      description,
    }
      open('edit', preparedData, id);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(event.target.checked);
    toggleSelectId(id);
  }

  return (
      <tr className={clsx("flex items-center", rowBgColor)}>
        <td className="px-3 py-1 w-[2%] flex items-center justify-center">
          <input type="checkbox" 
          className='h-4 w-4 cursor-pointer'
          checked={isSelected} 
          onChange={handleSelect}
          />
        </td>
        <td className="px-3 py-1 w-[2%] flex items-center justify-start font-bold text-xl">
          {count}.
        </td>
        <td className="px-3 py-1 w-[6%] flex items-center justify-start truncate">
          {quote}
        </td>
        <td className="px-3 py-1 w-[6%] flex items-center justify-start">
          {date}
        </td>
        <td className="px-3 py-1 w-[9%] flex items-center justify-start whitespace-normal">
          {customer}
        </td>
        <td className="px-3 py-1 w-[10%] flex items-center justify-start whitespace-normal">
          {siteDelivery}
        </td>
        <td className="px-3 py-1 w-[3%] flex items-center justify-center">
          {numberOfQuotes}
        </td>
        <td className="px-3 py-1 w-[6%] flex items-center justify-center">
          {formatCurrency(subTotal)}
        </td>
        <td className="px-3 py-1 w-[4%] flex items-center justify-end">
          {formatCurrency(vat)}
        </td>
        <td className="px-3 py-1 w-[6%] flex items-center justify-end">
          {formatCurrency(total)}
        </td>
        <td className="px-3 py-1 w-[5%] flex items-center justify-end">
          {formatCurrency(deposit)}
        </td>
        <td className="px-3 py-1 w-[6%] flex items-center justify-end">
          {formatCurrency(outstanding)}
        </td>
        <td className="px-3 py-1 w-[6%] flex items-center justify-end">
          {formatCurrency(profit)}
        </td>
        <td className="px-3 py-1 w-[10%] flex items-center justify-start break-all ">
          {email}
        </td>
        <td className="px-3 py-1 w-[12%] flex items-center justify-start break-all">
          {description}
        </td>
        <td className="px-3 py-1 w-[6%] flex items-center justify-start">
          {customerJobRef}
        </td>
        <td>
          <button 
            className="cursor-pointer w-6 h-6 mr-2"
            onClick={handleSubmit}
          >
            <img src={EditIcon} alt="Edit" />
          </button>
        </td>
      </tr>

  )
}

export default TableRow