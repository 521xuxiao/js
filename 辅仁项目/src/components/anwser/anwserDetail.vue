<template>
    <div class="anwserDetail">
        <div class="header">
            <img src="../../../static/img/返回@3x.png">
            <p>问答详情</p>
        </div>

        <div class="main">
            <div class="main-top">
                <img src="../../../static/img/组29@2x.png" class="img1">
                <div class="right">
                    <p>一川烟草</p>
                    <span>2018-10-12</span>
                    <div class="bott">
                        <img src="../../../static/img/问@3x.png" class="img2">
                        <b>多长时间可以发货，有用吗？</b>
                    </div>
                </div>
            </div>

            <div class="mask"></div>

            <div class="anwser">
                <img src="../../../static/img/答@3x.png">
                <h5>共3条买家回答</h5>
            </div>

            <ul>
                <li>
                    <img src="../../../static/img/组29@2x.png" >
                    <div class="right">
                        <h4>窗前明月光</h4>
                        <span>2018-10-21</span>
                        <b>很快就散场卡视角查看查看时间段很残酷充电口进出口的基础贷款基础的会计</b>
                    </div>
                </li><li>
                    <img src="../../../static/img/组29@2x.png" >
                    <div class="right">
                        <h4>窗前明月光</h4>
                        <span>2018-10-21</span>
                        <b>很快就散场卡视角查看查看时间段很残酷充电口进出口的基础贷款基础的会计</b>
                    </div>
                </li><li>
                    <img src="../../../static/img/组29@2x.png" >
                    <div class="right">
                        <h4>窗前明月光</h4>
                        <span>2018-10-21</span>
                        <b>很快就散场卡视角查看查看时间段很残酷充电口进出口的基础贷款基础的会计</b>
                    </div>
                </li><li>
                    <img src="../../../static/img/组29@2x.png" >
                    <div class="right">
                        <h4>窗前明月光</h4>
                        <span>2018-10-21</span>
                        <b>很快就散场卡视角查看查看时间段很残酷充电口进出口的基础贷款基础的会计</b>
                    </div>
                </li><li>
                    <img src="../../../static/img/组29@2x.png" >
                    <div class="right">
                        <h4>窗前明月光</h4>
                        <span>2018-10-21</span>
                        <b>很快就散场卡视角查看查看时间段很残酷充电口进出口的基础贷款基础的会计</b>
                    </div>
                </li><li>
                    <img src="../../../static/img/组29@2x.png" >
                    <div class="right">
                        <h4>窗前明月光</h4>
                        <span>2018-10-21</span>
                        <b>很快就散场卡视角查看查看时间段很残酷充电口进出口的基础贷款基础的会计</b>
                    </div>
                </li><li>
                    <img src="../../../static/img/组29@2x.png" >
                    <div class="right">
                        <h4>窗前明月光</h4>
                        <span>2018-10-21</span>
                        <b>很快就散场卡视角查看查看时间段很残酷充电口进出口的基础贷款基础的会计</b>
                    </div>
                </li><li>
                    <img src="../../../static/img/组29@2x.png" >
                    <div class="right">
                        <h4>窗前明月光</h4>
                        <span>2018-10-21</span>
                        <b>很快就散场卡视角查看查看时间段很残酷充电口进出口的基础贷款基础的会计</b>
                    </div>
                </li>
            </ul>

            <div class="footer">
                <input type="text" placeholder="帮考友解答疑惑，4-14字">
                <button type="button">回答</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
}
</script>

<style lang="scss" scoped>
    .header{
        background: #00BCC9;
        height: .54rem;
        line-height: .54rem;
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
        img{
            width: .08rem;
            height: .16rem;
            position: absolute;
            left: .16rem;
            top: .19rem;
        }
        p{
            text-align: center;
            font-size: .16rem;
            color: #fff;
        }
    }

    .main{
        padding: .55rem 0 .6rem 0;
        .main-top{
            display: flex;
            padding-bottom: .11rem;
            .img1{
                width: .34rem;
                height: .34rem;
                margin: .09rem 0 0 .14rem;
            }
            .right{
                flex: 1;
                margin: .14rem 0 0 .09rem;
                p{
                    color: #333;
                    font-size: .14rem;
                }
                span{
                    display: block;
                    color: #666;
                    font-size: .09rem;
                    margin: .05rem 0 .09rem 0;
                }
                .bott{
                    font-size: .16rem;
                    color: #333;
                    .img2{
                        width: .18rem;
                        height: .18rem;
                    }
                }
            }
        }

        .mask{
            width: 100%;
            height: .08rem;
            background: #eee;
        }

        .anwser{
            height: .23rem;
            width: 100%;
            padding: .05rem 0 .05rem .21rem;
            border-bottom: 1px solid #EFEFEF;
            img{
                width: .14rem;
                height: .14rem;
                float: left;
            }
            h5{
                font-size: .13rem;
                color: #00bacb;
                font-weight: normal;
                float: left;
                margin-left: .15rem;
            }
        }

        ul{

            li{
                display: flex;
                padding-right: .05rem;
                img{
                    width: .35rem;
                    height: .35rem;
                    margin-top: .15rem;
                    margin-left: .14rem;
                }
                div.right{
                    flex: 1;
                    margin-top: .18rem;
                    margin-left: .1rem;
                    h4{
                        font-size: .14rem;
                        color: #333;
                        font-weight: normal;
                    }
                    span{
                        display: block;
                        font-size: .09rem;
                        color: #666;
                        margin: .05rem 0 .09rem 0;
                    }
                    b{
                        color: #333;
                        font-size: .16rem;
                    }
                }
            }
        }

        .footer{
            height: .48rem;
            width: 100%;
            border-top: 1px solid #D3D3D3;
            position: fixed;
            bottom: 0;
            left: 0;
            background: #fff;
            text-align: center;
            padding-top: .1rem;
            input{
                border: 0;
                outline: 0;
                background: #F4F3F3;
                width: 60%;
                height: .3rem;
                border-radius: .14rem;
                padding: 0 .1rem;
                color: #bcbcbc;
                font-size: .14rem;
            }
            button{
                width: .5rem;
                height: .3rem;
                border-radius: .15rem;
                background: #00B0C0;
                color: #fff;
                border: 0;
                outline: 0;
            }
        }
    }
</style>
