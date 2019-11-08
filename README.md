<p align="center">
    <img src="https://github.com/oguzhaninan/vue-histogram-slider/raw/master/resources/header.png" width="500">
</p>
<p align="center">
 Range slider with histogram for <a href="http://vuejs.org/" rel="nofollow" class="rich-diff-level-one">Vue</a>
</p>
<p align="center">
    <img src="https://img.shields.io/npm/l/vue-histogram-slider?style=flat-square" />
    <img alt="npm" src="https://img.shields.io/npm/dm/vue-histogram-slider?style=flat-square">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/oguzhaninan/vue-histogram-slider?style=flat-square">
    <img alt="npm" src="https://img.shields.io/npm/v/vue-histogram-slider?style=flat-square">
</p>
<hr>

## 🚀 Quick Start
If you are a try and learn developer, you can start trying the vue-histogram-slider now using codesandbox.io.

<a href="https://codesandbox.io/s/vue-histogram-slider-b7m0e?fontsize=14" target="_blank">
  <img alt="Edit Vue Histogram Slider" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>


<p align="center">
    <img src="https://github.com/oguzhaninan/vue-histogram-slider/raw/master/resources/histogram-slider-demo.gif">
</p>

## 📦 Installation    
### yarn
`yarn add vue-histogram-slider`

### npm
`npm i vue-histogram-slider`

## 🔧 Usage
```js
import Vue from 'vue';
import HistogramSlider from 'vue-histogram-slider';
import 'vue-histogram-slider/dist/histogram-slider.css';

Vue.component(HistogramSlider.name, HistogramSlider);
```

```xml
<HistogramSlider
    :width="600"
    :bar-height="100"
    :data="data"
/>
```

## 📋 Props

Property |Type|Default|Description
---|:---:|:---:|---
min|number|1|Set slider minimum value
max|number|100|Set slider maximum value
data|array| - |Data for histogram
block|boolean|false|Locks slider and makes it inactive
grid|boolean|true|Enables grid of values.
gridNum|number|4|Number of grid units.
step|number|1|Set sliders step. Always > 0. Could be fractional.
hideMinMax|boolean|true|Hides min and max labels
hideFromTo|boolean|false|Hides from and to labels
toFixed|boolean|false|Fix position of right handle.
fromFixed|boolean|false|Fix position of left (or single) handle.
forceEdges|boolean|false|Slider will be always inside it's container.
dragInterval|boolean|false|Allow user to drag whole range. Only in double type
keyboard|boolean|true|Activates keyboard controls. Move left: ←, ↓, A, S. Move right: →, ↑, W, D.
type|string|double|Choose slider type, could be single - for one handle, or double for two handles
width|number|600|width of dialog
barHeight|number|100|Set max histogram bar height
barWidth|number|6|Set histogram bar width
barGap|number|5|Set histogram bar gap
barRadius|number|4|Set histogram bar radius
prettify|function|null|Set up your own prettify function. Can be anything. For example, you can set up unix time as slider values and than transform them to cool looking dates.
lineHeight|number|6|Set slider line height
transitionDuration|number|100|Set duration to histogram bars
primaryColor|string|#0091ff|Primary color
labelColor|string|#0091ff|Label color
holderColor|string|#dee4ec|Holder color
handleColor|string|#ffffff|Slider handle color
gridTextColor|string|silver|Primary color
fontFamily|string|'Arial, sans-serif'|Set text font family
fontSize|number|12|Set text font size
handleSize|number|26|Slider handle size
histSliderGap|number|6|Set gap between slider and histogram
updateColorOnChange|boolean|true|Update histogram bar color on change **(recommended false for performance)**

## 🔧 Event
Name|Description
---|---
start |Triggers when slider start.
change|Triggers when each values change.
update|Triggers when slider is modified by external methods update or reset.
finish|Triggers when user releases handle.

