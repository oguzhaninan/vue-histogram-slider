<template>
  <div>
    <HistogramSlider
      style="margin: 200px auto"
      :width="900"
      :bar-height="110"
      :data="data"
      :prettify="prettify"
      :drag-interval="true"
      :force-edges="false"
      :colors="['#4facfe', '#00f2fe']"
      :min="new Date(2004, 11, 24).valueOf()"
      :max="new Date(2017, 11, 24).valueOf()"
    />
  </div>
</template>

<script>
import HistogramSlider from "./lib//HistogramSlider";
export default {
  data() {
    return {
      data: require("../resources/data.json").map(d => new Date(d)),
      prettify: function(ts) {
        return new Date(ts).toLocaleDateString("en", {
          year: "numeric",
          month: "short",
          day: "numeric"
        });
      }
    };
  },

  methods: {
    onChange(val) {
      console.log(val);
    }
  },

  components: {
    HistogramSlider
  }
};
</script>

<style></style>
