import useTableStore from "../../store/useTableStore";
import SearchModal from "./SearchModal";
import ModalForm from "./ModalForm";
import Table from "./Table";
import TableActions from "./TableActions"


const TableContainer = () => {
  const tableData = useTableStore((state) => state.TableData);

  return (
    <section className="mt-6">
      <TableActions rowCount={tableData.length}/>
      <Table tableData={tableData} />
      <ModalForm />
      <SearchModal  />
    </section>
  )
}

export default TableContainer