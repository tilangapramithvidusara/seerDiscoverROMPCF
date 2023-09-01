import * as React from 'react';
interface RowData {
  name: string;
  // Other data properties...
}
interface TableRowProps {
  rowData?: RowData | any;
  title?: string;
  isTitleRow?: boolean;
  isAverageRow?: boolean;
  isHeader?: boolean;
  column?: string[];
}

const TableRow: React.FC<TableRowProps> = ({ rowData, isTitleRow, isAverageRow, title, isHeader, column }) => {

  const rowStyle = {
    fontWeight: isTitleRow ? 'bold' : 'normal',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    // flexDirection: 'row'
    // Add other row-wide styles here
  };

  const rowLineStyle = {
    borderLeft: '2px solid #ddd',
    borderRight: '2px solid #ddd',
    width: 100
  }

  return (
    <div 
    // className={`table-row ${isTitleRow ? 'title-row' : ''}`} 
    style={rowStyle}>
      <tr>
      {/* <span>{title}</span> */}
      {isHeader ? (
        <>
          {column?.map((item, index) => (
            <th className={index == 0 ? "location-cell" : "name-cell"} key={index}>{item}</th>
          ))}
        </>
      ) : isTitleRow ? (
        <tr>
          {/* <span>#####{rowData?.title}#####</span> */}
          {/* <span></span> */}
          <span>{title}</span>
          <span></span>
          <span></span>
          <span></span>
        </tr>
      ) : isAverageRow ? (
        <tr>
          {/* <td><span className="name-cell">{rowData.titleCode}</span></td> */}
          <td><span className="location-cell">{rowData.name}</span></td>
          <td><span className="name-cell">{rowData.M}</span></td>
          <td><span className="name-cell">{rowData['M/S']}</span></td>
          <td><span className="name-cell">{rowData['M/S/C']}</span></td>
        </tr>
      ) : (
        <tr>
          {/* <td><span className="name-cell">{rowData.titleCode}</span></td> */}
          <td><span className="location-cell">{rowData.name}</span></td>
          <td><span className="name-cell">{rowData.M}</span></td>
          <td><span className="name-cell">{rowData['M/S']}</span></td>
          <td><span className="name-cell">{rowData['M/S/C']}</span></td>
        </tr>
      )}
      </tr>
    </div>
  );
};

export default TableRow;
