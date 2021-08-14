<template>
  <div>
    <GChart type="PieChart" :options="{ width: 360, height: 360, title: titleProps }" :data="data"></GChart>
  </div>
</template>
<script>
import { GChart } from "vue-google-charts"

export default {
  name: "PieChart",
  components: {
    GChart
  },
  props: {
    options: {
      type: Object,
      defaults: null
    },
    data: {
      type: Array,
      defaults: []
    },
    titleProps: {
      type: String,
      defaults: ""
    }
  },
}
</script>