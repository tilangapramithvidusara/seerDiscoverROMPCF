import * as React from 'react';
import { useState } from 'react';
import TableSection from './TableSection';
import Filter from './Filter';
import Pagination from './Pagination';
import TableRow from './TableRow';
import { columnData } from '../../Constants/ColumnData';
import ReactPaginate from 'react-paginate';

interface RowData {
  name: string;
  // Other data properties...
}

interface SectionData {
  title: string;
  rows: RowData[];
  averageRow: RowData;
}

interface CustomTableProps {
  data: SectionData[] | any;
}

const CustomTable: React.FC<CustomTableProps> = ({ data }) => {
  const [filteredData, setFilteredData] = useState<SectionData[] | any>(data);
  const [currentPage, setCurrentPage] = useState<number>(1);


  const itemsPerPage = 1;

  // Apply filters and pagination
  // ...
  console.log('PPPPPP', filteredData);

  const tableStyle = {
    border: '1px solid #ddd',
    width: '100%',
    padding: '10px',
    // Add other table-wide styles here
  };

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected);
  };

  React.useMemo(() => {
    const offset = currentPage * itemsPerPage;
    const currentPageData = data.slice(offset, offset + itemsPerPage);
    console.log('....',currentPageData);
    
    setFilteredData(currentPageData)
  }, [currentPage])
  // const offset = currentPage * itemsPerPage;
  // const currentPageData = data.slice(offset, offset + itemsPerPage);
  // console.log('....',currentPageData);
  
  // setFilteredData(currentPageData)

  
  return (
    <div 
    // className="table" style={tableStyle}
    >
      {/* <Filter setFilteredData={setFilteredData} data={data} /> */}
      <table className="custom-table">
        <thead>
          <TableRow isHeader={true} column={columnData}/>
        </thead>
      {filteredData.map((sectionData: any, index: number) => (
        <tbody>
          <TableSection key={index} sectionData={sectionData} />
        </tbody>
      ))}
      </table>
      {/* <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / itemsPerPage)}
        setCurrentPage={setCurrentPage}
      /> */}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={Math.ceil(data.length / itemsPerPage)}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
      
    </div>
  );
};

export default CustomTable;
