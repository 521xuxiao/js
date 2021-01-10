<template>
    <div id="question" class="question"  v-swipeleft="(e)=>vueTouch()"  v-swiperight="(e)=>vueTouchr()">
    <div class="animate">
        <div class="mask" v-if="notAction || noteShow" @click="hiddenAction"></div>
        <div class="header">
            <!-- 进度条 -->
            <div class="bar">
                <div class="fatherProgress">
                    <div class="progress" id="Progres">
                        <i></i>
                    </div>
                    <span>{{Progress}}%</span>
                </div>
            </div>
            <div class="right" @click="section">
                <span>章节选择</span>
                <img src="../../static/img/xiangyou.png">
            </div>
        </div>

        <ul class="main">
            <!-- 放A题型的题 -->
            <div v-if="dataList.type=='A'" class="div">
                <div class="top">
                    <em style="color: red; font-weight: 700; font-size: 20px;">{{dataList.id}}</em>
                    <span>{{dataList.type}}</span>
                    <b>{{dataList.title}}</b>
                </div>
                <div class="center" v-for="(data, index) in dataList.option" :key="index">
                    <li @click.stop="wrongORrightsA(index, dataList.realanswer, dataList.id)" :class="{'active': isObj[dataList.id] ? ((isObj[dataList.id].realanswer == data.letter) ? true : false) : false, 'currentActive': isObj[dataList.id] ? ((isObj[dataList.id].useranswer == index && isObj[dataList.id].realanswer != data.letter) ? true : false) : false}">
                    <!-- <li @click.stop="wrongORrightsA(index, dataList.answer, dataList.id)" :class="{'active': isObj[dataList.id].tId==dataList.id}"> -->

                        <p>{{data.letter}}</p>
                        <span>{{data.info}}</span>
                        <!-- <div class="img" v-if="isObj[dataList.id] ? ((isObj[dataList.id].realanswer==data.letter)?true:false ): false" >
                            <img src="../../static/img/duihao.png" v-if="isObj[dataList.id] ? ((isObj[dataList.id].realanswer==data.letter)?true:false ): false">
                            <img src="../../static/img/cuohao.png" v-if="isObj[dataList.id] ?((isObj[dataList.id].useranswer==index&&isObj[dataList.id].realanswer!=data.letter)?true:false):false">
                        </div> -->
                    </li>
                </div>
                <div class="analysis" v-show="isObj[dataList.id]">
                    <p>答案：</p>
                    <span>{{dataList.realanswer}}</span>
                    <b>解析：</b>
                    <s>{{dataList.explain}}</s>
                    <h5>纠错</h5>
                </div>
            </div>

            <!-- 放B题型的题 -->
            <li v-if="dataList.type=='B'" class="lis">
                <div class="title">
                    <p>{{dataList.type}}</p>
                    <span>{{dataList.title}}</span>
                </div>
                <div class="center" v-for="(data, indexs) in dataList.item" :key='indexs'>    <!-- 每道题 -->
                    <li>
                        <h4>{{data.title}}</h4>
                        <!-- 每道题的选项 -->
                        <div class="option" v-for="(optionOne, index) in data.option" @click="wrongORrightB(index, data.answer, indexs, data.id)"
                                 :key="index" :class="{'active': isObj[data.id] ? ((isObj[data.id].realanswer == optionOne.letter) ? true : false) : false, 'currentActive': isObj[data.id] ? ((isObj[data.id].useranswer == index && isObj[data.id].realanswer != optionOne.letter) ? true : false) : false}">
                            <p>{{optionOne.letter}}</p>
                            <span>{{optionOne.info}}</span>
                        </div>
                    </li>

                    <div class="analysis" v-show="isObj[data.id]">
                        <p>答案：</p>
                        <span>{{data.realanswer}}</span>
                        <b>解析：</b>
                        <s>{{data.explain}}</s>
                        <h5>纠错</h5>
                    </div>
                </div>
            </li>

        </ul>

        <div class="footer">
            <ul>
                <li @click="zhanti(dataList.id)">
                    <span>斩题</span>
                    <i class="iconfont icon-shanchu"></i>
                </li>
                <li @click="note(dataList.id)">
                    <span>笔记</span>
                    <i class="iconfont icon-biji"></i>
                </li>
                <!-- <p @click="changeImg($event)">
                    <img src="../../static/img/zanting.png">
                </p> -->
                <li>
                    <span @click="shoucang(dataList.id)">收藏</span>
                    <i class="iconfont icon-soucang"></i>
                </li>
                <li>
                    <span>我要问</span>
                </li>
            </ul>
        </div>

        <!-- //笔记收藏 -->
        <div class="noteCase" v-if="noteShow">
            <h3 class="title">随笔</h3>
            <textarea placeholder="请填写您的笔记，1-200字"  class="textarea  ind2" maxlength="200"></textarea>
            <button type="button" @click="submit">确认提交</button>
        </div>

        <!-- 章节选择 -->
        <div class="section">
            <div class="sectionMain">
                <div class="Header">
                    <div class="title">章节选择</div>
                    <span class="span" @click.stop="actionFinish">完成</span>
                </div>
                <ul>
                    <div class="innerDivs">
                        <li v-for="(actionData, index) in action" >
                            <input type="checkbox"  :id="actionData.id">
                            <label :for="actionData.id"  @click.stop="checkAction(actionData.id)">{{actionData.chapter}}</label>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
