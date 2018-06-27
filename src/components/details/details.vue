<template>
  <transition name="fade">
    <div v-show="showFlag" class="details">
      <div>
        <header class="header">
          <header class="bar bar-nav" @click="hide">
            <div class="pull-left">
              <span class="iconfont icon-left"></span>
            </div>
            <div class="title">小可爱</div>
          </header>
        </header>
        <div>
          <img :src="url" alt="" style="width: 100%;height: 100%;margin-top: 49px;">
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'v-details',
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
    created() {
    },
    methods: {
      show() {
        this.showFlag = true;
      },
      hide() {
        this.showFlag = false;
      }
    }
  };
</script>


<style lang="stylus" rel="stylesheet/stylus">
  @import './details.styl';

</style>
