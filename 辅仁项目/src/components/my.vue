<template>
    <div class="my">
        <div class="header">
            <div class="title">我的题道</div>
            <img src="../../static/img/消息@2x.png" class="img1">
            <img src="../../static/img/组29@2x.png" class="upDown">
            <div class="userName">一川烟草</div>
        </div>

        <ul class="indent">
            <li>
                <img src="../../static/img/订单@3x.png" >
                <span>全部订单</span>
            </li>
            <li>
                <img src="../../static/img/钱包(2)@3x.png" >
                <span>待付款</span>
            </li>
            <li>
                <img src="../../static/img/待发货@3x.png" >
                <span>待发货</span>
            </li>
            <li>
                <img src="../../static/img/评价@3x.png" >
                <span>评价</span>
            </li>
        </ul>

        <div class="bgGray"></div>

        <ul class="money">
            <li>
                <span>￥30</span>
                <p>余额</p>
            </li>
            <li>
                <span>+30</span>
                <p>收益</p>
            </li>
            <li>
                <span>￥30</span>
                <p>红包</p>
            </li>
            <li>
                <span>1000</span>
                <p>积分</p>
            </li>
        </ul>

        <div class="bgGray"></div>

        <ul class="express">
            <li>
                <img src="../../static/img/课程@3x.png">
                <span>我的课程</span>
            </li>
            <li>
                <img src="../../static/img/粉丝@2x@3x.png">
                <span>我的粉丝</span>
            </li>
            <li>
                <img src="../../static/img/钱包@3x.png">
                <span>我的钱包</span>
            </li>
            <li>
                <img src="../../static/img/coupons_fill@3x.png">
                <span>我的收益</span>
            </li>

            <li>
                <img src="../../static/img/_地址@3x.png">
                <span>地址管理</span>
            </li>
            <li>
                <img src="../../static/img/设置@3x.png">
                <span>账号管理</span>
            </li>
            <li>
                <img src="../../static/img/充@3x.png">
                <span>充值返现</span>
            </li>
            <li>
                <img src="../../static/img/群蜂安全退出@3x.png">
                <span>退出账号</span>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
export default {
}
</script>

<style lang="scss" scoped>
    .my{
        padding-bottom: .63rem;
        .header{
            background: url(../../static/img/460631037042482146.png) no-repeat center;
            width: 100%;
            height: 2.09rem;
            .title{
                text-align: center;
                font-size: .2rem;
                padding-top: .15rem;
                color: #fff;
            }
            .img1{
                position: absolute;
                right: .16rem;
                top: .12rem;
                width: .22rem;
                height: .22rem;
            }
            .upDown{
                width: .52rem;
                height: .52rem;
                display: block;
                margin: .58rem auto 0;
            }
            .userName{
                font-size: .16rem;
                color: #fff;
                text-align: center;
                margin-top: .12rem;
            }
        }

        .indent{
            display: flex;
            padding: .2rem 0;
            li{
                flex: 1;
                text-align: center;
                img{
                    width: .3rem;
                    height: .3rem;
                    display: block;
                    margin: 0 auto;
                }
                span{
                    display: block;
                    margin-top: .07rem;
                    color: #333；inherit;
                    font-size: .14rem;
                }
            }
        }

        .bgGray{
            height: .08rem;
            background: #eee;
            width: 100%;
        }

        .money{
            display: flex;
            padding: .13rem 0;
            li{
                flex: 1;
                text-align: center;
                font-size: .17rem;
                color: #333;
                font-family: 'Microsoft YaHei';
                span{
                    display: block;
                }
                p{
                    margin-top: .1rem;
                }
            }
        }

        ul.express{
            overflow: hidden;
            padding-top: .2rem;
            li{
                width: 24%;
                height: .87rem;
                text-align: center;
                float: left;
                img{
                    width: .3rem;
                    height: .3rem;
                    display: block;
                    margin: 0 auto;
                }
                span{
                    display: block;
                    font-size: .14rem;
                    color: #333;
                    margin-top: .14rem;
                }
            }
        }
    }
</style>
