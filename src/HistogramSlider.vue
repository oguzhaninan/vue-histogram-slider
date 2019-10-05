<template>
  <div
    style="width: 600px; margin: 200px auto; display: flex; align-items: center; flex-direction: column;"
  >
    <svg id="histogram-view"></svg>
    <div style="margin-top: -30px; width: 100%;">
      <input type="text" id="slider" />
    </div>
  </div>
</template>

<script>
import "./lib/range-slider";
import * as d3 from "d3";
import * as $ from "jquery";

export default {
  name: "HistogramSlider",

  mounted() {
    const config = {
      width: 580,
      barHeight: 100,
      barWidth: 6,
      barGap: 5,
      barRadius: 4,
      lang: "tr",
      min: new Date(2004, 11, 24).valueOf(),
      max: new Date(2017, 11, 24).valueOf(),
      prettify: function(ts) {
        return new Date(ts).toLocaleDateString(config.lang, {
          year: "numeric",
          month: "long",
          day: "numeric"
        });
      }
    };

    // x scale for time
    var x = d3
      .scaleTime()
      .domain([config.min, config.max])
      .range([0, config.width])
      .clamp(true);

    // y scale for histogram
    var y = d3.scaleLinear().range([config.barHeight, 0]);

    ////////// histogram set up //////////
    var histogram = d3
      .histogram()
      .value(d => d.date)
      .domain(x.domain())
      .thresholds(config.width / (config.barWidth + config.barGap));

    var svg = d3
      .select("#histogram-view")
      .attr("width", config.width)
      .attr("height", config.barHeight);

    var hist = svg.append("g").attr("class", "histogram");

    d3.csv(
      "https://gist.githubusercontent.com/oguzhaninan/ae7466169c06d9c145e028ff398b6eb3/raw/be32fbc76953c349c9c695e98a69f1a46d775375/example.csv",
      prepare,
      function(data) {
        // group data for bars
        var bins = histogram(data);

        // y domain based on binned data
        y.domain([0, d3.max(bins, d => d.length)]);

        var bar = hist
          .selectAll(".bar")
          .data(bins)
          .enter()
          .append("g")
          .attr("class", "bar")
          .attr("transform", d => `translate(${x(d.x0)}, ${y(d.length)})`);

        bar
          .append("rect")
          .attr("class", "bar")
          .attr("x", 1)
          .attr("rx", config.barRadius)
          .attr("width", config.barWidth)
          .attr("height", d => config.barHeight - y(d.length))
          .attr("fill", "#0091ff");
      }
    );

    var parseDate = d3.timeParse("%d-%b-%y");
    function prepare(d) {
      d.date = parseDate(d.date);
      d.value = +d.value;
      return d;
    }

    $("#slider").ionRangeSlider({
      skin: "round",
      type: "double",
      grid: true,
      step: 1,
      min: config.min,
      max: config.max,
      hide_min_max: true,
      hide_from_to: false,
      force_edges: true,
      drag_interval: true,
      prettify: config.prettify,
      onChange: function(val) {
        d3.selectAll(".bar").attr("fill", d =>
          d.x0 < val.to && d.x0 > val.from ? "#0091ff" : "#d8d8d8"
        );
        if (config.onChange) {
          config.onChange(val);
        }
      }
    });
  }
};
</script>

<style>
.irs {
  position: relative;
  display: block;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 12px;
  font-family: Arial, sans-serif;
}

.irs-line {
  position: relative;
  display: block;
  overflow: hidden;
  outline: none !important;
}

.irs-bar {
  position: absolute;
  display: block;
  left: 0;
  width: 0;
}

.irs-shadow {
  position: absolute;
  display: none;
  left: 0;
  width: 0;
}

.irs-handle {
  position: absolute;
  display: block;
  box-sizing: border-box;
  cursor: default;
  z-index: 1;
}

.irs-handle.type_last {
  z-index: 2;
}

.irs-min,
.irs-max {
  position: absolute;
  display: block;
  cursor: default;
}

.irs-min {
  left: 0;
}

.irs-max {
  right: 0;
}

.irs-from,
.irs-to,
.irs-single {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  cursor: default;
  white-space: nowrap;
}

.irs-grid {
  position: absolute;
  display: none;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
}

.irs-with-grid .irs-grid {
  display: block;
}

.irs-grid-pol {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 8px;
  background: #000;
}

.irs-grid-pol.small {
  height: 4px;
}

.irs-grid-text {
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  text-align: center;
  font-size: 9px;
  line-height: 9px;
  padding: 0 3px;
  color: #000;
}

.irs-disable-mask {
  position: absolute;
  display: block;
  top: 0;
  left: -1%;
  width: 102%;
  height: 100%;
  cursor: default;
  background: rgba(0, 0, 0, 0);
  z-index: 2;
}

