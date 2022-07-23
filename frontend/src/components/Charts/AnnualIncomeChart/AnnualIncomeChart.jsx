import React from "react";

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

function AnnualIncomeChart() {
  const dataSource = [
    // { year: "2010", income: 100000 },
    // { year: "2011", income: 105000 },
    { year: "2012", income: 100000 },
    { year: "2013", income: 309000 },
    { year: "2014", income: 400800 },
    { year: "2015", income: 754900 },
    { year: "2016", income: 210000 },
    { year: "2017", income: 839600 },
    { year: "2018", income: 700234 },
    { year: "2019", income: 543000 },
    { year: "2020", income: 234400 },
    { year: "2021", income: 432000 },
    { year: "2022", income: 332000 },
  ];

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
