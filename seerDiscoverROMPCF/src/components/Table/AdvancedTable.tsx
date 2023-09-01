import * as React from 'react';
import { useMemo } from 'react';
import { Box, Stack } from '@mui/material';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { columnDetails, data, type Person } from './makeData';
import { columnFixed } from '../../Utils/CustomColumnGenerator';
// import CustomColumnGenerator, { columnFixed } from '../../Utils/CustomColumnGenerator';

const AdvancedTable = () => {
  const averageM = useMemo(
    () => data.reduce((acc, curr) => acc + curr?.M, 0) / data.length,
    [],
  );
  const averageMS = useMemo(
    () => data.reduce((acc, curr) => acc + curr?.['M/S'], 0) / data.length,
    [],
  );

  const averageMSC = useMemo(
    () => data.reduce((acc, curr) => acc + curr['M/S/C'], 0) / data.length,
    [],
  );

  // const maxAge = useMemo(
  //   () => data.reduce((acc, curr) => Math.max(acc, curr.age), 0),
  //   [],
  // );

  // const totalSalary = useMemo(
  //   () => data.reduce((acc, curr) => acc + curr.salary, 0),
  //   [],
  // );

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => 
    columnFixed(columnDetails, data),
    // [
    //   {
    //     header: 'Code',
    //     accessorKey: 'titleCode',
    //     enableGrouping: true, //do not let this column be grouped
    //   },
    //   {
    //     header: 'Name',
    //     accessorKey: 'name',
    //     enableGrouping: false, //do not let this column be grouped
    //   },
    //   {
    //     header: 'M',
    //     accessorKey: 'M',
    //     Cell: ({ cell }) => {
    //       console.log('cell ==> ', cell);
          
    //       return(
    //       <>
    //         {(cell?.row?.original?.name !== "ANALYSIS & DESIGN" && cell?.row?.original?.name !== "OPERATION" && cell?.row?.original?.name !== "DEVELOP") && cell.getValue<number>()?.toLocaleString?.('en-US', {
    //           style: 'currency',
    //           currency: 'USD',
    //           minimumFractionDigits: 0,
    //           maximumFractionDigits: 0,
    //         })}
    //       </>
    //     )},
    //   },
    //   {
    //     header: 'M/S',
    //     accessorKey: 'M/S',
    //     aggregationFn: 'max', //show the max age in the group (lots of pre-built aggregationFns to choose from)
    //     Cell: ({ cell }) => {
    //       console.log('cell ==> ', cell);
          
    //       return(
    //       <>
    //         {(cell?.row?.original?.name !== "ANALYSIS & DESIGN" && cell?.row?.original?.name !== "OPERATION" && cell?.row?.original?.name !== "DEVELOP") && cell.getValue<number>()?.toLocaleString?.('en-US', {
    //           style: 'currency',
    //           currency: 'USD',
    //           minimumFractionDigits: 0,
    //           maximumFractionDigits: 0,
    //         })}
    //       </>
    //     )},
    //     //required to render an aggregated cell
    //     AggregatedCell: ({ cell, table }) => (
    //       <>
    //         Oldest by{' '}
    //         {table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header}:{' '}
    //         <Box
    //           sx={{ color: 'info.main', display: 'inline', fontWeight: 'bold' }}
    //         >
    //           {cell.getValue<number>()}
    //         </Box>
    //       </>
    //     ),
    //     Footer: () => (
    //       <Stack>
    //         {/* Max Age:
    //         <Box color="warning.main">{Math.round(maxAge)}</Box> */}
    //       </Stack>
    //     ),
    //   },
    //   {
    //     header: 'M/S/C',
    //     accessorKey: 'M/S/C',
    //     Cell: ({ cell }) => {
    //       console.log('cell ==> ', cell);
          
    //       return(
    //       <>
    //         {(cell?.row?.original?.name !== "ANALYSIS & DESIGN" && cell?.row?.original?.name !== "OPERATION" && cell?.row?.original?.name !== "DEVELOP") && cell.getValue<number>()?.toLocaleString?.('en-US', {
    //           style: 'currency',
    //           currency: 'USD',
    //           minimumFractionDigits: 0,
    //           maximumFractionDigits: 0,
    //         })}
    //       </>
    //     )},
    //     //optionally, customize the cell render when this column is grouped. Make the text blue and pluralize the word
    //     GroupedCell: ({ cell, row }) => (
    //       <Box sx={{ color: 'primary.main' }}>
    //         <strong>{cell.getValue<string>()}s </strong> ({row.subRows?.length})
    //       </Box>
    //     ),
    //   // },
    //   // {
    //   //   header: 'State',
    //   //   accessorKey: 'state',
    //   // },
    //   // {
    //   //   header: 'Salary',
    //   //   accessorKey: 'salary',
    //   //   aggregationFn: 'mean',
    //   //   //required to render an aggregated cell, show the average salary in the group
    //   //   AggregatedCell: ({ cell, table }) => (
    //   //     <div style={{backgroundColor:'yellow'}}>
    //   //       Average by{' '}
    //   //       {table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header}:{' '}
    //   //       <Box sx={{ color: 'success.main', fontWeight: 'bold' }}>
    //   //         {cell.getValue<number>()?.toLocaleString?.('en-US', {
    //   //           style: 'currency',
    //   //           currency: 'USD',
    //   //           minimumFractionDigits: 0,
    //   //           maximumFractionDigits: 0,
    //   //         })}
    //   //       </Box>
    //   //     </div>
    //   //   ),
    //     //customize normal cell render on normal non-aggregated rows
    //     // Cell: ({ cell }) => (
    //     //   <>
    //     //     {cell.getValue<number>()?.toLocaleString?.('en-US', {
    //     //       style: 'currency',
    //     //       currency: 'USD',
    //     //       minimumFractionDigits: 0,
    //     //       maximumFractionDigits: 0,
    //     //     })}
    //     //   </>
    //     // ),
    //     Footer: () => (
    //       <Stack>
    //         Average MSC:
    //         <Box color="warning.main">
    //           {averageMSC?.toLocaleString?.('en-US', {
    //             style: 'currency',
    //             currency: 'USD',
    //             minimumFractionDigits: 0,
    //             maximumFractionDigits: 0,
    //           })}
    //         </Box>
            
    //         {/* Total Salary:
    //         <Box color="warning.main">
    //           {totalSalary?.toLocaleString?.('en-US', {
    //             style: 'currency',
    //             currency: 'USD',
    //             minimumFractionDigits: 0,
    //             maximumFractionDigits: 0,
    //           })}
    //         </Box> */}
    //       </Stack>
          
    //     ),
    //   },
    // ],
    [],
  );

  console.log('cocococococ ===> ', columns);
  

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableColumnResizing
      enableGrouping
      enableStickyHeader
      enableStickyFooter
      initialState={{
        density: 'compact',
        expanded: true, //expand all groups by default   'M', "M/S", "M/S/C", 
        grouping: ['nameCategory'], //an array of columns to group by by default (can be multiple)
        pagination: { pageIndex: 0, pageSize: 10 },
        // sorting: [{ id: 'state', desc: false }, { id: 'state', desc: false }], //sort by state by default
      }}
      // pageSizeOptions={[5, 10]}
      muiToolbarAlertBannerChipProps={{ color: 'primary' }}
      muiTableContainerProps={{ sx: { maxHeight: 700 } }}
    />
  );
};

export default AdvancedTable;
