<template>
  <div :style="`width: ${width}px;`" id="hist-slider-wrapper">
    <svg id="histogram-view"></svg>
    <div style="margin-top: -30px; width: 100%;">
      <input type="text" id="histogram-slider" />
    </div>
  </div>
</template>

<script>
import "./lib/range-slider";
import * as d3Scale from "d3-scale";
import * as d3Array from "d3-array";
import * as d3Select from "d3-selection";
import * as $ from "jquery";
var data = require("../data.json");

export default {
  name: "HistogramSlider",

  props: {
    min: {
      type: Number
      // required: true
    },
    max: {
      type: Number
      // required: true
    },
    data: {
      type: Array
      // required: true
    },
    block: {
      type: Boolean,
      default: false
    },
    grid: {
      type: Boolean,
      default: true
    },
    gridNum: {
      type: Number,
      default: 4
    },
    step: {
      type: Number,
      default: 1
    },
    hideMinMax: {
      type: Boolean,
      default: true
    },
    hideFromTo: {
      type: Boolean,
      default: false
    },
    toFixed: {
      type: Boolean,
      default: false
    },
    fromFixed: {
      type: Boolean,
      default: false
    },
    forceEdges: {
      type: Boolean,
      default: true
    },
    dragInterval: {
      type: Boolean,
      default: false
    },
    keyboard: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: "double",
      validator: function(value) {
        return ["double", "single"].indexOf(value) !== -1;
      }
    },
    width: {
      type: Number,
      default: 650
    },
    barHeight: {
      type: Number,
      default: 100
    },
    barWidth: {
      type: Number,
      default: 6
    },
    barGap: {
      type: Number,
      default: 5
    },
    barRadius: {
      type: Number,
      default: 4
    },
    prettify: Function
  },

  mounted() {
    const config = {
      width: this.width - 20,
      barHeight: this.barHeight,
      barWidth: this.barWidth,
      barGap: this.barGap,
      barRadius: this.barRadius,
      min: new Date(2004, 11, 24).valueOf(),
      max: new Date(2017, 11, 24).valueOf(),
      prettify: function(ts) {
        return new Date(ts).toLocaleDateString("en", {
          year: "numeric",
          month: "short",
          day: "numeric"
        });
      }
    };

    // x scale for time
    var x = d3Scale
      .scaleTime()
      .domain([config.min, config.max])
      .range([0, config.width])
      .clamp(true);

    // y scale for histogram
    var y = d3Scale.scaleLinear().range([config.barHeight, 0]);

    var histogram = d3Array
      .bin()
      .value(d => new Date(d.date))
      .domain(x.domain())
      .thresholds(config.width / (config.barWidth + config.barGap));

    var svg = d3Select
      .select("#histogram-view")
      .attr("width", config.width)
      .attr("height", config.barHeight);

    var hist = svg.append("g").attr("class", "histogram");

    // group data for bars
    var bins = histogram(data);

    y.domain([0, d3Array.max(bins, d => d.length)]);

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

    $("#histogram-slider").ionRangeSlider({
      skin: "round",
      min: config.min,
      max: config.max,
      type: this.type,
      grid: this.grid,
      step: this.step,
      from_fixed: this.fromFixed,
      to_fixed: this.toFixed,
      hide_min_max: this.hideMinMax,
      hide_from_to: this.hideFromTo,
      force_edges: this.forceEdges,
      drag_interval: this.dragInterval,
      grid_num: this.Number,
      block: this.block,
      keyboard: this.keyboard,
      prettify: config.prettify,
      // onStart(val) {
      //   // this.$emit('start', val)
      // },
      // onUpdate(val) {
      //   // this.$emit('update', val)
      // },
      // onFinish(val) {
      //   // this.$emit('finish', val)
      // },
      onChange(val) {
        d3Select
          .selectAll(".bar")
          .attr("fill", d =>
            d.x0 < val.to && d.x0 > val.from ? "#0091ff" : "#d8d8d8"
          );
        // this.$emit('change', val)
      }
    });
  }
};
</script>

<style>
#hist-slider-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
}

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
