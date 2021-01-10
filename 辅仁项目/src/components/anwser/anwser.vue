<template>
    <div class="anwser">
        <div class="header">
            <img src="../../../static/img/返回@3x.png">
            <p>问大家</p>
        </div>

        <div class="main">
            <div class="title">关于临床执业笔试小炒口袋书都<b>2</b>个问题</div>

            <ul>
                <li>
                    <h4>
                        <img src="../../../static/img/问@3x.png">
                        <span>口袋书效果好吗？通过率多少？</span>
                    </h4>
                    <div class="box">
                        <div class="top">
                            <img src="../../../static/img/答@3x.png">
                            <h6>知识点梳理很清楚，效率好高</h6>
                        </div>
                        <div class="bottom">
                            <i>全部<strong>3</strong>个回答</i>
                            <b>更新于2018-10-21</b>
                        </div>
                    </div>
                </li>
                <li>
                    <h4>
                        <img src="../../../static/img/问@3x.png">
                        <span>口袋书效果好吗？通过率多少？</span>
                    </h4>
                    <div class="box">
                        <div class="top">
                            <img src="../../../static/img/答@3x.png">
                            <h6>知识点梳理很清楚，效率好高</h6>
                        </div>
                        <div class="bottom">
                            <i>全部<strong>3</strong>个回答</i>
                            <b>更新于2018-10-21</b>
                        </div>
                    </div>
                </li>
                <li>
                    <h4>
                        <img src="../../../static/img/问@3x.png">
                        <span>口袋书效果好吗？通过率多少？</span>
                    </h4>
                    <div class="box">
                        <div class="top">
                            <img src="../../../static/img/答@3x.png">
                            <h6>知识点梳理很清楚，效率好高</h6>
                        </div>
                        <div class="bottom">
                            <i>全部<strong>3</strong>个回答</i>
                            <b>更新于2018-10-21</b>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="footer">
            <input type="text" placeholder="向14127位已经买过的考友提问，4-14字">
            <button type="button">提问</button>
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
    .title{
        font-size: .16rem;
        color: #666;
        text-align: center;
        line-height: 3;
        b{
            color: #00bacb;
        }
    }

    ul{
        li{
            padding: .1rem 0;
            h4{
                display: flex;
                padding-left: .14rem;
                img{
                    display: block;
                    width: .15rem;
                    height: .15rem;
                }
                span{
                    display: block;
                    flex: 1;
                    color: #333;
                    font-size: .15rem;
                    margin-left: .1rem;
                }
            }
            .box{
                width: 80%;
                border: 1px solid #eee;
                margin: 0 auto;
                padding: .1rem;
                box-sizing: border-box;
                margin-top: .05rem;
                .top{
                    display: flex;
                    img{
                        width: .15rem;
                        height: .15rem;
                    }
                    h6{
                        flex: 1;
                        font-size: .13rem;
                        color: #4c4c4c;
                        margin-left: .1rem;
                    }
                }
                .bottom{
                    overflow: hidden;
                    font-size: .12rem;
                    margin-top: .1rem;
                    color: #666;
                    i{
                        display: block;
                        float: left;
                        strong{
                            color: #00BACB;
                        }
                    }
                    b{
                        display: block;
                        float: right;
                    }
                }
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
</style>