import storage from '../../static/js/store.js';
import Vue from 'vue';
import VueTouch from 'kim-vue-touch';
Vue.use(VueTouch);
import { Toast } from 'mint-ui';
export default {
    data() {
        return{
            Progress:  0,
            num: 0,         // 控制底部暂停或者播放
            // wrongORright: true,      // true为对号
            right: false,
            answer: -1,
            currentIndex: -1,
            // outerWrongORright: false,   // 控制错对号的显示和隐藏
            uid: 0,
            chapter: 1,
            type: 1,
            beginid: 1,
            endid: 0,
            learnpid: 2,
            startX: 0,
            dataList: {},      // 页面上来的数据, 分割，一页只展示一道题
            dataListZong: [],      // 整个数组
            number: 0,           // 分割标记
            notShow: false,       //是否显示解析
            onlyOne: true,          //做题用户只能点击一次
            rightB: '',
            currentIndexB: -1,
            Indexs: '',
            objectOBJ: '',
            arr: [],
            n: -1,
            idA: -1,
            action: [],
            notAction: false,
            isObj: {},
            objNumber: 0,        // 计算isObj里面有几个动态属性id， 用来计算进度条
            choiceId: 0,      // 章节选择的每个章节的id
            // checked: false
            noteShow: false,
            noteID: -1,
            arrAy: [],

        }
    },
    methods: {
        //初始化question使得撑大整个页面
        initQuestion() {
            document.querySelector('#question').style.height = window.screen.availHeight + 'px';
        },

        // 页面上来的时候初始化进度条
        initProgress() {
            this.$nextTick(()=> {
                document.querySelector('.header .bar .progress').style.width = this.Progress + '%';
                document.querySelector('.bar .fatherProgress span').style.left = this.Progress - 5 + '%';
                document.querySelector('.bar .fatherProgress .progress i').style.left = this.Progress - 2 + '%';
            })
        },

        //换底部的暂停播放图片
        // changeImg(n) {
        //     if(this.num % 2 == 0) {
        //         n.srcElement.src = '../../static/img/bofang.png';
        //         this.num++;
        //     }else{
        //         n.srcElement.src = '../../static/img/zanting.png';
        //         this.num++;
        //     }
        // },

        //判断用户点击的题是对的还是错的
        //A类题
        wrongORrightsA(n, answer, idA) {

            if(!this.isObj[idA]) {
                this.$set(this.isObj, idA, {useranswer: n, realanswer: answer, tid: idA});
                this.postData();
                // storage.set('dataList', this.dataList);
                // storage.set('dataListZong', this.dataListZong);
            }else if(this.isObj[idA].tid != idA) {
                this.$set(this.isObj, idA, {useranswer: n, realanswer: answer, tid: idA})

            }

            this.Progress = ((Object.getOwnPropertyNames(this.isObj).length-1) / 1000 *100).toFixed(1);
            storage.set('anserQustion', this.isObj);
            storage.set('anserProgress', this.Progress);
            this.initProgress();
        },
        //B类题
        wrongORrightB(n, answer, indexs, id) {
            // n 是每道题的第几个选项； answer： 每道题的答案； indexs： B类型的第几道题；  id： 每道题的id
            if (!this.isObj[id]) {
            	// 第一次点击
            	this.$set(this.isObj, id, {useranswer: n, realanswer: answer, tid: id})
                this.postData();
                // storage.set('dataList', this.dataList);
            } else if (this.isObj[id].tid != id) {
        		this.$set(this.isObj, id, {useranswer: n, realanswer: answer, tid: id})
            }
            this.Progress = ((Object.getOwnPropertyNames(this.isObj).length-1) / 1000 *100).toFixed(1);
            this.initProgress();
            //把生成的对象存到前端本地
            storage.set('anserQustion', this.isObj);
            storage.set('anserProgress', this.Progress);

        },

        //1道题网后台提交一次
        postData() {
            let ArrAy = [];
            for(let i in this.isObj) {
                ArrAy.push(this.isObj[i]);
            }
            ArrAy = ArrAy[ArrAy.length-1];
            let param = `pid=${this.learnpid}&type=${this.type}&uid=${this.uid}`;
            let md5 = this.$md5(param);
            let key = md5.substr(6,6);
            let url = `/api/set/save_itempool.ashx`;
            let params = {};
            params.key = key;
            params.uid = this.uid;
            params.pid = this.learnpid;
            params.type = this.type;
            params.item = ArrAy;
            // console.log(params);
            axios.post(url, params).then((res)=> {
                console.log(res);
            })
            storage.remove('anserQustion');
        },

        //页面上来请求数据
        getData() {
            let param = `chapter=${this.chapter}&itemid=${this.beginid}&pid=${this.learnpid}&sort=1&type=${this.type}&uid=${this.uid}`;
            let md5 = this.$md5(param);
            let key = md5.substr(6,6);
            let url = `/api/get/itempool.ashx?key=${key}&chapter=${this.chapter}&itemid=${this.beginid}&pid=${this.learnpid}&sort=1&type=${this.type}&uid=${this.uid}`;

            axios.get(url).then((res)=> {
                if(res.data.state == 1) {
                    // console.log(res);
                    this.dataList = res.data.data.itempool[0];
                    this.dataListZong = res.data.data.itempool;
                    this.beginid = res.data.data.beginid;
                    this.endid = res.data.data.endid;
                    this.initProgress();
                }
            })
        },

        //左滑切换下一题
        vueTouch() {
            this.notShow = false;  //解析隐藏掉
            this.currentIndex = -1;
            this.right = -1;
            if(this.number <= 8) {
                this.number++;
                this.dataList = this.dataListZong[this.number];
                this.initProgress();
            }else{
                // 再次请求接口，拿10条数据
                let param = `chapter=${this.chapter}&itemid=${this.endid}&pid=${this.learnpid}&sort=1&type=${this.type}&uid=${this.uid}`;
                let md5 = this.$md5(param);
                let key = md5.substr(6,6);
                let url = `/api/get/itempool.ashx?key=${key}&chapter=${this.chapter}&itemid=${this.endid}&pid=${this.learnpid}&sort=1&type=${this.type}&uid=${this.uid}`;
                axios.get(url).then((res)=> {
                    this.dataList = {};
                    // console.log(res);
                    if(res.data.state == 1) {
                        this.dataList = res.data.data.itempool[0];
                        this.dataListZong = res.data.data.itempool;
                        this.beginid = res.data.data.beginid;
                        this.endid = res.data.data.endid;
                        this.initProgress();
                    }
                })
                this.number = 0;
            }

            this.initProgress();
        },
        vueTouchr() {
            if(this.number > 0) {
                this.number--;
                this.dataList = this.dataListZong[this.number];
                this.initProgress();
            }else{
                this.number = 9;
                //吊接口拿10条数据往前展示
                console.log(this.beginid);
                let param = `chapter=${this.chapter}&itemid=${this.beginid}&pid=${this.learnpid}&sort=0&type=${this.type}&uid=${this.uid}`;
                let md5 = this.$md5(param);
                let key = md5.substr(6,6);
                let url = `/api/get/itempool.ashx?key=${key}&chapter=${this.chapter}&itemid=${this.beginid}&pid=${this.learnpid}&sort=0&type=${this.type}&uid=${this.uid}`;
                axios.get(url).then((res)=> {
                    console.log(res);
                    this.dataListZong = res.data.data.itempool;
                    this.dataList = this.dataListZong[this.number];
                    this.beginid = res.data.data.beginid;
                    this.endid = res.data.data.endid; 
                })
            }

        },

        //章节选择
        section() {
            //吊接口，章节的数据
            let param = `pid=${this.learnpid}`;
            let md5 = this.$md5(param);
            let key = md5.substr(6,6);
            let url = `/api/get/chapterByPid.ashx?key=${key}&pid=${this.learnpid}`;
            axios.get(url).then((res)=> {
                if(res.data.state == 1) {
                    this.action = res.data.data;

                    setTimeout(()=> {
                        let Dom = document.querySelector('.animate .section');
                        // console.log(Dom);
                        Dom.style.height = '4rem';
                        Dom.style.bottom = '0';
                        Dom.style.overflow = 'auto';
                    }, 50)

                    this.initProgress();
                }
            });
            this.notAction = true;
        },

        //章节选择
        checkAction(id) {
            this.arrAy.push(id);
            for(var i=0;i<this.arrAy.length-1;i++){
                for(var j=i+1;j<this.arrAy.length;j++){
                    var cur = this.arrAy[i];
                    if(cur>this.arrAy[j]){
                        var index = this.arrAy[j];
                        this.arrAy[j] = cur;
                        this.arrAy[i] = index;
                    }
                }
            }
            for(let i = 0; i< this.arrAy.length; i++) {
                if(this.arrAy[i] == this.arrAy[i+1]) {
                    this.arrAy.splice(i, 2);
                }
            }
            // console.log();
        },
        hiddenAction() {
            this.notAction = false;
            this.initProgress();
        },
        //选择章节，点击完成
        actionFinish() {
            this.arrAy = this.arrAy.join(',');
            console.log(this.arrAy);
            // 选择完章节吊接口再次拿数据
            let param = `chapter=${this.arrAy}&page=${this.fromid}&pid=${this.learnpid}&type=${this.type}&uid=${this.uid}`;
            let md5 = this.$md5(param);
            let key = md5.substr(6,6);
            let url = `/api/get/itempool.ashx?key=${key}&chapter=${this.choiceId}&page=${this.fromid}&pid=${this.learnpid}&type=${this.type}&uid=${this.uid}`;
            axios.get(url).then((res)=> {
                console.log(res);
                if(res.data.state == 1) {
                    this.dataList = res.data.data.itempool[0];
                    this.dataListZong = res.data.data.itempool;
                    this.fromid = res.data.page;
                    this.initProgress();
                }
            })
            this.notAction = false;
            this.initProgress();
            this.arrAy = [];
        },
        //斩题 收藏
        zhanti(id) {
            let param = `itemid=${id}&pid=${this.learnpid}&type=2&uid=${this.uid}`;
            let md5 = this.$md5(param);
            let key = md5.substr(6,6);
            let url = `/api/set/save_collection.ashx?key=${key}&itemid=${id}&pid=${this.learnpid}&type=2&uid=${this.uid}`;
            axios.get(url).then((res)=> {
                // console.log(res);
                if(res.data.state == 1) {
                    Toast({
                        message: res.data.msg,
                        duration: 2000
                    });
                }else{
                    Toast({
                        message: res.data.msg,
                        duration: 2000
                    });
                }
            })
        },
        shoucang(id) {
            let param = `itemid=${id}&pid=${this.learnpid}&type=1&uid=${this.uid}`;
            let md5 = this.$md5(param);
            let key = md5.substr(6,6);
            let url = `/api/set/save_collection.ashx?key=${key}&itemid=${id}&pid=${this.learnpid}&type=1&uid=${this.uid}`;
            axios.get(url).then((res)=> {
                // console.log(res);
                if(res.data.state == 1) {
                    Toast({
                        message: res.data.msg,
                        duration: 2000
                    });
                }else{
                    Toast({
                        message: res.data.msg,
                        duration: 2000
                    });
                }
            })
        },
        note(id) {
            this.noteShow = true;
            this.noteID = id;
            this.initProgress();
        },
        submit() {
            let textValue = document.querySelector('.noteCase .textarea').value;
            if(textValue) {
                this.noteShow = false;
                let param = `itemid=${this.noteID}&notes=${textValue}&pid=${this.learnpid}&uid=${this.uid}`;
                let md5 = this.$md5(param);
                let key = md5.substr(6,6);
                let url = `/api/set/save_notes.ashx?key=${key}&itemid=${this.noteID}&notes=${textValue}&pid=${this.learnpid}&uid=${this.uid}`;
                axios.get(url).then((res)=> {
                    if(res.data.state == 1) {
                        Toast({
                            message: res.data.msg,
                            duration: 2000
                        });
                    }else{
                        Toast({
                            message: res.data.msg,
                            duration: 2000
                        });
                    }
                })
                this.initProgress();
            }else{
                Toast({
                    message: '填写完笔记以后再提交',
                    duration: 2000
                });
            }
        },

        //页面再次上来的时候，判断anserQustion是否有值
        hasValue() {
            let Value = storage.get('anserQustion');
            if(Value) {
                this.isObj = Value;
            };

            // if(storage.get('dataList')) {
            //     console.log(storage.get('dataList'));
            //     setTimeout(()=> {
            //         this.dataList = storage.get('dataList');
            //     }, 200)
            // }
        }

    },
    mounted() {
        this.initQuestion();
        this.uid = storage.get('uid');
        this.learnpid = storage.get('learnpid');
        this.chapter = this.$route.query.chapter;
        this.type = this.$route.query.type;
        this.beginid = this.$route.query.fromid;
        this.getData();   //页面上来请求数据
        if(storage.get('anserProgress')) {
            this.Progress = Number(storage.get('anserProgress')).toFixed(1);
        };
        this.hasValue();

    }
}
</script>

