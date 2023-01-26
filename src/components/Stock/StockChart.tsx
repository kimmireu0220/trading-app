import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

type Props = {
  chartConfig: {
    days: string[];
    closes: string[];
  };
};

const StockChart: React.FC<Props> = ({ chartConfig }) => {
  const { days, closes } = chartConfig;

  const [marker, setMarker] = useState({ color: "" });

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
