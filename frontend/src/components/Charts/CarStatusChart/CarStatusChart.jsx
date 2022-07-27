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
  Title,
  Font,
  Margin,
} from "devextreme-react/pie-chart";
import CarService from "../../../services/CarService";

function CarStatusChart(props) {
  const { classes } = props;

  // const [carCount, setCarcount] = useState({
  //   availableCount: 12,
  //   reservedCount: 10,
  //   need_maintCount: 3,
  //   under_maintCount: 2,
  // });

  const [carCount, setCarcount] = useState({});

  const carData = [
    { region: "Available", val: carCount.availableCount },
    { region: "Reserved", val: carCount.reservedCount },
    { region: "Need Maintenance", val: carCount.need_maintCount },
    { region: "Under Maintenance", val: carCount.under_maintCount },
  ];

  useEffect(() => {
    getNoOfCarsByStatus();
  }, []);

  async function getAvailableCarCount() {
    let res = await CarService.getNoOfCarsByStatus("Available");
    if (res.status === 200) {
      // setCarcount({ ...carCount, availableCount: count });
      let count = { availableCount: res.data.data };
      setCarcount((carCount) => ({
        ...carCount,
        ...count,
      }));
    }
  }

  async function getReservedCarCount() {
    let res = await CarService.getNoOfCarsByStatus("Reserved");
    if (res.status === 200) {
      // let count = res.data.data;
      // setCarcount({ ...carCount, reservedCount: count });
      let count = { reservedCount: res.data.data };
      setCarcount((carCount) => ({
        ...carCount,
        ...count,
      }));
    }
  }

  async function getNMCarCount() {
    let res = await CarService.getNoOfCarsByStatus("Need Maintenance");
    if (res.status === 200) {
      // let count = res.data.data;
      // setCarcount({ ...carCount, need_maintCount: count });
      let count = { need_maintCount: res.data.data };
      setCarcount((carCount) => ({
        ...carCount,
        ...count,
      }));
    }
  }

  async function getUMCarCount() {
    let res = await CarService.getNoOfCarsByStatus("Under Maintenance");
    if (res.status === 200) {
      // let count = res.data.data;
      // setCarcount({ ...carCount, under_maintCount: count });
      let count = { under_maintCount: res.data.data };
      setCarcount((carCount) => ({
        ...carCount,
        ...count,
      }));
    }
  }

  function getNoOfCarsByStatus() {
    getAvailableCarCount();
    getReservedCarCount();
    getNMCarCount();
    getUMCarCount();

    console.log(carCount);
  }

  return (
    <PieChart
      id="carChart"
      type="doughnut"
      title="Current Status of Cars"
      palette="Harmony Light"
      //   palette="Soft Pastel"
      //   palette="Violet"
      dataSource={carData}
      // style={{ color: "red !important" }}
    >
      <Size height={300} width={350} />

      {/* <Title title="Current Status of Cars">
        <Font color="black" />
      </Title> */}

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
