import React, { useState } from "react";

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

function WeeklyIncomeChart() {
  const [year, setYear] = useState("2022");
  const [month, setMonth] = useState("July");

  const dataSource = [
    { week: "01", income: 100000 },
    { week: "02", income: 105000 },
    { week: "03", income: 450000 },
    { week: "04", income: 309000 },
    { week: "05", income: 0 },
    { week: "06", income: 0 },
  ];

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
