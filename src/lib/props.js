export default {
  min: {
    type: Number,
    default: 1,
    required: true
  },
  max: {
    type: Number,
    default: 100,
    required: true
  },
  data: {
    type: Array,
    required: true
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
    default: false
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
  prettify: Function,
  primaryColor: {
    type: String,
    default: "#0091ff"
  },
  holderColor: {
    type: String,
    default: "#dee4ec"
  },
  handleColor: {
    type: String,
    default: "#ffffff"
  },
  gridTextColor: {
    type: String,
    default: "silver"
  },
  lineHeight: {
    type: Number,
    default: 6
  },
  transitionDuration: {
    type: Number,
    default: 100
  },
  fontFamily: {
    type: String,
    default: "Arial, sans-serif"
  },
  fontSize: {
    type: Number,
    default: 12
  },
  histSliderGap: {
    type: Number,
    default: 6
  }
};
