import * as React from "react";
import TableComponent from './components/Table/App';
import CustomTable from "./components/CustomComponents/CustomTable";
import { DataSet } from "./Constants/SampleData";
import AdvancedTable from "./components/Table/AdvancedTable";



export default function App({tableContent}: {tableContent: any}) {
  console.log("MMM2222");
  return (
    <div>
      {/* <CustomTable data={DataSet} /> */}
      <AdvancedTable/>
      {/* <TableComponent/> */}

    </div>
  )
}
