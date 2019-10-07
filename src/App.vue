<template>
  <div>
    <HistogramSlider
      style="margin: 200px auto"
      type="single"
      :width="900"
      :bar-height="110"
      :data="data"
      :prettify="prettify"
      :drag-interval="true"
      :force-edges="false"
      :colors="['#4facfe', '#00f2fe']"
    />
  </div>
</template>

<script>
import HistogramSlider from "./lib//HistogramSlider";
export default {
  data() {
    return {
      data: require("../resources/data.json").map(d => new Date(d).valueOf()),
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
