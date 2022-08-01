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

function AnnualIncomeChart() {
  const [dataSource, setDataSource] = useState([
    { year: "2012", income: 0 },
    { year: "2013", income: 0 },
    { year: "2014", income: 0 },
    { year: "2015", income: 0 },
    { year: "2016", income: 0 },
    { year: "2017", income: 0 },
    { year: "2018", income: 0 },
    { year: "2019", income: 0 },
    { year: "2020", income: 0 },
  ]);

  useEffect(() => {
    getAnnualIncome();
  }, []);

  async function getAnnualIncome() {
    let res = await IncomeService.calculateAnnualIncome();
    // console.log(res.data.data);
    if (res.status === 200) {
      let incomeData = res.data.data;
      let data = {};
      for (let obj of incomeData) {
        // console.log(obj.year);
        data = { year: obj.year, income: obj.income };
        // console.log(data);
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
          argumentField="year"
          valueField="income"
          type="bar"
          ignoreEmptyPoints={true}
          barPadding={0.4}
        />
        <SeriesTemplate nameField="year" />
        <Title text="Annual Income" subtitle="as of past 10 years" />
        <Tooltip enabled={true} />
      </Chart>
    </>
  );
}

export default AnnualIncomeChart;