.lt-ie9 .irs-disable-mask {
  background: #000;
  filter: alpha(opacity=0);
  cursor: not-allowed;
}

.irs-disabled {
  opacity: 0.4;
}

.irs-hidden-input {
  position: absolute !important;
  display: block !important;
  top: 0 !important;
  left: 0 !important;
  width: 0 !important;
  height: 0 !important;
  font-size: 0 !important;
  line-height: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden;
  outline: none !important;
  z-index: -9999 !important;
  background: none !important;
  border-style: solid !important;
  border-color: transparent !important;
}

.irs--flat {
  height: 40px;
}

.irs--flat.irs-with-grid {
  height: 60px;
}

.irs--flat .irs-line {
  top: 25px;
  height: 12px;
  background-color: #e1e4e9;
  border-radius: 4px;
}

.irs--flat .irs-bar {
  top: 25px;
  height: 12px;
  background-color: #ed5565;
}

.irs--flat .irs-bar--single {
  border-radius: 4px 0 0 4px;
}

.irs--flat .irs-shadow {
  height: 1px;
  bottom: 16px;
  background-color: #e1e4e9;
}

.irs--flat .irs-handle {
  top: 22px;
  width: 16px;
  height: 18px;
  background-color: transparent;
}

.irs--flat .irs-handle > i:first-child {
  position: absolute;
  display: block;
  top: 0;
  left: 50%;
  width: 2px;
  height: 100%;
  margin-left: -1px;
  background-color: #da4453;
}

.irs--flat .irs-handle.state_hover > i:first-child,
.irs--flat .irs-handle:hover > i:first-child {
  background-color: #a43540;
}

.irs--flat .irs-min,
.irs--flat .irs-max {
  top: 0;
  padding: 1px 3px;
  color: #999;
  font-size: 10px;
  line-height: 1.333;
  text-shadow: none;
  background-color: #e1e4e9;
  border-radius: 4px;
}

.irs--flat .irs-from,
.irs--flat .irs-to,
.irs--flat .irs-single {
  color: white;
  font-size: 10px;
  line-height: 1.333;
  text-shadow: none;
  padding: 1px 5px;
  background-color: #ed5565;
  border-radius: 4px;
}

.irs--flat .irs-from:before,
.irs--flat .irs-to:before,
.irs--flat .irs-single:before {
  position: absolute;
  display: block;
  content: "";
  bottom: -6px;
  left: 50%;
  width: 0;
  height: 0;
  margin-left: -3px;
  overflow: hidden;
  border: 3px solid transparent;
  border-top-color: #ed5565;
}

.irs--flat .irs-grid-pol {
  background-color: #e1e4e9;
}

.irs--flat .irs-grid-text {
  color: #999;
}

.irs--round {
  height: 50px;
}

.irs--round.irs-with-grid {
  height: 65px;
}

.irs--round .irs-line {
  top: 36px;
  height: 4px;
  background-color: #dee4ec;
  border-radius: 4px;
}

.irs--round .irs-bar {
  top: 36px;
  height: 4px;
  background-color: #0091ff;
}

.irs--round .irs-bar--single {
  border-radius: 4px 0 0 4px;
}

.irs--round .irs-shadow {
  height: 4px;
  bottom: 21px;
  background-color: rgba(222, 228, 236, 0.5);
}

.irs--round .irs-handle {
  cursor: pointer;
  top: 30px;
  width: 16px;
  height: 16px;
  /* border: 4px solid #006cfa; */
  background-color: white;
  border-radius: 18px;
  box-shadow: 0 1px 3px rgba(0, 0, 255, 0.3);
}

.irs--round .irs-handle.state_hover,
.irs--round .irs-handle:hover {
  background-color: #f0f6ff;
}

.irs--round .irs-min,
.irs--round .irs-max {
  color: #333;
  font-size: 14px;
  line-height: 1;
  top: 0;
  padding: 3px 5px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.irs--round .irs-from,
.irs--round .irs-to,
.irs--round .irs-single {
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  text-shadow: none;
  padding: 3px 5px;
  background-color: #0091ff;
  color: white;
  border-radius: 4px;
}

.irs--round .irs-from:before,
.irs--round .irs-to:before,
.irs--round .irs-single:before {
  position: absolute;
  display: block;
  content: "";
  bottom: -6px;
  left: 50%;
  width: 0;
  height: 0;
  margin-left: -3px;
  overflow: hidden;
  border: 3px solid transparent;
  border-top-color: #0091ff;
}

.irs--round .irs-grid {
  height: 25px;
}

.irs--round .irs-grid-pol {
  background-color: #dedede;
}

.irs--round .irs-grid-text {
  color: silver;
  font-size: 13px;
}
</style>
