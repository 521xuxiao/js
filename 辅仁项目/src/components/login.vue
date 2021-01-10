<template>
    <div class="login">
        <div class="header">
            登 录
        </div>
        <div class="main">
            <div class="phone">
                <i class='iconfont icon-shoujihao'></i>
                <input type="text"  v-model="phoneNum" placeholder="请输入您的登录手机" autocomplete="on">
            </div>
            <div class="password">
                <i class='iconfont icon-denglumima'></i>
                <input type="password" v-model="loginPassword" placeholder="请输入您的登录密码" autocomplete="on">
            </div>

            <div class="bott">
                <div class="top">
                    <input type="checkbox" v-model="isChecked" >
                    <span>记住密码</span>
                    <b @click="fogetPassword">忘记密码？</b>
                </div>
                <div class="bottom">
                    <button type="button" @click="toRegistration">注 册</button>
                    <button type="button" class="right" @click="loginData">登 录</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { Toast } from 'mint-ui';
import Vue from 'vue'
import 'mint-ui/lib/style.css'
Vue.component(Toast.name, Toast);
import session from '../../static/js/session.js';
import storage from '../../static/js/store.js';
export default {
    data() {
        return{
            phoneNum: '',
            loginPassword: '',
            isChecked: true
        }
    },
    methods: {
        loginData() {
            if(this.phoneNum&&this.loginPassword) {
                var param = `name=${this.phoneNum}&pwd=${this.loginPassword}`
                var md5 = this.$md5(param);
                var key = md5.substr(6,6);
                let url = `/api/chk/login.ashx?key=${key}&name=${this.phoneNum}&pwd=${this.loginPassword}`;
                axios.get(url).then((res)=> {
                    // console.log(res.data.data.id);
                    if(res.data.state == 1) {
                        this.$router.push('/lianxi');
                        // 将uid存到localStorage里
                        storage.set('uid', res.data.data.id);
                        if(this.isChecked) {
                            storage.set('username', this.phoneNum);
                            storage.set('password', this.loginPassword);
                        }else{
                            storage.remove('username', this.phoneNum);
                            storage.remove('password', this.loginPassword);
                        }
                    }else{
                        Toast({
                            message: '用户名和密码不正确',
                            duration: 2000
                        });
                    }
                })
            }else{
                Toast({
                    message: '请输入用户名和密码',
                    duration: 2000
                });
            }
        },

        toRegistration() {
            this.$router.push('/registration');
        },

        fogetPassword() {
            this.$router.push('/forgotPassword');
        },
        rememberPassword() {
            if(storage.get('username')) {
                this.phoneNum = storage.get('username');
                this.loginPassword = storage.get('password');
            }
        }
    },

    mounted() {
        this.rememberPassword();
    }
}
</script>

<style lang="scss" scoped>
    .login{
        padding: .2rem .2rem 0;
        .header{
            width: 100%;
            height: .54rem;
            background: #00D2C7;
            position: fixed;
            top: 0;
            left: 0;
            color: #fff;
            font-size: .18rem;
            text-align: center;
            line-height: .54rem;
        }
        .main{
            padding-top: .55rem;
        }
        .phone{
            width: 100%;
            height: .5rem;
            border-bottom: 1px solid #ccc;
            padding: 0 .05rem;
            box-sizing: border-box;
            i{
                font-size: .2rem;
                margin-top: .05rem;
                color: #00D2C7;
            }
            input{
                width: 90%;
                height: 100%;
                border: 0;
                outline: 0;
                font-size: .16rem;
                color: #999;
                border-bottom: 1px solid #ccc;
                padding-left: .08rem;
                // box-sizing: border-box;
            }
        }
        .password{
            width: 100%;
            height: .5rem;
            border-bottom: 1px solid #ccc;
            padding: 0 .05rem;
            box-sizing: border-box;
            i{
                font-size: .2rem;
                margin-top: .05rem;
                color: #00D2C7;
            }
            input{
                width: 90%;
                height: 100%;
                border: 0;
                outline: 0;
                font-size: .16rem;
                color: #999;
                border-bottom: 1px solid #ccc;
                padding-left: .08rem;
                // box-sizing: border-box;
            }
        }

        .bott{
            .top{
                overflow: hidden;
                padding: .2rem .2rem 0 .2rem;
                font-size: .16rem;
                input{
                    display: block;
                    float: left;
                    width: .14rem;
                    height: .14rem;
                    margin-top: .03rem;
                }
                span{
                    display: block;
                    float: left;
                    margin-left: .08rem;
                    color: #555;
                }
                b{
                    display: block;
                    float: right;
                    font-size: .14rem;
                    color: #666;
                }
            }
            .bottom{
                padding-top: .2rem;
                text-align: center;
                button{
                    width: 45%;
                    height: .4rem;
                    background: #00D2C7;
                    border: 0;
                    outline: 0;
                    color: #fff;
                    font-size: .16rem;
                    border-radius: .08rem;
                }
                button.right{
                    background: #2CB7CC;
                    margin-left: .1rem;
                }
            }
        }
    }
</style>
