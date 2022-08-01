import React, { useEffect, useState } from "react";

import {
  Chart,
  SeriesTemplate,
  CommonSeriesSettings,
  Title,
  Tooltip,
  Format,
  Label,
  Connector,
  Size,
} from "devextreme-react/chart";
import IncomeService from "../../../services/IncomeService";

function MonthlyIncomeChart() {
  const [year, setYear] = useState("2021");

  const [dataSource, setDataSource] = useState([
    { month: "Jan", income: 0 },
    { month: "Feb", income: 0 },
    { month: "Mar", income: 0 },
    { month: "Apr", income: 0 },
    { month: "May", income: 0 },
    { month: "Jun", income: 0 },
    // { month: "Jul", income: 0 },
    // { month: "Aug", income: 0 },
    // { month: "Sep", income: 70023 },
    // { month: "Oct", income: 83960 },
    // { month: "Nov", income: 75490 },
    // { month: "Dec", income: 40080 },
  ]);

  useEffect(() => {
    setYear(new Date().getFullYear());
    getMonthlyIncome();
  }, []);

  async function getMonthlyIncome() {
    let res = await IncomeService.calculateMonthlyIncome();
    // console.log(res.data.data);
    if (res.status === 200) {
      let incomeData = res.data.data;
      let data = {};
      for (let obj of incomeData) {
        if (obj.year == new Date().getFullYear()) {
          data = { month: obj.month.substring(0, 3), income: obj.income };
          console.log(data);
          setDataSource((prev) => {
            return [...prev, data];
          });
        }
      }
    }
  }

  return (
    <>
      <Chart id="chart" palette="Soft" dataSource={dataSource}>
        <Size height={300} width={600} />
        <CommonSeriesSettings
          argumentField="month"
          valueField="income"
          type="bar"
          ignoreEmptyPoints={true}
          barPadding={0.4}
        />
        <SeriesTemplate nameField="month" />
        <Title text="Monthly Income" subtitle={`in 'Rs' as of year ${year}`} />
        <Tooltip
          enabled={true}
          //   horizontalAlignment="center"
          //   verticalAlignment="center"
        >
          {/* <Format type="millions" /> */}
        </Tooltip>
      </Chart>
    </>
  );
}

export default MonthlyIncomeChart;
