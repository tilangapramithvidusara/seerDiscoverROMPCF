import * as React from "react";
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import CustomTable from "./CustomTable";
import TableWithTotal from "./TableWithCalculation";
import AdvancedTable from "./AdvancedTable";


const App = () => { 

  const items: TabsProps['items'] = [
    // {
    //   key: '1',
    //   label: 'Tab 1',
    //   children: <CustomTable/>,
    // },
    // {
    //   key: '2',
    //   label: 'Tab 2',
    //   children: <TableWithTotal/>,
    // },
    {
      key: '3',
      label: 'Tab 3',
      children: <AdvancedTable/>,
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <>
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  )
}

export default App