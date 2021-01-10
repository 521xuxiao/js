<template>
    <div class="zixun">
        <div class="header">
            <img src="../../static/img/返回@3x.png">
            <input type="text" placeholder="请输入商品名称">
            <span>搜索</span>
        </div>
        <div class="main">
            <!-- tab页 -->
            <ul class="tab">
                <li v-for="(item, index) in list" @click="changeColor(index)" :class="{'active': currentIndex==index}">{{item.name}}</li>
            </ul>
            <!-- tab1显示 -->
            <ul class="tabDetail" v-if="currentIndex==0">
                <li>
                    <p>如果有一条狗，曾经爱我如生命</p>
                    <span>是的空间和教科书的火车开了上课讲的回复会计师德川家康好了深V盛开的建行卡多喝水是进口法国人擦脸的库存量</span>
                    <img src="../../static/img/1542011576(1).jpg">
                </li>
                <li>
                    <p>如果有一条狗，曾经爱我如生命</p>
                    <span>是的空间和教科书的火车开了上课讲的回复会计师德川家康好了深V盛开的建行卡多喝水是进口法国人擦脸的库存量</span>
                    <img src="../../static/img/1542011576(1).jpg">
                </li>
            </ul>
            <ul class="tabDetailBott" v-if="currentIndex==0">
                <li>
                    <div class="left">
                        <p>顺时而动看电视中了右健康的顺记再是</p>
                        <span>海口市骄傲和看见萨科技喜欢看见爱上悬壶济世噶持久化观察室从啥空间和西安市科技好徐昂书</span>
                    </div>
                    <img src="../../static/img/1542012862(1).jpg">
                </li>
                <li>
                    <div class="left">
                        <p>顺时而动看电视中了右健康的顺记再是</p>
                        <span>海口市骄傲和看见萨科技喜欢看见爱上悬壶济世噶持久化观察室从啥空间和西安市科技好徐昂书</span>
                    </div>
                    <img src="../../static/img/1542012862(1).jpg">
                </li>
            </ul>
            <!-- tab2显示 -->
            <ul v-if="currentIndex==1">热点</ul>
            <ul v-if="currentIndex==2">运动</ul>
            <ul v-if="currentIndex==3">营养</ul>
            <ul v-if="currentIndex==4">健康</ul>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return{
            list: [{name: '题到头条'}, {name: '热点'}, {name: '运动'}, {name: '营养'}, {name: '健康'}],
            currentIndex: 0
        }
    },
    methods: {
        changeColor(n) {
            this.currentIndex = n;
        }
    }
}
</script>

<style lang="scss" scoped>
.zixun{
    background: #eee;
}
.header{
    height: .54rem;
    width: 100%;
    background: #00BBCA;
    position: fixed;
    top: 0;
    left: 0;
    padding-top: .15rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -o-box-sizing: border-box;
    img{
        width: .08rem;
        height: .16rem;
        position: absolute;
        left: .16rem;
        top: .19rem;
    }
    input{
        background: #fff url(../../static/img/589345584270619180.png) no-repeat .05rem center;
        width: 60%;
        height: .24rem;
        border: 0;
        outline: 0;
        border-radius: .12rem;
        font-size: .14rem;
        color: #999;
        padding: 0 .05rem 0 .28rem;
        box-sizing: border-box;
        display: block;
        margin: 0 auto;
    }
    span{
        position: absolute;
        right: .16rem;
        top: .16rem;
        color: #fff;
        font-size: .14rem;
    }
}

.main{
    padding: .55rem 0 .65rem 0;
    ul.tab{
        display: flex;
        padding: .1rem .05rem 0 .05rem;
        background: #fff;
        li{
            flex: 1;
            text-align: center;
            color: #666;
            font-size: .16rem;
            padding: .1rem 0;
            &.active{
                color: #00BACB;
                border-bottom: .03rem solid #00BACB;
                transition: all .3s;
            }
        }
    }
    ul.tabDetail{
        padding: 0 .1rem;
        background: #fff;
        li{
            padding: .2rem 0 .1rem 0;
            border-bottom: 1px solid #eee;
            p{
                font-size: .14rem;
                color: #4c4c4c;
            }
            span{
                color: #666;
                font-size: .12rem;
                margin: .1rem 0;
                display: block;
            }
            img{
                width: 100%;
                height: 1.68rem;
                margin: 0 auto;
                display: block;
            }
        }
    }

    ul.tabDetailBott{
        margin-top: .08rem;
        background: #fff;
        padding: 0 .1rem;
        li{
            display: flex;
            padding: .1rem 0;
            border-bottom: 1px solid #eee;
            .left{
                flex: 1;
                p{
                    font-size: .14rem;
                    color: #4c4c4c;
                }
                span{
                    font-size: .12rem;
                    color: #666;
                    margin-top: .13rem;
                }
            }
            img{
                width: 1.3rem;
                height: .77rem;
                margin-left: .09rem;
            }
        }
    }
}
</style>
