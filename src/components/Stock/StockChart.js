import Plot from "react-plotly.js";

const StockChart = (props) => {
  return (
    <Plot
      data={[
        {
          x: props.xValues,
          y: props.yValues,
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "red" },
        },
      ]}
      layout={{
        width: 720,
        height: 440,
        title: "Chart",
      }}
    />
  );
};

export default StockChart;
