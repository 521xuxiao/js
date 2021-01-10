<template>
    <div class="search">
        <div class="header">
            <img src="../../../static/img/返回@3x.png">
            <input type="text" placeholder="请输入商品名称">
            <span>搜索</span>
        </div>

        <div class="main">
            <div class="main-top">
                <div class="title">
                    <h3>历史搜索</h3>
                    <img src="../../../static/img/830500992270380691.png">
                </div>
                <ul>
                    <li>小炒</li>
                    <li>副高</li>
                    <li>题库</li>
                    <li>小炒</li>
                    <li>中医妇科学</li>
                    <li>小炒</li>
                    <li>副高</li>
                    <li>题库</li>
                    <li>小炒</li>
                    <li>中医妇科学</li>
                </ul>
            </div>
            <div class="main-bottom">
                <div class="title">热门搜索</div>
                <ul>
                    <li>小炒</li>
                    <li>副高</li>
                    <li>题库</li>
                    <li>小炒</li>
                    <li>中医妇科学</li>
                    <li>小炒</li>
                    <li>副高</li>
                    <li>题库</li>
                    <li>小炒</li>
                </ul>
            </div>
        </div>

        <div class="footer">
            <div class="fooInner">
                <img src="../../../static/img/语音@3x.png" >
                <span>按住说出你要的资料</span>
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

    .main{
        padding: .54rem 0 .6rem 0;
        .main-top{
            .title{
                overflow: hidden;
                h3{
                    float: left;
                    font-size: .16rem;
                    line-height: .44rem;
                    color: #333;
                    font-weight: normal;
                    padding-left: .17rem;
                }
                img{
                    display: block;
                    float: right;
                    width: .12rem;
                    height: .14rem;
                    margin: .14rem .2rem 0 0;
                }
            }
            ul{
                padding: 0 .1rem;
                display: flex;
                justify-content: space-around;
                flex-wrap: wrap;
                li{
                    background: #F6F6F6;
                    padding: .1rem .15rem;
                    border-radius: .2rem;
                    margin-top: .2rem;
                }
            }
        }
        .main-bottom{
            padding-top: .2rem;
            .title{
                font-size: .16rem;
                line-height: .44rem;
                color: #333;
                font-weight: normal;
                padding-left: .17rem;
            }
            ul{
                padding: 0 .1rem;
                display: flex;
                justify-content: space-around;
                flex-wrap: wrap;
                li{
                    background: #F6F6F6;
                    padding: .1rem .15rem;
                    border-radius: .2rem;
                    margin-top: .2rem;
                }
            }
        }
    }

    .footer{
        width: 100%;
        height: .58rem;
        background: #EEEEEE;
        position: fixed;
        bottom: 0;
        left: 0;
        .fooInner{
            width: 80%;
            height: .33rem;
            border-radius: .1rem;
            margin: .14rem auto 0;
            background: #DDDDDD;
            text-align: center;
            padding-top: .06rem;
            box-sizing: border-box;
            img{
                width: .09rem;
                height: .18rem;
            }
            span{
                font-size: .14rem;
                color: #333;
                margin-left: .15rem;
            }
        }
    }
</style>
