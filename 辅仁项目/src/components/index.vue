<template>
    <div class="index">

        <div class="main">
            <transition :name="transitionName">
                <router-view class="views"></router-view>
            </transition>
        </div>

        <ul class="footer">
            <router-link to="/lianxi" tag="li" active-class="active">
                <i class="i1"></i>
                <span>练习</span>
            </router-link>
            <router-link to="/kecheng" tag="li" active-class="active">
                <i class="i2"></i>
                <span>课程</span>
            </router-link>
            <router-link to="/zixun" tag="li" active-class="active">
                <i class="i3"></i>
                <span>资讯</span>
            </router-link>
            <router-link to="/my" tag="li" active-class="active">
                <i class="i4"></i>
                <span>我的</span>
            </router-link>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            transitionName: ''
        }
    },
    methods: {

    },
    mounted() {

    },
    watch: {
        $route(to, from) {
            if(to.meta.index > from.meta.index) {
                this.transitionName = 'slide-left';
            }else{
                this.transitionName = 'slide-right';
            }
            console.log(this.transitionName);
        }
    }
}
</script>

<style lang="scss" scoped>
    .main{
        flex-grow: 1;
        overflow: hidden;
        position: relative;
        .views{
            // width: 100%;
            // height: 100%;
            // position: absolute;
            .slide-right-enter-active,
            .slide-right-leave-active,
            .slide-left-enter-active,
            .slide-left-leave-active {
              will-change: transform;
              transition: all 500ms;
              position: absolute;
            }
            .slide-right-enter {
              opacity: 0;
              transform: translate3d(-100%, 0, 0);
            }
            .slide-right-leave-active {
              opacity: 0;
              transform: translate3d(100%, 0, 0);
            }
            .slide-left-enter {
              opacity: 0;
              transform: translate3d(100%, 0, 0);
            }
            .slide-left-leave-active {
              opacity: 0;
              transform: translate3d(-100%, 0, 0);
            }
        }
    }

    ul.footer{
        background: #fff;
        height: 0.6rem;
        width: 100%;
        border-top: 1px solid #eee;
        position: fixed;
        left: 0;
        bottom: 0;
        display: flex;
        li{
            flex: 1;
            text-align: center;
            padding-top: 0.08rem;
            color: #252525;
            font-size: 0.14rem;
            &.active{
                color: #00bacb;
            }
            &.active .i1{
                background: url(../../static/img/lianxihou.png) no-repeat center;
                display: block;
                width: .22rem;
                height: .23rem;
                background-size: 100% 100%;
                margin: 0 auto;
            }
            &.active .i2{
                background: url(../../static/img/kecehnghou.png) no-repeat center;
                display: block;
                width: .22rem;
                height: .23rem;
                background-size: 100% 100%;
                margin: 0 auto;
            }
            &.active .i3{
                background: url(../../static/img/zixunhou.png) no-repeat center;
                display: block;
                width: .22rem;
                height: .23rem;
                background-size: 100% 100%;
                margin: 0 auto;
            }
            &.active .i4{
                background: url(../../static/img/wodehou.png) no-repeat center;
                display: block;
                width: .22rem;
                height: .23rem;
                background-size: 100% 100%;
                margin: 0 auto;
            }
            .i1{
                background: url(../../static/img/lianxiqian.png) no-repeat center;
                display: block;
                width: .22rem;
                height: .23rem;
                background-size: 100% 100%;
                margin: 0 auto;
            }
            .i2{
                background: url(../../static/img/kechengqian.png) no-repeat center;
                display: block;
                width: .22rem;
                height: .23rem;
                background-size: 100% 100%;
                margin: 0 auto;
            }
            .i3{
                background: url(../../static/img/zixunqian.png) no-repeat center;
                display: block;
                width: .22rem;
                height: .23rem;
                background-size: 100% 100%;
                margin: 0 auto;
            }
            .i4{
                background: url(../../static/img/wodeqian.png) no-repeat center;
                display: block;
                width: .22rem;
                height: .23rem;
                background-size: 100% 100%;
                margin: 0 auto;
            }
            span{
                display: block;
                margin-top: 0.06rem;
            }
        }
    }


</style>
