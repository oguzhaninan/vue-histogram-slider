<template>
  <div>
    <HistogramSlider
      style="margin: 200px auto"
      type="double"
      :width="900"
      :bar-height="110"
      :data="data"
      :prettify="prettify"
      :clip="true"
      :drag-interval="true"
      :hideFromTo="true"
      @finish="finish"
      :force-edges="false"
      :colors="['#4facfe', '#00f2fe']"
    />

    <HistogramSlider
      style="margin: 200px auto"
      ref="hist"
      type="double"
      :width="900"
      :bar-height="110"
      :data="data"
      :prettify="prettify"
      :clip="true"
      :drag-interval="true"
      :hideFromTo="true"
      @finish="finish"
      :force-edges="false"
      :colors="['#4facfe', '#00f2fe']"
    />
  </div>
</template>

<script>
import HistogramSlider from './lib//HistogramSlider'
export default {
  data() {
    return {
      data: require('../resources/data.json').map(d => new Date(d).valueOf()),
      prettify: function(ts) {
        return new Date(ts).toLocaleDateString('en', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      }
    }
  },

  methods: {
    finish(val) {
      console.log(val)
    }
  },

  mounted() {
    setTimeout(() => {
      this.$refs.hist.update({ from: this.data[20], to: this.data[69] })
    }, 2000)
  },

  components: {
    HistogramSlider
  }
}
</script>
