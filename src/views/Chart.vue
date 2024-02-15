<template>
  <section class="chart flex column gap30">
    <BarChart v-if="marketPriceHistory" :data="formData(marketPriceHistory)" :title="'Market Price History'" />
    <BarChart v-if="avgBlockSize" :data="formData(avgBlockSize)" :title="'Avg Block Size'" />
  </section>
</template>

<script>
import { bitcoinService } from "@/services/bitcoin.service";

import BarChart from "../cmps/chars/BarChart.vue";
export default {
  data() {
    return {
      marketPriceHistory: null,
      avgBlockSize: null,
    };
  },
  methods: {
    formData(dataset) {
      console.log(dataset);
      const labels = dataset.map((data) => this.formatTimestamp(data.x));
      const datasets = dataset.map((data) => data.y);
      console.log({ labels, datasets });
      return { labels, datasets };
    },

    formatTimestamp(timestamp) {
      const date = new Date(timestamp * 1000);
      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear().toString().slice(-2);

      return `${day}/${month}/${year}`;
    },
  },

  async created() {
    this.marketPriceHistory = await bitcoinService.getMarketPriceHistory();
    this.avgBlockSize = await bitcoinService.getAvgBlockSize();
  },
  components: {
    BarChart,
  },
};
</script>

<style lang="scss">
// .chart{

// }
</style>