import { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const StockChart = ({ chartConfig }) => {
  const { days, closes } = chartConfig;

  const [marker, setMarker] = useState();

  useEffect(() => {
    +closes[0] > +closes[closes.length - 1]
      ? setMarker({ color: "green" })
      : setMarker({ color: "red" });
  }, [closes]);

  return (
    <div className="centered">
      <Plot
        data={[
          {
            x: days,
            y: closes,
            type: "scatter",
            mode: "lines+markers",
            marker,
          },
        ]}
        layout={{
          width: 720,
          height: 440,
          title: "Daily Price Chart (100 Days)",
        }}
      />
    </div>
  );
};

export default StockChart;
