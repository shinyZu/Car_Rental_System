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

function CarStatusChart(props) {
  const [carCount, setCarcount] = useState({
    availableCount: 12,
    reservedCount: 10,
    need_maintCount: 2,
    under_maintCount: 3,
  });

  const carData = [
    { region: "Available", val: carCount.availableCount },
    { region: "Reserved", val: carCount.reservedCount },
    { region: "Need Maintenance", val: carCount.need_maintCount },
    { region: "Under Maintenance", val: carCount.under_maintCount },
  ];

  return (
    <PieChart
      id="carChart"
      type="doughnut"
      title="Current Status of Cars"
      palette="Harmony Light"
      //   palette="Soft Pastel"
      //   palette="Violet"
      dataSource={carData}
    >
      <Size height={400} width={700} />
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
        <Format type="number" />
      </Tooltip>
      {/* <Export enabled={true}  /> */}
    </PieChart>
  );
}
export default CarStatusChart;
