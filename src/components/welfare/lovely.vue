<template>
  <div class="welfare-wrapper" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
       infinite-scroll-distance="10">
    <div class="welfare-center">
      <figure v-show="leftData.length > 0" v-for="data in leftData" @click="selectDetails(data.url)">
        <v-img :imgUrl="data.url"></v-img>
      </figure>
    </div>
    <div class="welfare-center">
      <figure v-show="rightData.length > 0" v-for="data in rightData" @click="selectDetails(data.url)">
        <v-img :imgUrl="data.url"></v-img>
      </figure>
    </div>
      <!--<demo ref="dddd" :url="url"></demo>-->
    <v-details ref="details" :url="url"></v-details>
  </div>
</template>

<script>
  import vImg from '../lazyloadimg/lazyimg.vue';
  import vDetails from '../details/details.vue';
  import demo from './demo.vue';

  export default {
    data() {
      return {
        leftData: [],
        rightData: [],
        busy: false,
        page: 1,
        detailsData: {},
        time: '',
        size: -1,
        url: ''
      };
    },
    components: {
      vImg,
      vDetails,
      demo
    },
    created() {
    },
    methods: {
      loadTop() {
        this.$store.commit('UPDATE_LOADING', true);
        this.$http.get(`api/data/lovely/10/${this.page}`).then((response) => {
          this.size = response.body.results.length;
          let left = response.body.results.filter((data, i) => {
            return (i + 1) % 2 === 1;
          });
          let right = response.body.results.filter((data, i) => {
            return (i + 1) % 2 !== 1;
          });
          this.leftData = this.leftData.concat(left);
          this.rightData = this.rightData.concat(right);
          this.busy = false;
          // $nextTick() 在dom 重新渲染完后执行
          this.$nextTick(() => {
            this.$store.commit('UPDATE_LOADING', false);
          });
        });
      },
      loadMore() {
        if (this.size !== 0) {
          this.busy = true;
          this.loadTop();
          this.page++;
        }
      },
      selectDetails(url) {
        this.$store.commit('UPDATE_LOADING', true);
        this.url = url;
        this.$refs.details.show();
        this.$nextTick(() => {
          this.$store.commit('UPDATE_LOADING', false);
        });
      }
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "lovely.styl";
</style>
