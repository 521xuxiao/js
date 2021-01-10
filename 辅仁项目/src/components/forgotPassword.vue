<template>
    <div class="forgotPassword">
        <div class="header">
            <img src="../../static/img/返回@3x.png" @click="backLogin">
            <h3>找回密码</h3>
        </div>
        <div class="main">
            <div class="phone">
                <i class='iconfont icon-shoujihao'></i>
                <input type="text" placeholder="请输入手机号" v-model="phoneNum">
            </div>
            <div class="code">
                <i class='iconfont icon-yanzhengma'></i>
                <input type="text" placeholder="请输入验证码" v-model="codes">
                <button type="button" @click="getCode($event)">获取验证码</button>
            </div>
            <div class="login">
                <i class='iconfont icon-denglumima'></i>
                <input type="password" placeholder="请输入登录密码" v-model="loginPassword">
            </div>
            <div class="pay">
                <i class='iconfont icon-zhifumima'></i>
                <input type="password" placeholder="请输入支付密码" v-model="payPassword">
            </div>

            <button type="button" class="submit" @click="submit">提 交</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { Toast } from 'mint-ui';
export default {
    data() {
        return{
            phoneNum: '',
            codes: '',
            loginPassword: '',
            payPassword: ''
        }
    },
    methods: {
        backLogin() {
            this.$router.push('/login');
        },
        getCode(ev) {
            var re = /^1\d{10}$/
            if(re.test(this.phoneNum)) {  //手机号合法
                // 吊接口获取验证码
                var param = `tel=${this.phoneNum}&type=2`;
                var md5 = this.$md5(param);
                var key = md5.substr(6,6);
                let url = `/api/chk/sms.ashx?key=${key}&tel=${this.phoneNum}&type=2`;
                axios.get(url).then((res)=> {
                    console.log(res);
                })

                let ButtonDom = ev.srcElement
                //点击处理dom颜色
                ButtonDom.style.background = "#00BCC8";
                let timer = setTimeout(()=> {
                    ButtonDom.style.background = "#999999";
                    clearTimeout(timer);
                }, 60000);

                //倒计时60s
                ButtonDom.innerHTML = 60;
                let timers = setInterval(()=> {
                    ButtonDom.innerHTML--;
                    ButtonDom.disabled = true;
                    if(ButtonDom.innerHTML == 0) {
                        clearInterval(timers);
                        ButtonDom.innerHTML = '获取验证码';
                        ButtonDom.removeAttribute('disabled');
                    }
                }, 1000);
            }else{
                Toast({
                    message: '请输入正确的手机号',
                    duration: 2000
                });
            }
        },

        // 提交输入的新密码信息
        submit() {
            var param = `num=${this.codes}&pwd_log=${this.loginPassword}&pwd_pay=${this.payPassword}&tel=${this.phoneNum}`;
            var md5 = this.$md5(param);
            var key = md5.substr(6,6);
            let url = `/api/chk/forget_pwd.ashx?key=${key}&num=${this.codes}&pwd_log=${this.loginPassword}&pwd_pay=${this.payPassword}&tel=${this.phoneNum}`;
            axios.get(url).then((res)=> {
                console.log(res);
                if(res.data.state == 1) {
                    this.$router.push('/lianxi');
                }else if(res.data.state == 0){
                    var re = /^1\d{10}$/
                    if(!re.test(this.phoneNum)) {
                        Toast({
                            message: '请输入正确的手机号',
                            duration: 2000
                        });
                    }else if(!this.codes) {
                        Toast({
                            message: '请输入验证码',
                            duration: 2000
                        });
                    }else if(!this.loginPassword) {
                        Toast({
                            message: '请输入登录密码',
                            duration: 2000
                        });
                    }else if(!this.payPassword) {
                        Toast({
                            message: '请输入支付密码',
                            duration: 2000
                        });
                    }
                }
            })
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
.header{
    height: .54rem;
    line-height: .54rem;
    background: #00D2C7;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    img{
        width: .1rem;
        height: .19rem;
        position: absolute;
        left: .18rem;;
        top: .17rem;
    }
    h3{
        text-align: center;
        font-size: .18rem;
        color: #fff;
        font-weight: normal;
    }
}

.main{
    padding: .6rem .2rem 0;
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
            width: 80%;
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
    .code{
        width: 100%;
        height: .5rem;
        border-bottom: 1px solid #ccc;
        margin: .15rem 0;
        padding: 0 .05rem;
        box-sizing: border-box;
        position: relative;
        button{
            position: absolute;
            right: .08rem;
            top: .05rem;
            width: 1.2rem;
            height: .4rem;
            background: #999999;
            color: #fff;
            font-size: .16rem;
            border: 0;
            outline: 0;
            border-radius: .08rem;
        }
        i{
            font-size: .2rem;
            margin-top: .05rem;
            color: #00D2C7;
        }
        input{
            width: 45%;
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
    .login{
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
            width: 80%;
            height: 100%;
            border: 0;
            outline: 0;
            font-size: .16rem;
            color: #999;
            padding-left: .08rem;
            border-bottom: 1px solid #ccc;
            // box-sizing: border-box;
        }
    }
    .pay{
        width: 100%;
        height: .5rem;
        border-bottom: 1px solid #ccc;
        margin-top: .15rem;
        padding: 0 .05rem;
        box-sizing: border-box;
        i{
            font-size: .2rem;
            margin-top: .05rem;
            color: #00D2C7;
        }
        input{
            width: 80%;
            height: 100%;
            border: 0;
            outline: 0;
            font-size: .16rem;
            color: #999;
            padding-left: .08rem;
            box-sizing: border-box;
        }
    }
    .submit{
        width: 100%;
        height: .4rem;
        background: #00D2C7;
        border: 0;
        outline: 0;
        margin-top: .3rem;
        border-radius: .08rem;
        color: #fff;
        font-size: .16rem;
        &:active{
            color: #f7f7f7;
            background: #00D3CB;
        }
    }
}
</style>
