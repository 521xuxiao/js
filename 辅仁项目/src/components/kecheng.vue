<template>
    <div class="kecheng">
        <div class="header">
            <img src="../../static/img/返回@2x.png" class="img1">
            <h3>课程选择</h3>
            <img src="../../static/img/搜索图标@2x.png" class="img2">
        </div>

        <div class="main">
            <div class="left">
                <ul>
                    <!-- 一级 -->
                    <li :class="{'active': currentIndex == index}" v-for="(datas, index) in levelOne" @click="changeColor(index, datas.isover, datas.id)">{{datas.name}}</li>
                </ul>
            </div>
            <div class="right">
                <ul v-if="isShow">
                    <!-- 二级 -->
                    <li v-for="dataTow in levelTow" @click="showChild(dataTow.id, dataTow.isover, $event)">
                        <p>{{dataTow.name}}</p>
                        <i class="iconfont icon-icon-test" v-if="dataTow.isover==1? false: true"></i>
                    </li>
                </ul>
                <ul v-if="!isShow">
                    <!-- 三级 -->
                    <li v-for="dataTree in levelTree" @click="threeToSearch()">{{dataTree.name}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return{
            isShow: true,
            currentIndex: 0,
            levelOne: [],
            levelTow: [],
            levelTree: []
        }
    },
    methods: {
        // 一级
        changeColor(n, isOver, Id) {
            this.currentIndex = n;
            // 有子集，显示右面
            if(isOver == 0) {
                this.isShow = true;
                axios.get(`/api/get/categoryByParentid.ashx?parentid=${Id}`).then((res)=> {
                    this.levelTow = res.data.data;
                })
            }else{
                this.levelTow = [];
            }
        },
        getData() {
            axios.get('/api/get/categoryByParentid.ashx?parentid=0').then((res)=> {
                if(res.data.state == 1) {
                    this.levelOne = res.data.data;
                }
            })
        },
        // 二级
        showChild(Id, isover, items) {
            // console.log(items.srcElement.lastChild.className);
            if(items.srcElement.lastChild.className == undefined) {
                // 二级跳转到搜索页
                this.$router.push('/search');
            }
            if(isover == 0) {
                this.isShow = false;
                axios.get(`/api/get/categoryByParentid.ashx?parentid=${Id}`).then((res)=> {
                    if(res.data.state ==1) {
                        this.levelTree = res.data.data;
                    }
                })
            }else{
                this.levelTree = [];
            }
        },
        // 三级跳转到搜索页
        threeToSearch() {
            this.$router.push('/search');
        },
        // 页面刚上来的时候右边就显示
        getRightInit() {
            axios.get('/api/get/categoryByParentid.ashx?parentid=1').then((res)=> {
                this.levelTow = res.data.data
            })
        }
    },
    mounted() {
        this.getData();
        this.getRightInit();
    }
}
</script>

<style lang="scss" scoped>
    .kecheng{
        .header{
            height: 0.54rem;
            background: #00b6cf;
            line-height: 0.54rem;
            .img1{
                width: 0.08rem;
                height: 0.16rem;
                float: left;
                margin: 0.19rem 0 0 0.16rem;
            }
            h3{
                color: #fff;
                font-size: 0.16rem;
                font-weight: normal;
                float: left;
                position: relative;
                left: 50%;
                margin-left: -0.5rem;
            }
            .img2{
                width: 0.17rem;
                height: 0.17rem;
                float: right;
                margin: 0.18rem 0.16rem 0 0;
            }
        }

        .main{
             display: flex;
            .left{
                width: 1.05rem;
                ul{
                    background: #eee;
                    li{
                        width: 1.05rem;
                        height: 0.5rem;
                        text-align: center;
                        line-height: 0.5rem;
                        color: #333;
                        font-size: 0.16rem;
                        border-bottom: 1px solid #d7d7d7;
                        &.active{
                            background: #fff;
                            color: #00B6CF;
                            border-left: .03rem solid #00BACB;
                            width: 1.03rem;
                            transition: all .3s;
                        }
                    }
                }
            }
            .right{
                flex: 1;
                margin-left: 0.16rem;
                ul{
                    li{
                        height: 0.5rem;
                        line-height: 0.5rem;
                        font-size: 0.16rem;
                        color: #4c4c4c;
                        border-bottom: 1px solid #d7d7d7;
                        padding: 0 0.16rem 0 0.1rem;
                        p{
                            float: left;
                        }
                        i{
                            float: right;
                        }
                    }
                }
            }
        }
    }
</style>
