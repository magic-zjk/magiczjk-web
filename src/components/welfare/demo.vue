<template>
  <div v-show="showFlag" class="details">
    <header class="header">
      <header class="bar bar-nav" @click="hide">
        <div class="pull-left">
          <span class="iconfont icon-left"></span>
        </div>
        <div class="title">小可爱</div>
      </header>
    </header>
    <div>
      <img :src="url" alt="" style="width: 100%;height: 100%">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import vImg from '../lazyloadimg/lazyimg.vue';

  export default {
    name: 'demo',
    props: {
      url: {
        type: String
      }
    },
    data() {
      return {
        showFlag: false
      };
    },
    methods: {
      show() {
        this.showFlag = true;
      },
      hide() {
        this.showFlag = false;
      }
    },
    components: {
      vImg
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../details/details.styl';

</style>
