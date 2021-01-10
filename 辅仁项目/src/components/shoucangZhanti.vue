<template>
    <div>
        <div class="header">
            <img src="../../static/img/返回@3x.png">
            <h3>我的收藏</h3>
        </div>

        <div class="main">
            <div class="search" @click="toSearch">
                <strong>
                    <img src="../../static/img/组3@3x.png" >
                    <p>搜索</p>
                </strong>
            </div>

            <ul>
                <li>
                    <div class="top">
                        <em>A1</em>
                        <h4>k可达刷卡的基础卡啊狂顶沙克</h4>
                    </div>
                    <div class="center">
                        <h2>客户存口径合适的客户存口径合适的客户存口径合适的客户存款</h2>
                        <h5>第二张</h5>
                    </div>
                    <p>解析：</p>
                    <span>就看到的到看哈迪斯卡擦就开始哈就是客户的显卡就是</span>
                </li>
                <li>
                    <div class="top">
                        <em>A1</em>
                        <h4>k可达刷卡的基础卡啊狂顶沙克</h4>
                    </div>
                    <div class="center">
                        <h2>客户存口径合适的客户存口径合适的客户存口径合适的客户存款</h2>
                        <h5>第二张</h5>
                    </div>
                    <p>解析：</p>
                    <span>就看到的到看哈迪斯卡擦就开始哈就是客户的显卡就是</span>
                </li>
                <li>
                    <div class="top">
                        <em>A1</em>
                        <h4>k可达刷卡的基础卡啊狂顶沙克</h4>
                    </div>
                    <div class="center">
                        <h2>客户存口径合适的客户存口径合适的客户存口径合适的客户存款</h2>
                        <h5>第二张</h5>
                    </div>
                    <p>解析：</p>
                    <span>就看到的到看哈迪斯卡擦就开始哈就是客户的显卡就是</span>
                </li>
                <li>
                    <div class="top">
                        <em>A1</em>
                        <h4>k可达刷卡的基础卡啊狂顶沙克</h4>
                    </div>
                    <div class="center">
                        <h2>客户存口径合适的客户存口径合适的客户存口径合适的客户存款</h2>
                        <h5>第二张</h5>
                    </div>
                    <p>解析：</p>
                    <span>就看到的到看哈迪斯卡擦就开始哈就是客户的显卡就是</span>
                </li>
                <li>
                    <div class="top">
                        <em>A1</em>
                        <h4>k可达刷卡的基础卡啊狂顶沙克</h4>
                    </div>
                    <div class="center">
                        <h2>客户存口径合适的客户存口径合适的客户存口径合适的客户存款</h2>
                        <h5>第二张</h5>
                    </div>
                    <p>解析：</p>
                    <span>就看到的到看哈迪斯卡擦就开始哈就是客户的显卡就是</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{

        }
    },
    methods: {
        toSearch() {
            this.$router.push('/shoucangSearch');
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
    .header{
        z-index: 5;
        height: .54rem;
        line-height: .54rem;
        width: 100%;
        background: #00BCC9;
        position: fixed;
        left: 0;
        top: 0;
        img{
            display: block;
            width: .08rem;
            height: .16rem;
            position: absolute;
            left: .16rem;
            top: .19rem;
        }
        h3{
            text-align: center;
            font-weight: normal;
            font-size: .16rem;
            color: #fff;
        }
    }

    .main{
        padding-top: .68rem;
        .search{
            width: 90%;
            height: .3rem;
            border-radius: .15rem;
            margin: 0 auto;
            background: #F4F3F3;
            color: #dbdbdb;
            font-size: .14rem;
            strong{
                display: block;
                font-weight: normal;
                overflow: hidden;
                width: .45rem;
                margin: 0 auto;
                img{
                    width: .12rem;
                    height: .13rem;
                    float: left;
                    margin-top: .07rem;
                }
                p{
                    float: left;
                    margin-left: .04rem;
                    margin-top: .04rem;
                }
            }
        }

        ul{
            padding: 0 .16rem;
            margin-top: .13rem;
            li{
                margin-top: .4rem;
                .top{
                    overflow: hidden;
                    em{
                        display: block;
                        float: left;
                        width: .27rem;
                        height: .18rem;
                        background: #00BCC9;
                        border-radius: 0 .08rem .08rem .08rem;
                        color: #fff;
                        text-align: center;
                        line-height: .18rem;
                    }
                    h4{
                        font-size: .16rem;
                        color: #333;
                        font-weight: normal;
                        margin-left: .08rem;
                        float: left;
                    }
                }
                .center{
                    margin-top: .24rem;
                    overflow: hidden;
                    background: #eee;
                    color: #fff;
                    padding: .07rem;
                    position: relative;
                    h2{
                        float: left;
                        font-size: .15rem;
                        font-weight: normal;
                        width: 88%;
                        color: #4c4c4c;
                    }
                    h5{
                        float: right;
                        color: #666;
                        font-size: .11rem;
                        font-weight: normal;
                        position: absolute;
                        bottom: .07rem;
                        right: .07rem;
                    }
                }
                p{
                    font-size: .11rem;
                    color: #4c4c4c;
                    margin-top: .2rem;
                    padding: 0 .1rem;
                }
                span{
                    display: block;
                    font-size: .1rem;
                    color: #333;
                    padding: .08rem .1rem 0;
                }
            }
        }
    }
</style>
