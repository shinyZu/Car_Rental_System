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

function WeeklyIncomeChart() {
  const [year, setYear] = useState("2021");
  const [month, setMonth] = useState("June");

  const [dataSource, setDataSource] = useState([
    // { week: "01", income: 10000 },
    // { week: "02", income: 10500 },
    // { week: "03", income: 45000 },
    // { week: "04", income: 30900 },
    // { week: "05", income: 0 },
    // { week: "06", income: 0 },
  ]);

  useEffect(() => {
    getWeeklyIncome();
  }, []);

  function formatDate(date) {
    return new Date(date).toISOString().split("T")[0];
  }

  async function getWeeklyIncome() {
    // let res = await IncomeService.calculateWeeklyIncome(formatDate(new Date()));
    let res = await IncomeService.calculateWeeklyIncome("2022-07-30");
    console.log(res.data.data);
    if (res.status === 200) {
      let incomeData = res.data.data;
      // console.log(incomeData);

      setMonth(res.data.data[0].month);
      setYear(res.data.data[0].year);

      // incomeData.reverse();
      // let data = {};

      for (let obj of incomeData) {
        let data = { week: "0" + obj.week, income: obj.income };
        console.log(data);
        setDataSource((prev) => {
          return [...prev, data];
        });
      }
    }
  }

  return (
    <>
      <Chart id="chart" palette="Soft" dataSource={dataSource}>
        <Size height={300} width={600} />
        <CommonSeriesSettings
          argumentField="week"
          valueField="income"
          type="bar"
          ignoreEmptyPoints={true}
          barPadding={0.4}
        >
          {/* <Format type="hundreds" /> */}
        </CommonSeriesSettings>
        <SeriesTemplate nameField="week" />
        <Title text="Weekly Income" subtitle={`as of ${month} ${year}`} />
        <Tooltip enabled={true} />
      </Chart>
    </>
  );
}

export default WeeklyIncomeChart;
