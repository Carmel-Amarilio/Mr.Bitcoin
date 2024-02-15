<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>
  
  <script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  name: "BarChart",
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: this.data.labels,
        datasets: [
          {
            label: this.title,
            data: this.data.datasets,
            backgroundColor: "rgba(72, 157, 185, 0.5)",
            borderColor: "rgba(72, 157, 185, 1)",
            borderWidth: 1,
          },
        ],
      },
      chartOptions: {
        responsive: true,
      },
    };
  },
};
</script>

<style lang="scss">
// section {
// //   background-color: #688dd1;
// }
</style>