import * as React from 'react';
import TableRow from './TableRow';
import { columnData } from '../../Constants/ColumnData';

interface RowData {
  name: string;
  // Other data properties...
}

interface SectionData {
  title: string;
  rows: RowData[];
  averageRow: RowData;
}
interface TableSectionProps {
  sectionData: SectionData;
}

const TableSection: React.FC<TableSectionProps> = ({ sectionData }) => {
  const { title, rows, averageRow } = sectionData;

  console.log("title==> ", title, rows, averageRow);
  const sectionStyle = {
    backgroundColor: '#f2f2f2',
    padding: '10px',
    // Add other section-wide styles here
  };  

  return (
    <div 
    // style={sectionStyle}
    >
      {title && (
        <TableRow isTitleRow={true} title={title} />
      )}
      {rows && rows?.length && rows?.map((rowData: any, index: number) => (
        <TableRow key={index} rowData={rowData} />
      ))}
      {averageRow && (
        <TableRow isAverageRow={true} rowData={averageRow} />
      )}
      
    </div>
  );
};

export default TableSection;
