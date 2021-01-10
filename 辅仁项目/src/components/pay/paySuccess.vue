<template>
    <div class="pay">
        <div class="header">
            <img src="../../../static/img/返回@3x.png">
            <div class="title">支付成功</div>
        </div>

        <div class="main">
            <img src="../../../static/img/f96592d67d91b0e8447b1958452d4cb3.png" >
            <h3>支付成功</h3>
            <p>支付金额</p>
            <span>￥48.00</span>
        </div>

        <div class="footer">
            <button type="button" class="btnL">查看订单</button>
            <button type="button" class="btnR">返回首页</button>
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
        background: #00BCC9;
        position: relative;
        img{
            width: .08rem;
            height: .16rem;
            position: absolute;
            left: .16rem;
            top: .19rem;
        }
        .title{
            text-align: center;
            font-size: .16rem;
            line-height: .54rem;
            color: #fff;
        }
    }

    .main{
        padding-top: .57rem;
        color: #333;
        img{
            display: block;
            width: 1.23rem;
            height: .95rem;
            margin: 0 auto;
        }
        h3{
            text-align: center;
            font-size: .15rem;
            font-weight: normal;
            margin-top: .1rem;
        }
        p{
            text-align: center;
            font-size: .14rem;
            font-weight: normal;
            margin-top: .35rem;
        }
        span{
            display: block;
            text-align: center;
            font-size: .27rem;
            font-weight: normal;
            margin-top: .09rem;
        }
    }

    .footer{
        padding-top: .37rem;
        text-align: center;
        .btnL{
            width: 1rem;
            height: .3rem;
            border: 1px solid #00BACB;
            outline: none;
            font-size: .14rem;
            color: #00BACB;
            background: #fff;
            border-radius: .05rem;
        }
        .btnR{
            width: 1rem;
            height: .3rem;
            border: 1px solid #00BACB;
            outline: none;
            font-size: .14rem;
            color: #fff;
            background: #00BACB;
            border-radius: .05rem;
            margin-left: .2rem;
        }
    }
</style>
