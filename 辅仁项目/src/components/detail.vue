<template>
    <div class="detail">
        <div class="header">
            <img src="../../static/img/返回@3x.png" @click="toBack">
            <h3>题道商城</h3>
        </div>

        <div class="main">
            <div class="title">
                <img src="../../static/img/组29@2x.png" >
                <p class="p1">临床职业医师（含助理）</p>
                <p class="p2">资格考试考点精编</p>
                <span>题道教育科研中心<b>编</b></span>
            </div>

            <div class="price">
                <div class="top">
                    <p>2018年临床执业医师（含助理）考点精编小抄版[九年经验结晶，已助万名医师通关]</p>
                </div>
                <div class="middle">
                    <div class="left">
                        <p>￥48&nbsp;<b>分享优惠</b></p>
                        <span>分享到朋友圈立减20元</span>
                    </div>
                    <div class="right">
                        <p>原价：￥68</p>
                        <span>已售： 898778</span>
                    </div>
                </div>
                <ul class="bottom">
                    <li>服务承诺：</li>
                    <li>全平台学习体验</li>
                    <li>题道名师出品</li>
                </ul>
            </div>

            <div class="evaluate">
                <div class="top">
                    <p>已购买小伙伴评价（321413）</p>
                    <div class="right">
                        <span>好评度</span>
                        <b>98%</b>
                        <i class="iconfont icon-icon-test"></i>
                    </div>
                </div>
                <div class="button">
                    <button type="button">全是考点</button>
                    <button type="button">很不错</button>
                    <button type="button">很好</button>
                    <button type="button">好</button><button type="button">全是考点</button>
                    <button type="button">很不错</button>
                    <button type="button">很好</button>
                    <button type="button">好</button><button type="button">全是考点</button>
                    <button type="button">很不错</button>
                    <button type="button">很好</button>
                    <button type="button">好</button>
                </div>
                <ul class="ul">
                    <li>
                        <div class="top">
                            <img src="../../static/img/组29@2x.png" >
                            <span>预防冯晓灿</span>
                        </div>
                        <p>很快就爱上安徽跨世纪的花草滑块的金卡回家说的缓存看见市场空间环境看</p>
                    </li>
                    <li>
                        <div class="top">
                            <img src="../../static/img/组29@2x.png" >
                            <span>预防冯晓灿</span>
                        </div>
                        <p>很快就爱上安徽跨世纪的花草滑块的金卡回家说的缓存看见市场空间环境看</p>
                    </li>
                    <li>
                        <div class="top">
                            <img src="../../static/img/组29@2x.png" >
                            <span>预防冯晓灿</span>
                        </div>
                        <p>很快就爱上安徽跨世纪的花草滑块的金卡回家说的缓存看见市场空间环境看</p>
                    </li>
                    <button type="button" class="btn">查看全部评价</button>
                </ul>
            </div>

            <div class="question">
                <div class="top">
                    <p>问大家（123）</p>
                    <i class="iconfont icon-icon-test"></i>
                </div>
                <ul class="quetionUl">
                    <li>
                        <img src="../../static/img/答@3x.png" >
                        <p>口袋书效果好吗？通过率多少？</p>
                        <span>3个回答</span>
                    </li>
                    <li>
                        <img src="../../static/img/答@3x.png" >
                        <p>口袋书效果好吗？通过率多少？</p>
                        <span>3个回答</span>
                    </li>
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

        }
    },
    methods: {
        toBack() {
            window.history.go(-1);
        }
    }
}
</script>

