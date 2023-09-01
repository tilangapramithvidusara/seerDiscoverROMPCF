import { Box, Stack } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import * as React from 'react'

// export default function CustomColumnGenerator({columnArray}: {columnArray: any}) {



  export const columnFixed = (columnArray: any, data: any) => {
    const totalColumn =
    //  React.useMemo(
      (key?: string | number | undefined | any) => {
        return data.reduce((acc: any, curr: any) => {
          console.log('acc + curr', acc, curr[key], key);
          
          return acc + curr[key]
        }, 0)
      }
      // ,
      // [],
    // );
    const arrayValue = columnArray.length && columnArray.map((columnItem: any, index: number) => {
      let itemObjec = {
        header: columnItem?.header,
        accessorKey: columnItem?.accessorKey,
        enableGrouping: columnItem?.enableGrouping ? true : false,
        
        Cell: columnItem?.isCalcultionEnabled ? ({ cell }: { cell: any }) => {
          if (columnItem?.isCalcultionEnabled) {
          return(
            <>
              {cell.getValue()?.toLocaleString?.('en-US', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 2,
                maximumFractionDigits: 4,
              })}
            </>
          )}
        } : null,
        aggregationFn: columnItem?.aggregationFn ? columnItem?.aggregationFn : null,
        AggregatedCell: columnItem?.aggregationFn ? ({ cell, table }: { cell: any, table: any }) => {
          return(
            <>
              {/* {`${columnItem?.aggregationFn.charAt(0).toUpperCase() + columnItem?.aggregationFn.slice(1)} by `} */}
              {/* {table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header}:{' '} */}
              <Box
                sx={{ color: 'info.main', display: 'inline', fontWeight: 'bold' }}
              >
                {cell.getValue()?.toLocaleString?.('en-US', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 2,
                maximumFractionDigits: 4,
              })}
              </Box>
            </>
        )} :  null,

        Footer: columnItem?.showBottomTotal ? () => {
          if (columnItem?.showBottomTotal) {
            return(
              <Stack>
                Total:
                {/* <Box color="warning.main">{Math.round(totalColumn)}</Box> */}
                <Box color="warning.main">
                  {totalColumn(columnItem?.accessorKey)?.toLocaleString?.('en-US', {
                  style: 'currency',
                   currency: 'EUR',
                   minimumFractionDigits: 2,
                   maximumFractionDigits: 4,
                 })}
               </Box>
              </Stack>
            )
          }
          
        } :  null,

      }
      return itemObjec;
    });
    return arrayValue;
  }

  // return columnFixed(columnArray);
// }
//   const columns = React.useMemo<MRT_ColumnDef<any>[]>(
//     () => [
//       {
//         header: 'Code',
//         accessorKey: 'titleCode',
//         enableGrouping: true, //do not let this column be grouped
//       },
//       {
//         header: 'Name',
//         accessorKey: 'name',
//         enableGrouping: false, //do not let this column be grouped
//       },
//       {
//         header: 'M',
//         accessorKey: 'M',
//         Cell: ({ cell }) => {
//           console.log('cell ==> ', cell);
          
//           return(
//           <>
//             {cell.getValue<number>()?.toLocaleString?.('en-US', {
//               style: 'currency',
//               currency: 'USD',
//               minimumFractionDigits: 0,
//               maximumFractionDigits: 0,
//             })}
//           </>
//         )},
//       },
//       {
//         header: 'M/S',
//         accessorKey: 'M/S',
//         aggregationFn: 'max', //show the max age in the group (lots of pre-built aggregationFns to choose from)
//         Cell: ({ cell }) => {
//           console.log('cell ==> ', cell);
          
//           return(
//           <>
//             {cell.getValue<number>()?.toLocaleString?.('en-US', {
//               style: 'currency',
//               currency: 'USD',
//               minimumFractionDigits: 0,
//               maximumFractionDigits: 0,
//             })}
//           </>
//         )},
//         //required to render an aggregated cell
//         AggregatedCell: ({ cell, table }) => (
//           <>
//             Oldest by{' '}
//             {table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header}:{' '}
//             <Box
//               sx={{ color: 'info.main', display: 'inline', fontWeight: 'bold' }}
//             >
//               {cell.getValue<number>()}
//             </Box>
//           </>
//         ),
//         Footer: () => (
//           <Stack>
//             {/* Max Age:
//             <Box color="warning.main">{Math.round(maxAge)}</Box> */}
//           </Stack>
//         ),
//       },
//       {
//         header: 'M/S/C',
//         accessorKey: 'M/S/C',
//         Cell: ({ cell }) => {
//           console.log('cell ==> ', cell);
          
//           return(
//           <>
//             {cell.getValue<number>()?.toLocaleString?.('en-US', {
//               style: 'currency',
//               currency: 'USD',
//               minimumFractionDigits: 0,
//               maximumFractionDigits: 0,
//             })}
//           </>
//         )},
//         //optionally, customize the cell render when this column is grouped. Make the text blue and pluralize the word
//         GroupedCell: ({ cell, row }) => (
//           <Box sx={{ color: 'primary.main' }}>
//             <strong>{cell.getValue<string>()}s </strong> ({row.subRows?.length})
//           </Box>
//         ),
//       // },
//       // {
//       //   header: 'State',
//       //   accessorKey: 'state',
//       // },
//       // {
//       //   header: 'Salary',
//       //   accessorKey: 'salary',
//       //   aggregationFn: 'mean',
//       //   //required to render an aggregated cell, show the average salary in the group
//       //   AggregatedCell: ({ cell, table }) => (
//       //     <div style={{backgroundColor:'yellow'}}>
//       //       Average by{' '}
//       //       {table.getColumn(cell.row.groupingColumnId ?? '').columnDef.header}:{' '}
//       //       <Box sx={{ color: 'success.main', fontWeight: 'bold' }}>
//       //         {cell.getValue<number>()?.toLocaleString?.('en-US', {
//       //           style: 'currency',
//       //           currency: 'USD',
//       //           minimumFractionDigits: 0,
//       //           maximumFractionDigits: 0,
//       //         })}
//       //       </Box>
//       //     </div>
//       //   ),
//         //customize normal cell render on normal non-aggregated rows
//         // Cell: ({ cell }) => (
//         //   <>
//         //     {cell.getValue<number>()?.toLocaleString?.('en-US', {
//         //       style: 'currency',
//         //       currency: 'USD',
//         //       minimumFractionDigits: 0,
//         //       maximumFractionDigits: 0,
//         //     })}
//         //   </>
//         // ),
//         Footer: () => (
//           <Stack>
//             Average MSC:
//             <Box color="warning.main">
//               {averageMSC?.toLocaleString?.('en-US', {
//                 style: 'currency',
//                 currency: 'USD',
//                 minimumFractionDigits: 0,
//                 maximumFractionDigits: 0,
//               })}
//             </Box>
            
//             {/* Total Salary:
//             <Box color="warning.main">
//               {totalSalary?.toLocaleString?.('en-US', {
//                 style: 'currency',
//                 currency: 'USD',
//                 minimumFractionDigits: 0,
//                 maximumFractionDigits: 0,
//               })}
//             </Box> */}
//           </Stack>
          
//         ),
//       },
//     ],
//     [averageMSC],
//   );
//   return (
//     <div>
      
//     </div>
//   )
// }
