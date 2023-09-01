import * as React from 'react';
import { useMemo } from 'react';
import { Box, Stack } from '@mui/material';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { columnDetails, data, type Person } from '../../Constants/makeData';
import { columnFixed } from '../../Utils/CustomColumnGenerator';

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