<style lang="scss" scoped>
    .detail{
        background: #eee;
    }
    .header{
        width: 100%;
        height: .54rem;
        line-height: .54rem;
        background: #00BAC9;
        position: fixed;
        left: 0;
        top: 0;
        img{
            position: absolute;
            width: .08rem;
            height: .16rem;
            top: .23rem;
            left: .16rem;
        }
        h3{
            text-align: center;
            font-size: .16rem;
            color: #fff;
            font-weight: normal;
        }
    }

    .main{
        padding: .55rem 0 0 0;
        .title{
            padding: .22rem 0 .19rem 0;
            font-size: .23rem;
            color: #333;
            font-weight: 700;
            background: #EEEEEE;
            img{
                width: .3rem;
                height: .3rem;
                display: block;
                margin: 0 auto 0;
            }
            .p1{
                text-align: center;
                margin: .25rem 0 .11rem 0;
            }
            .p2{
                text-align: center;
            }
            span{
                font-size: .09rem;
                color: #666;
                font-weight: normal;
                display: block;
                text-align: center;
                margin-top: .35rem;
                b{
                    margin-left: .04rem;
                }
            }
        }

        .price{
            background: #fff;
            padding: 0 .18rem;
            .top{
                border-bottom: 1px solid #ebebeb;
                p{
                    font-size: .16rem;
                    color: #333;
                    padding: .16rem .05rem .16rem 0;
                }
            }
            .middle{
                overflow: hidden;
                padding: .15rem 0 .15rem 0;
                border-bottom: 1px solid #ebebeb;
                .left{
                    float: left;
                    font-size: .27rem;
                    color: #00bacb;
                    p{
                        b{
                            font-size: .13rem;
                            border: 1px solid #00bacb;
                            padding: .02rem;
                            border-radius: .05rem;
                            margin-top: -.03rem;
                            display: inline-block;
                        }
                    }
                    span{
                        font-size: .14rem;
                        color: #333;
                        display: block;
                    }
                }
                .right{
                    float: right;
                    font-size: .14rem;
                    color: #333;
                    margin-right: .1rem;
                    padding-top: .05rem;
                    span{
                        margin-top: .05rem;
                        display: block;
                    }
                }
            }

            ul.bottom{
                display: flex;
                font-size: .14rem;
                color: #333;
                li{
                    flex: 1;
                    text-align: center;
                    padding: .1rem 0;
                }
            }
        }

        .evaluate{
            margin-top: .08rem;
            background: #fff;
            padding: .1rem .2rem;
            .top{
                overflow: hidden;
                p{
                    float: left;
                    font-size: .15rem;
                    color: #333;
                }
                .right{
                    float: right;
                    overflow: hidden;
                    font-size: .14rem;
                    span{
                        display: block;
                        float: left;
                        color: #333;
                    }
                    b{
                        display: block;
                        float: left;
                        color: #18BCCC;
                        margin: 0 .05rem;
                    }
                    i{
                        display: block;
                        float: left;
                    }
                }
            }
            .button{
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                button{
                    display: block;
                    height: .14rem;
                    line-height: .12rem;
                    color: #666;
                    font-size: .11rem;
                    border: 1px solid #08C0BE;
                    outline: 0;
                    background: #F0FEFE;
                    border-radius: .06rem;
                    margin: .1rem .08rem 0;
                    &:first-child{
                        margin-left: 0;
                    }
                }
            }

            .ul{
                padding-top: .15rem;
                li{
                    border-bottom: 1px solid #eee;
                    padding: .1rem 0;
                    &:last-child{
                        border-bottom: 0;
                    }
                    .top{
                        overflow: hidden;
                        img{
                            width: .17rem;
                            height: .17rem;
                            display: block;
                            float: left;
                        }
                        span{
                            display: block;
                            float: left;
                            color: #666;
                            font-size: .12rem;
                            margin-left: .05rem;
                        }
                    }
                    p{
                        font-size: .12rem;
                        color: #4c4c4c;
                        margin-top: .08rem;
                    }
                }
                .btn{
                    width: 1rem;
                    height: .2rem;
                    background: #fff;
                    color: #333;
                    font-size: .13rem;
                    position: relative;
                    left: 50%;
                    margin-left: -.5rem;
                    border-radius: .1rem;
                    outline: 0;
                    border: 1px solid #eee;
                }
            }
        }

        .question{
            background: #fff;
            margin-top: 0.08rem;
            padding: .1rem .18rem;
            .top{
                overflow: hidden;
                p{
                    font-size: .15rem;
                    color: #333;
                    float: left;
                }
                i{
                    float: right;
                    font-size: .14rem;
                }
            }
            .quetionUl{
                li{
                    overflow: hidden;
                    padding: .1rem 0;
                    img{
                        width: .13rem;
                        height: .13rem;
                        display: block;
                        float: left;
                    }
                    p{
                        float: left;
                        font-size: .13rem;
                        color: #4c4c4c;
                        margin-left: .05rem;
                    }
                    span{
                        display: block;
                        float: right;
                        font-size: .12rem;
                        color: #666;
                    }
                }
            }
        }
    }
</style>
