<template>
  <div class="menu">
    <div class="menu-list" :class="{'show': show}">
      <div class="menu-header">
        <img class="menu-avatar" src="http://www.taopic.com/uploads/allimg/131125/240503-1311250IT642.jpg"
             alt="">
        <div class="menu-title">MAGIC</div>
      </div>
      <div class="menu-ul">
        <div v-for='menu in menus' @click="updateHeader(MENU_CONVERT[menu], menu)">
          <router-link class="icon-quanbu iconfont item border-1px" :to="menu">
            <div class="menu-icon">
              <i class="iconfont " :class="'icon-'+ menu"></i>
            </div>
            <span class="menu-text">{{MENU_CONVERT[menu]}}</span>
            <div class="menu-new" v-show="menu ==='day' && news>0">
              <span>5</span>
            </div>
          </router-link>
        </div>

      </div>
    </div>
    <div class="menu-other">
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  const MENU_CONVERT = {'lovely': '小可爱', 'day': '每日推荐', 'daily': '日志'};
  export default {
    name: 'v-menu',
    props: {
      show: {
        type: Boolean
      }
    },
    data() {
      return {
        MENU_CONVERT: MENU_CONVERT
      };
    },
    computed: {
      ...mapState([
        'menus', 'news'
      ])
    },
    methods: {
      updateHeader(title, menu) {
        this.$store.commit('UPDATE_TITLE', title);
        this.$store.commit('UPDATE_MENUSHOW');
        if (menu === 'day') {
          this.$store.commit('UPDATE_NEWS');
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import 'menu.styl';

</style>
