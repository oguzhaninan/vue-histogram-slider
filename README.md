# vue-histogram-slider

<p align="center">
    <img src="./resources/header.png" width="500">
</p>
<p align="center">
 Range slider with histogram for <a href="http://vuejs.org/" rel="nofollow" class="rich-diff-level-one">Vue</a>
</p>

### Quick Start
If you are a try and learn developer, you can start trying the vue-histogram-slider now using codesandbox.io.

[![Edit Vue Histogram Slider](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vue-template-b7m0e)

<p align="center">
    <img src="./resources/histogram-slider-demo.gif">
</p>

## Installation    

`yarn add vue-histogram-slider`

## Usage
```xml
<HistogramSlider
    :width="600"
    :barHeight="100"
    :data="[]"
/>
```

```js
import Vue from 'vue';
import HistogramSlider from 'vue-histogram-slider';

Vue.component(HistogramSlider.name, HistogramSlider);
```

## Props

Property|Type|Default|Description
---|---|---|---
width|number|600|width of dialog

## Event
Name|Description
---|---
change|triggers when dialog will hide
update|triggers when mask clicked
finish|triggers when mask clicked
start|triggers when mask clicked

