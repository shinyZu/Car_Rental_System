import React, { useState } from "react";

import PieChart, {
  Legend,
  Series,
  Tooltip,
  Format,
  Label,
  Connector,
  Export,
  Size,
} from "devextreme-react/pie-chart";

function DriverStatusChart(props) {
  const [driverCount, setDrivercount] = useState({
    totalCount: 15,
    availableCount: 12,
    occupiedCount: 4,
  });

  const driverData = [
    { region: "Total", val: driverCount.totalCount },
    { region: "Available", val: driverCount.availableCount },
    { region: "Occupied", val: driverCount.occupiedCount },
  ];

  return (
    <PieChart
      id="carChart"
      type="doughnut"
      title="Driver Status"
      //   palette="Harmony Light"
      palette="Soft Pastel"
      //   palette="Violet"
      dataSource={driverData}
    >
      <Size height={300} width={300} />
      <Series argumentField="region">
        <Label visible={true}>
          <Connector visible={true} />
        </Label>
      </Series>
      <Legend
        margin={0}
        horizontalAlignment="center"
        verticalAlignment="center"
      />
      <Tooltip
        enabled={true}
        horizontalAlignment="center"
        verticalAlignment="center"
      >
        {/* <Format type="millions" /> */}
      </Tooltip>
      {/* <Export enabled={true}  /> */}
    </PieChart>
  );
}
export default DriverStatusChart;
