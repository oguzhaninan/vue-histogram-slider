<template>
  <div>
    <HistogramSlider
      style="margin: 200px auto"
      :width="900"
      :barHeight="110"
      :data="data"
      :prettify="prettify"
      :dragInterval="true"
      :min="new Date(2004, 11, 24).valueOf()"
      :max="new Date(2017, 11, 24).valueOf()"
    />
  </div>
</template>

<script>
import HistogramSlider from "./HistogramSlider";
export default {
  data() {
    return {
      data: require("../example/data.json"),
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
