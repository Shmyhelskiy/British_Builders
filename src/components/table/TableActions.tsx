import Button from "../Button"
import SearchIcon from '../../assets/table/SearchIcon.svg'
import { useState } from "react";
import { useModalStore } from "../../store/useModalStore";
import useTableStore from "../../store/useTableStore";
import type { RowsPerPage } from "../../types/tableTypes";
import { useSearchModalStore } from "../../store/useSearchModalStore";

const options = [10, 20, 50];

type TableActionsProps = {
  rowCount: number;
};

const TableActions: React.FC<TableActionsProps> = ({rowCount}) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const { open } = useModalStore();
  const { openSearch } = useSearchModalStore();
  const { deleteSelectedRow, setRowsPerPage } = useTableStore();

  const handleAddRow = () => {
    open('add', null)
  };

  const handleSelectRowPerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = +e.target.value as RowsPerPage;
    setSelectedOption(value);
    setRowsPerPage(value);
  };

  return (
    <nav className="flex flex-col md:flex-row md:gap-4 justify-between text-sm md:mb-6">
      <div className="flex justify-center md:justify-start gap-2 md:gap-4 lg:gap-8 mb-4 md:mb-0" role="toolbar">
        <div className="rounded-sm bg-[#1D28FF] text-white px-1 py-1 md:px-3 md:py-2 flex items-center">
          <p>Actioned ({rowCount})</p>
        </div>
        <Button 
          className="rounded-sm px-3 py-2 bg-LavenderBlue cursor-pointer"
          onClick={handleAddRow}
        >
          Add
        </Button>
        <Button 
          className="rounded-sm px-3 py-2 bg-LavenderBlue cursor-pointer"
          onClick={() => {deleteSelectedRow()}}
        >
          Delete
        </Button>
        <Button className="rounded-sm px-3 py-2 bg-LavenderBlue cursor-pointer" disabled={true}>Preview Quotes</Button>
      </div>

      <div className="flex justify-center md:justify-start gap-2 md:gap-4 lg:gap-8" role="search">
        <Button className="rounded-sm py-1 cursor-pointer" onClick={openSearch} >
          <img src={SearchIcon} alt="Search"/>
        </Button>
        <div 
          className="rounded-sm py-2 flex gap-2 items-center"
        >
          <span>Show</span>
          <select
            name="cars"
            id="cars"
            className="rounded cursor-pointer"
            value={selectedOption}
            onChange={handleSelectRowPerPage}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <Button className="rounded-sm py-2 cursor-pointer">Preview Quotes</Button>
        <Button className="rounded-sm py-2 cursor-pointer">Preview Quotes</Button>
      </div>
    </nav>
  )
}

export default TableActions