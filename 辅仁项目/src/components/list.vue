<template>
    <div class="list">
        <div class="header">
            <img src="../../static/img/返回@3x.png"  @click="back">
            <h3>{{content}}</h3>
        </div>
        <i></i>

        <ul>
            <li v-for="(item, index) in dataList" :key="index" @click="todDetail">
                <div class="left">{{item.pname}}</div>
                <div class="right">
                    <span>2{{item.count}}</span>
                    <img src="../../static/img/youjian.png">
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
import storage from '../../static/js/store.js';
export default {
    data() {
        return{
            x: 0,
            uid: 0,
            content: '',
            dataList: []
        }
    },
    methods: {
        back() {
            window.history.go(-1);
        },

        getData() {
            let param = `type=${this.x}&uid=${this.uid}`;
            let md5 = this.$md5(param);
            let key = md5.substr(6,6);
            let url = `/api/get/userclass.ashx?key=${key}&type=${this.x}&uid=${this.uid}`;
            axios.get(url).then((res)=> {
                if(res.data.state == 1) {
                    this.dataList = res.data.data;
                }
            })
        },

        todDetail() {
            this.$router.push('/detail');
        }
    },
    mounted() {
        this.x = this.$route.query.x;
        this.uid = storage.get('uid');
        this.content = this.$route.query.content;
        this.getData();
    },
    beforeDestroy() {
        this.content = '';
    }
}
</script>

<style lang="scss" scoped>
    .header{
        background: #00BDC8;
        height: .54rem;
        line-height: .54rem;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        img{
            display: block;
            width: .08rem;
            height: .16rem;
            position: absolute;
            left: .16rem;
            top: .18rem;
        }
        h3{
            font-size: .16rem;
            color: #fff;
            text-align: center;
            font-weight: normal;
        }
    }

    i{
        display: block;
        padding-top: .54rem;
        height: .08rem;
        background: #EEEEEE;
    }

    ul{
        padding: 0 .16rem;
        li{
            height: .4rem;
            line-height: .4rem;
            border-bottom: 1px solid #eee;
            .left{
                float: left;
                font-size: .13rem;
                color: #333;
            }
            .right{
                float: right;
                overflow: hidden;
                font-size: .11rem;
                color: #666;
                span{
                    display: block;
                    float: left;
                }
                img{
                    display: block;
                    width: .06rem;
                    height: .1rem;
                    float: left;
                    margin-top: .14rem;
                    margin-left: .08rem;
                }
            }
        }
    }
</style>