<style lang="scss" scoped>
// .animate{
//     animation: enter .3s;
//     position: absolute;
// }
    .header{
        position: fixed;
        left: 0;
        top: 0;
        height: .91rem;
        width: 100%;
        z-index: 10;
        background: url(../../static/img/beijing.png) no-repeat 0 0;
        padding: .5rem 0 0 .48rem;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -o-box-sizing: border-box;
        .bar{
            background: #CEFCFF;
            height: .15rem;
            width:  60%;
            border-radius: .07rem;
            float: left;
            .fatherProgress{
                position: relative;
                border: .02rem  dashed #00FFFF;
                border-radius: .07rem;
                height: .12rem;
                .progress{
                    height: .15rem;
                    background: #00FFFF;
                    border-radius: .07rem;
                    width: 0;
                    margin-top: -.02rem;
                    i{
                        display: block;
                        width: .15rem;
                        height: .15rem;
                        border-radius: 50%;
                        background: #004d52;
                        position: absolute;
                        left: 0;
                        top: -.02rem;
                    }
                }
                span{
                    color: #fff;
                    position: absolute;
                    left: 0;
                    top: -.35rem;
                    background: url(../../static/img/progress.png) no-repeat 0 0;
                    display: block;
                    width: .29rem;
                    height: .28rem;
                    text-align: center;
                    line-height: .22rem;
                }
            }
        }
        .right{
            float: right;
            padding-right: .14rem;
            span{
                font-size: .12rem;
                color: #fff;
            }
            img{
                width: .06rem;
                height: .1rem;
                margin-left: .05rem;
            }
        }
    }

    .main{
        margin-top: .1rem;
        padding-top: 1rem;
        .div{
            padding-bottom: .65rem;
            .top{
                display: flex;
                padding: 0 .14rem;
                span{
                    display: block;
                    width: .27rem;
                    height: .18rem;
                    background: #00BCC9;
                    border-radius: 0 .1rem .1rem .1rem;
                    text-align: center;
                    font-size: .12rem;
                    color: #fff;
                    display: block;
                }
                b{
                    display: block;
                    flex: 1;
                    font-size: .16rem;
                    color: #333;
                    margin-left: .09rem;
                    display: block;
                    width: 90%;
                }
            }
            .center{
                margin-top: .23rem;
                li{
                    width: 80%;
                    background: #F1F1F1;
                    color: #333;
                    font-size: .15rem;
                    margin: .15rem auto .15rem;
                    padding: .06rem 0 .06rem .08rem;
                    box-sizing: border-box;
                    overflow: hidden;
                    position: relative;
                    &.active{
                        background: #00BEC8;
                        color: #fff;
                        p{
                            border: 1px solid #FFF;
                        }
                    }
                    &.currentActive{
                        background: red;
                        color: #fff;
                        p{
                            border: 1px solid #fff;
                        }
                    }
                    p{
                        float: left;
                        border: 1px solid #666;
                        border-radius: 50%;
                        width: .2rem;
                        height: .2rem;
                        text-align: center;
                        line-height: .2rem;
                    }
                    span{
                        display: block;
                        float: left;
                        width: 80%;
                        margin-left: .1rem;
                    }
                    .img{
                        float: right;
                        width: .21rem;
                        height: .15rem;
                        position: absolute;
                        top: 50%;
                        right: .1rem;
                        margin-top: -.1rem;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }

            .analysis{
                padding: 0.15rem .5rem 0 .3rem;
                p{
                    font-size: .12rem;
                    color: #666;
                }
                span{
                    font-size: .12rem;
                    color: #00bec8;
                    display: block;
                    margin: .05rem 0 .07rem 0;
                }
                b{
                    font-size: .11rem;
                    color: #666;
                    display: block;
                }
                s{
                    font-size: .11rem;
                    color: #333;
                    display: block;
                    margin: .05rem 0 .1rem 0;
                }
                h5{
                    font-size: .09rem;
                    color: #00bec8;
                }
            }
        }

        li.lis{
            padding: 0 0 .65rem 0;
            .title{
                display: flex;
                padding: 0 .2rem 0 .15rem;
                p{
                    background: #00BCC9;
                    border-radius: 0 .1rem .1rem .1rem;
                    width: .27rem;
                    height: .18rem;
                    text-align: center;
                    line-height: .18rem;
                    color: #fff;
                }
                span{
                    display: block;
                    flex: 1;
                    margin-left: .08rem;
                    font-size: .14rem;
                    color: #333;
                }
            }

            .center{
                padding: .2rem .2rem 0 .2rem;
                font-size: .13rem;
                color: #4c4c4c;
                li{
                    h4{
                        font-weight: normal;
                        width: 100%;
                    }
                    .option{
                        display: flex;
                        margin: .15rem 0;
                        padding: .05rem .05rem;
                        background: #F1F1F1;
                        color: #333;
                        &.currentActive{
                            background: #F31B0E;
                            color: #fff;
                        }
                        &.active{
                            background: #00BEC8;
                            color: #fff;
                        }
                        p{
                            width: .1rem;
                        }
                        span{
                            display: block;
                            flex: 1;
                            margin-left: .08rem;
                        }
                    }
                }
                .analysis{
                    padding: 0.15rem .5rem 0 .3rem;
                    p{
                        font-size: .12rem;
                        color: #666;
                    }
                    span{
                        font-size: .12rem;
                        color: #00bec8;
                        display: block;
                        margin: .05rem 0 .07rem 0;
                    }
                    b{
                        font-size: .11rem;
                        color: #666;
                        display: block;
                    }
                    s{
                        font-size: .11rem;
                        color: #333;
                        display: block;
                        margin: .05rem 0 .1rem 0;
                    }
                    h5{
                        font-size: .09rem;
                        color: #00bec8;
                    }
                }
            }


        }
    }

    .footer{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: .6rem;
        border-top: 1px solid #eee;
        background: #fff;
        line-height: .6rem;
        ul{
            font-size: .15rem;
            color: #333;
            display: flex;
            li{
                flex: 1;
                text-align: center;
            }
            li:active{
                color: #28C5D3;
            }
        }
    }

    .noteCase{
        padding: 0 .06rem 0rem;
        width: 100%;
        height: 60%;
        box-sizing: border-box;
        position: fixed;
        left: 0;
        bottom: 0;
        background: #fff;
        z-index: 100;
        h3.title{
            text-align: center;
            line-height: .33rem;
            height: .33rem;
            font-size: .15rem;
            color: #333;
            font-weight: normal;
        }
        textarea{
            width: 100%;
            height: 1.94rem;
            margin-top: .03rem;
            border: 1px solid #eee;
            font-size: .14rem;
            color: #333;
            padding: .08rem;
            box-sizing: border-box;
        }
        button{
            width: 85%;
            height: .4rem;
            font-size: .15rem;
            color: #fff;
            border: 0;
            outline: 0;
            background: #00BCC9;
            border-radius: .08rem;
            display: block;
            position: absolute;
            left: 50%;
            margin-left: -42%;
            bottom: .2rem;
        }
    }

    .section{
        z-index: 20;
        position: absolute;
        width: 100%;
        left: 0;
        bottom: -100%;
        height: 0;
        overflow: hidden;
        transition: all .3s;
        .sectionMain{
            background: #fff;
            position: relative;
            .Header{
                height: .4rem;
                .title{
                    font-size: .16rem;
                    color: #333;
                    height: .38rem;
                    line-height: .38rem;
                    text-align: center;
                }
                span.span{
                    display: block;
                    position: absolute;
                    right: .17rem;
                    top: .14rem;
                    font-size: .09rem;
                    color: #00bacb;
                }
            }
            ul{
                height: 3.55rem;
                padding: .04rem .11rem 0;
                overflow-y: auto;
                .innerDivs{
                    padding-bottom: .3rem;
                    li{
                        overflow: auto;
                        width: 100%;
                        padding: .13rem .1rem .13rem .13rem;
                        box-sizing: border-box;
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        -o-box-sizing: border-box;
                        border: 1px solid #eee;
                        -moz-box-shadow: .03rem .03rem .1rem #eee;
                        -webkit-box-shadow: .03rem .03rem .1rem #eee;
                        -o-box-shadow: .03rem .03rem .1rem #eee;
                        box-shadow: .03rem .03rem .1rem #eee;
                        margin: .05rem 0 .08rem 0;
                        display: flex;
                        input{
                            display: block;
                            width: .13rem;
                            height: .13rem;
                            margin-top: .04rem;
                        }
                        label{
                            font-size: .14rem;
                            color: #4c4c4c;
                            margin-left: .08rem;
                            display: flex;
                            width: 90%;
                        }
                    }
                }
            }
        }
    }
    .mask{
        position: fixed;
        background: rgba(0,0,0,.5);
        width: 100%;
        height: 100%;
        z-index: 10;
        top: 0;
        left: 0;
    }


    // @keyframes enter {
    //     0%{transform: translateX(100%);}
    //     100%{transform: translateX(0);}
    // }
    // @-webkit-keyframes enter {
    //     0%{transform: translateX(100%);}
    //     100%{transform: translateX(0);}
    // }
    // @-moz-keyframes enter {
    //     0%{transform: translateX(100%);}
    //     100%{transform: translateX(0);}
    // }

</style>
