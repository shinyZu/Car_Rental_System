import React, { useEffect, useState } from "react";

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
import DriverService from "../../../services/DriverService";

function DriverStatusChart(props) {
  // const [driverCount, setDrivercount] = useState({
  //   totalCount: 15,
  //   availableCount: 12,
  //   occupiedCount: 4,
  // });

  const [driverCount, setDrivercount] = useState({});

  const driverData = [
    { region: "Total", val: driverCount.totalCount },
    { region: "Available", val: driverCount.availableCount },
    { region: "Occupied", val: driverCount.occupiedCount },
  ];

  useEffect(() => {
    getNoOfDriversByStatus();
  }, []);

  async function getAvailableDriverCount() {
    let res = await DriverService.getNoOfDriversByStatus("Available");
    if (res.status === 200) {
      let count = { availableCount: res.data.data };
      setDrivercount((driverCount) => ({
        ...driverCount,
        ...count,
      }));
    }
  }

  async function getOccupiedDriverCount() {
    let res = await DriverService.getNoOfDriversByStatus("Occupied");
    if (res.status === 200) {
      let count = { occupiedCount: res.data.data };
      setDrivercount((driverCount) => ({
        ...driverCount,
        ...count,
      }));
    }
  }

  function getTotalDriverCount() {
    let total = driverCount.availableCount + driverCount.occupiedCount;
    let count = { totalCount: total };
    setDrivercount((driverCount) => ({
      ...driverCount,
      ...count,
    }));
  }

  function getNoOfDriversByStatus() {
    getAvailableDriverCount();
    getOccupiedDriverCount();
    // getTotalDriverCount();

    console.log(driverCount);
  }

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
