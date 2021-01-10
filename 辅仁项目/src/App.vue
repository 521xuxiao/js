<template>
  <div id="app">
      <!-- <router-view></router-view> -->
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive" ></router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive" ></router-view>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
    data() {
        return{

        }
    },

}
</script>

<style lang="scss" scoped>

</style>
