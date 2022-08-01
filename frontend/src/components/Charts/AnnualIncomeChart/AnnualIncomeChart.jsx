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
  // const dataSource = [
  //   { year: "2012", income: 100000 },
  //   { year: "2013", income: 309000 },
  //   { year: "2014", income: 400800 },
  //   { year: "2015", income: 754900 },
  //   { year: "2016", income: 210000 },
  //   { year: "2017", income: 839600 },
  //   { year: "2018", income: 700234 },
  //   { year: "2019", income: 543000 },
  //   { year: "2020", income: 234400 },
  //   { year: "2021", income: 432000 },
  //   { year: "2022", income: 332000 },
  // ];
  const [dataSource, setDataSource] = useState([
    { year: "2012", income: 10000 },
    { year: "2013", income: 22000 },
    { year: "2014", income: 33000 },
    { year: "2015", income: 20000 },
    { year: "2016", income: 15000 },
    { year: "2017", income: 34000 },
    { year: "2018", income: 44000 },
    { year: "2019", income: 55000 },
    { year: "2020", income: 23440 },
    // { year: "2021", income: 432000 },
    // { year: "2022", income: 332000 },
  ]);

  useEffect(() => {
    getAnnualIncome();
  }, []);

  async function getAnnualIncome() {
    let res = await IncomeService.calculateAnnualIncome();
    console.log(res.data.data);
    if (res.status === 200) {
      let incomeData = res.data.data;
      let data = {};
      // incomeData.map((obj, index) => {
      //   console.log(obj.year);
      //   data = { year: obj.year, income: obj.income };
      //   setDataSource(() => {
      //     return [...dataSource, data];
      //   });
      // });
      for (let obj of incomeData) {
        console.log(obj.year);
        data = { year: obj.year, income: obj.income };
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
