import { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const StockChart = (props) => {
  const { xValues, yValues } = props;
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (+yValues[0] > +yValues[yValues.length - 1]) {
      setMarker({ color: "green" });
    } else if (+yValues[0] < +yValues[yValues.length - 1]) {
      setMarker({ color: "red" });
    } else {
      setMarker({ color: "black" });
    }
  }, [yValues]);

  return (
    <div className="centered">
      <Plot
        data={[
          {
            x: xValues,
            y: yValues,
            type: "scatter",
            mode: "lines+markers",
            marker,
          },
        ]}
        layout={{
          width: 720,
          height: 440,
          title: "Chart",
        }}
      />
    </div>
  );
};

export default StockChart;
