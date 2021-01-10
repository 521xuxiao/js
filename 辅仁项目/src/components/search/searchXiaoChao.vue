<template>
    <div class="searchXiaoChao">
        <div class="header">
            <img src="../../../static/img/返回@3x.png">
            <input type="text" placeholder="小抄">
            <span>搜索</span>
        </div>

        <ul class="ul">
            <li>
                <div class="inner">
                    <img src="../../../static/img/组29@2x.png" >
                    <div class="right">
                        <p>2018年临床试验2018年临床试验</p>
                        <b>[九年义务教育九年义]</b>
                        <span>
                            <s>分享价：<i>￥48</i></s>  <strong>已购人数：22608人</strong>
                        </span>
                    </div>
                </div>
            </li><li>
                <div class="inner">
                    <img src="../../../static/img/组29@2x.png" >
                    <div class="right">
                        <p>2018年临床试验2018年临床试验</p>
                        <b>[九年义务教育九年义]</b>
                        <span>
                            <s>分享价：<i>￥48</i></s>  <strong>已购人数：22608人</strong>
                        </span>
                    </div>
                </div>
            </li><li>
                <div class="inner">
                    <img src="../../../static/img/组29@2x.png" >
                    <div class="right">
                        <p>2018年临床试验2018年临床试验</p>
                        <b>[九年义务教育九年义]</b>
                        <span>
                            <s>分享价：<i>￥48</i></s>  <strong>已购人数：22608人</strong>
                        </span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return{

        }
    },
    methods: {

    },
    mounted() {
        var searchXiaoChaoDom = document.querySelector('.searchXiaoChao');
        searchXiaoChaoDom.style.height = document.documentElement.clientHeight + 'px';
    }
}
</script>

<style lang="scss" scoped>
    .searchXiaoChao{
        background: #EEEEEE;
    }
    .header{
        height: .54rem;
        width: 100%;
        background: #00BBCA;
        position: fixed;
        top: 0;
        left: 0;
        img{
            width: .08rem;
            height: .16rem;
            position: relative;
            left: .16rem;
            top: .19rem;
        }
        input{
            background: #fff url(../../../static/img/589345584270619180.png) no-repeat .05rem center;
            width: 2.60rem;
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
            position: relative;
            left: 91%;
            top: -.26rem;
            color: #fff;
            font-size: .14rem;
        }
    }

    .ul{
        padding-top: .6rem;
        li{
            padding: .05rem .08rem;
            .inner{
                display: flex;
                background: #fff;
                padding: .08rem;
                img{
                    width: .66rem;
                    height: .66rem;
                }
                .right{
                    flex: 1;
                    margin-left: .08rem;
                    font-size: .16rem;
                    p{
                        color: #333;
                    }
                    b{
                        color: #00aac1;
                        display: block;
                        margin-top: .05rem;
                    }
                    span{
                        font-size: .14rem;
                        color: #333;
                        display: block;
                        overflow: hidden;
                        margin-top: .08rem;
                        s{
                            float: left;
                            i{
                                color: #00aac1;
                            }
                        }
                        strong{
                            float: right;
                            font-weight: normal;
                            color: #a9a9a9;

                        }
                    }
                }
            }
        }
    }
</style>
