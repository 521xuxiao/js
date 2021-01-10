<template>
    <div class="lianxi">
        <div class="header">
            <img :src="pic" class="left">
            <input type="text" placeholder="课程/题库/套卷">
        </div>

        <div class="main">
            <div class="main-top">
                <canvas id="c"></canvas>
                <b>学习进度</b>
                <strong>%</strong>
                <input type="range" id="r" min="0" max="100" step="1" style="display: none;">
            </div>

            <ul class="canvas" v-show="isShow">
                <li>
                    <canvas id="canvas1" style="width: .8rem; height: .8rem;"></canvas>
                    <p>正确率{{datalist.zhengquelv}}%</p>
                </li>
                <li>
                    <canvas id="canvas2" style="width: .8rem; height: .8rem;"></canvas>
                    <p>超过考友{{datalist.paiming}}%</p>
                </li>
                <li>
                    <canvas id="canvas3" style="width: .8rem; height: .8rem;"></canvas>
                    <p>今已完成{{datalist.dangriwanchenglv}}%</p>
                </li>
            </ul>
        </div>

        <div v-if="isShow">
            <div class="gray"></div>

            <div class="readAgain">
                <ul>
                    <li @click="toShoucang(1, '收藏')">
                        <img src="../../static/img/组3@2x.png">
                        <h4>收藏</h4>
                    </li>
                    <li @click="toCuoti(2, '错题')">
                        <img src="../../static/img/组25@2x.png">
                        <h4>错题</h4>
                    </li>
                    <li @click="toFuxi(3, '复习')">
                        <img src="../../static/img/组28@2x.png">
                        <h4>复习</h4>
                    </li>
                    <li @click="toBiji(5, '笔记')">
                        <img src="../../static/img/组26@2x.png">
                        <h4>笔记</h4>
                    </li>
                    <li @click="toZhanti(4, '斩题')">
                        <img src="../../static/img/组27@2x.png">
                        <h4>斩题</h4>
                    </li>
                </ul>
            </div>

            <div class="answer" v-for="(datas, index) in datalist.items">
                <div class="left">
                    <img :src="datas.picture" >
                </div>
                <div class="ceter">
                    <p>{{datas.pname}}</p>
                    <span>题数： {{datas.totalcount}}</span>
                </div>
                <div class="right">
                    <button type="button" @click="toQuestion(0, 0, 0)">开始做题</button>
                </div>
            </div>

            <div class="gray"></div>

            <ul class="bgBoy">
                <li v-for="(splitePic, index) in splite" :key="index" @click="toHtml(splitePic.url)">
                    <div class="inner">
                        <img :src="splitePic.pic" >
                    </div>
                </li>
            </ul>

            <div class="footer" v-for="single in news">
                <div v-if="single.istop=='True'">
                    <p>{{single.title}}</p>
                    <img :src="single.pic" class="bigImg">
                </div>

                <ul class="footerUl" v-if="single.istop=='False'">
                    <li>
                        <div class="left">
                            <h3>{{single.title}}</h3>
                            <span>{{single.shortdes}}</span>
                        </div>
                        <img :src="single.pic" class="right">
                    </li>
                </ul>
            </div>
        </div>

        <!-- 遮罩层 -->
        <div class="masks" v-if="!isShow || rightShow" @click="maks"></div>
        <i class="i" v-if="rightShow"></i>
        <h6 v-if="rightShow">请选择您的<b style="color: #FCC900; font-size: .28rem;">考试</b>科目</h6>
        <img src="../../static/img/查找表单列表@2x.png" class="xxuu" @click="change" >
        <div class="mask_xu">
            <div class="maskMain"   >
                <div class="maskTop">请选择您的考试科目</div>
                <div class="mask_main">
                    <div class="maskLeft">
                        <ul>
                            <li v-for="(Item, index) in levelOne" :class="{'active': index == currentIndex}" @click="changeColor(index, Item.isover, Item.id)">
                                <span>{{Item.name}}</span>
                                <i class="iconfont icon-icon-test"></i>
                            </li>
                        </ul>
                    </div>
                    <div class="maskRight">
                        <ul v-if='isIf'>
                            <li v-for="(item, index) in levelTow" @click="showChild(item.id, item.isover, $event, item.proid)">
                                <span> {{item.name}}</span>
                                <i class="iconfont icon-icon-test"  v-if="item.isover==1? false: true"></i>
                            </li>
                        </ul>
                        <ul v-if="!isIf">
                            <li v-for="dataTree in levelTree" @click="threeToSearch(dataTree)">{{dataTree.name}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import storage from '../../static/js/store.js';
import { Toast } from 'mint-ui';
export default {
    data() {
        return{
            uid: '',               //用户ID
            isShow: true,
            levelOne: [],
            currentIndex: 0,
            levelTow: [],
            isIf: true,
            levelTree: [],
            ID: 0,                    //  需要传出去的ID, learncid课程分类ID
            learnpid: 0,                //用户点击课程分，后台给返的ID
            datalist: {},                //练习页面的数据, 首页展示
            rightShow: false,
            pic: '',
            splite: [],    //  首页滑动图片
            news: [],         // 滑动图片下面的资讯部分
        }
    },
    methods: {
        maks() {
            this.isShow = true;
            document.querySelector('.lianxi .mask_xu .maskMain').style.bottom = '-100%';
            document.querySelector('.lianxi .mask_xu .maskMain').style.height = '0';
            document.querySelector('.lianxi .mask_xu .maskMain').style.overflow = 'hidden';
        },
        // 点击右上角的logo显示科目选择
        change() {
            this.isShow = false;
            document.querySelector('.lianxi .mask_xu .maskMain').style.bottom = '0rem';
            document.querySelector('.lianxi .mask_xu .maskMain').style.height = 'auto';
            document.querySelector('.lianxi .mask_xu .maskMain').style.overflow = 'auto';
            this.rightShow = false;
            this.getDetailData();
            this.getRightInit();
            this.initCanvas();
        },
        // 点击左边的nav
        changeColor(index, isOver, Id) {
            this.currentIndex = index;
            if(isOver == 0) {
                this.isIf = true;
                axios.get(`/api/get/categoryByParentid.ashx?parentid=${Id}`).then((res)=> {
                    // console.log(res);
                    this.levelTow = res.data.data;
                })
            }else{
                this.levelTow = [];
            }
        },
        // 点击二级显示三级目录
        showChild(Id, isover, items, proid) {
            // console.log(proid);
            this.learnpid = proid;
            if(items.srcElement.lastChild.className == undefined) {
                // 把id传出去
                this.ID = Id;
                this.isShow = true;
                document.querySelector('.lianxi .mask_xu .maskMain').style.bottom = '-100%';
                document.querySelector('.lianxi .mask_xu .maskMain').style.height = '0';
                this.getdata();
            }
            if(isover == 0) {
                this.isIf = false;
                axios.get(`/api/get/categoryByParentid.ashx?parentid=${Id}`).then((res)=> {
                    // console.log(res);
                    if(res.data.state ==1) {
                        this.levelTree = res.data.data;
                    }
                })
            }else{
                this.levelTree = [];
            }
        },
        // 点击三级目录
        threeToSearch(dataTree) {
            // 把id, proid传出去
            this.learnpid = dataTree.proid;
            this.ID = dataTree.id
            // console.log(this.ID);
            this.isShow = true;
            document.querySelector('.lianxi .mask_xu .maskMain').style.bottom = '-100%';
            document.querySelector('.lianxi .mask_xu .maskMain').style.height = '0';
            this.getdata();
            this.initCanvas();
        },
        // 初始化canvas
        initCanvas() {
            setTimeout(()=> {
                var canvas = document.getElementById("canvas1");
                // canvas.border = "none";
                canvas.width = 200;
                canvas.height = 200;
                var ctx = canvas.getContext("2d");

                var data = [{
                        "value": parseInt(this.datalist.zhengquelv)/100,
                        "color": "#fbe9a2",
                    },{
                        "value": (100-parseInt(this.datalist.zhengquelv))/100,
                        "color": "#89DCDE",
                      },
                    ];
                var x0 = 100;
                var y0 = 100;
                var radius = 100;
                var tempAngle = -90;
                for(var i=0;i<data.length;i++){
                    ctx.beginPath();
                    ctx.moveTo(100, 100);
                    ctx.fillStyle = data[i].color;
                    var angle = data[i].value*360;
                    var startAngle = tempAngle*Math.PI/180;
                    var endAngle = (tempAngle + angle)*Math.PI/180;
                    ctx.arc(100, 100, 100, startAngle, endAngle);
                    ctx.fill();
                    tempAngle+=angle;
                }

                var canvas = document.getElementById("canvas2");
                canvas.width = 200;
                canvas.height = 200;
                var ctx = canvas.getContext("2d");

                var data = [{
                        "value": parseInt(this.datalist.paiming)/100,
                        "color": "#fbe9a2",
                    },{
                        "value": (100-parseInt(this.datalist.paiming))/100,
                        "color": "#89DCDE",
                      },
                    ];
                var x0 = 100;
                var y0 = 100;
                var radius = 100;
                var tempAngle = -90;
                for(var i=0;i<data.length;i++){
                    // 开始绘制新状态的扇形
                    ctx.beginPath();
                    ctx.moveTo(100, 100);
                    ctx.fillStyle = data[i].color;
                    var angle = data[i].value*360;
                    var startAngle = tempAngle*Math.PI/180;
                    var endAngle = (tempAngle + angle)*Math.PI/180;
                    ctx.arc(100, 100, 100, startAngle, endAngle);
                    ctx.fill();
                    tempAngle+=angle;
                }

                var canvas = document.getElementById("canvas3");
                // canvas.border = "none";
                canvas.width = 200;
                canvas.height = 200;
                var ctx = canvas.getContext("2d");

                var data = [{
                        "value": parseInt(this.datalist.dangriwanchenglv)/100,
                        "color": "#fbe9a2",
                    },{
                        "value": (100-parseInt(this.datalist.dangriwanchenglv))/100,
                        "color": "#89DCDE",
                      },
                    ];
                var x0 = 100;
                var y0 = 100;
                var radius = 100;
                var tempAngle = -90;
                for(var i=0;i<data.length;i++){
                    // 开始绘制新状态的扇形
                    ctx.beginPath();
                    ctx.moveTo(100, 100);
                    ctx.fillStyle = data[i].color;
                    var angle = data[i].value*360;
                    var startAngle = tempAngle*Math.PI/180;
                    var endAngle = (tempAngle + angle)*Math.PI/180;
                    ctx.arc(100, 100, 100, startAngle, endAngle);
                    ctx.fill();
                    tempAngle+=angle;
                }
            }, 200)
        },

        //初始化
        init() {
            var canvas = document.getElementById('c');
            var ctx = canvas.getContext('2d');
            var range = document.getElementById('r');

            //range控件信息
            var rangeValue = range.value;
            var nowRange = 0; //用于做一个临时的range

            //画布属性
            var mW = canvas.width = 200;
            var mH = canvas.height = 200;
            var lineWidth = 2;

            //圆属性
            var r = mH / 2; //圆心
            var cR = r - 16 * lineWidth; //圆半径

            //Sin 曲线属性
            var sX = 0;
            var sY = mH / 2;
            var axisLength = mW; //轴长
            var waveWidth = 0.015 ; //波浪宽度,数越小越宽
            var waveHeight = 6; //波浪高度,数越大越高
            var speed = 0.09; //波浪速度，数越大速度越快
            var xOffset = 0; //波浪x偏移量

            ctx.lineWidth = lineWidth;

            //画圈函数
            var IsdrawCircled = false;
            var drawCircle = () => {

             ctx.beginPath();
             ctx.strokeStyle = '#fff';
             ctx.arc(r, r, cR+5, 0, 2 * Math.PI);
             ctx.stroke();
             ctx.beginPath();
             ctx.arc(r, r, cR, 0, 2 * Math.PI);
             ctx.clip();

            }

            //画sin 曲线函数
            var drawSin = (xOffset)=> {
             ctx.save();

             var points=[]; //用于存放绘制Sin曲线的点

             ctx.beginPath();
             //在整个轴长上取点
             for(var x = sX; x < sX + axisLength; x += 20 / axisLength){
              //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
              var y = -Math.sin((sX + x) * waveWidth + xOffset);

              var dY = mH * (1 - this.datalist.xuexijindu / 100 );

              points.push([x, dY + y * waveHeight]);
              ctx.lineTo(x, dY + y * waveHeight);
             }

             //封闭路径
             ctx.lineTo(axisLength, mH);
             ctx.lineTo(sX, mH);
             ctx.lineTo(points[0][0],points[0][1]);
             ctx.fillStyle = '#80dee3';
             ctx.fill();

             ctx.restore();
            };

            //写百分比文本函数
            var drawText = ()=> {
             ctx.save();

             var size = 1*cR;
             ctx.font = size + 'px Microsoft Yahei';
             ctx.textAlign = 'center';
             ctx.fillStyle = "#fff";
             ctx.fillText(~~this.datalist.xuexijindu, r, 80 + size / 2);

             ctx.restore();
            };

            var render = function(){
             ctx.clearRect(0, 0, mW, mH);

             rangeValue = range.value;

             if(IsdrawCircled == false){
              drawCircle();
             }

             if(nowRange <= rangeValue){
              var tmp = 1;
              nowRange += tmp;
             }

             if(nowRange > rangeValue){
              var tmp = 1;
              nowRange -= tmp;
             }

             drawSin(xOffset);
             drawText();

             xOffset += speed;
             requestAnimationFrame(render);
            }

            render();
        },
        // 页面上来获取数据
        getData() {
            let param = `uid=${this.uid}`;
            let md5 = this.$md5(param);
            let key = md5.substr(6,6);
            let url = `/api/get/main.ashx?key=${key}&uid=${this.uid}`;
            axios.get(url).then((res)=> {
                console.log(res);
                if(res.data.state == 0) {     //用户没选择科目，弹出下面的对话框，让用户选择科目
                    this.rightShow  = true;
                    this.datalist = res.data.data;
                    // console.log(this.datalist);
                }else if(res.data.state == 1){
                    this.pic = res.data.data.picture
                    this.isShow = true;
                    this.datalist = res.data.data;
                    this.splite = res.data.data.ad;
                    this.news = res.data.data.news;
                    this.initCanvas();
                    storage.set('learnpid', res.data.data.learnpid)
                    this.init();
                }
            })
        },
        // 页面第二次进来请求数据
        getdata() {
            setTimeout(()=> {
                let param = `learncid=${this.ID}&learnpid=${this.learnpid}&uid=${this.uid}`;
                let md5 = this.$md5(param);
                let key = md5.substr(6,6);
                let url = `/api/set/save_userlearn.ashx?key=${key}&learncid=${this.ID}&learnpid=${this.learnpid}&uid=${this.uid}`;
                axios.get(url).then((res)=> {
                    if(res.data.state == 1) {
                        this.splite = res.data.data.ad;
                        this.datalist = res.data.data.data;
                        this.initCanvas();
                    }else if(res.data.state == 0) {
                        Toast({
                            message: res.data.msg,
                            duration: 2000
                        });
                    }
                })
            }, 300)
        },
        // 获取科目选择的数据
        getDetailData() {
            axios.get('/api/get/categoryByParentid.ashx?parentid=0').then((res)=> {
                if(res.data.state == 1) {
                    this.levelOne = res.data.data;
                }
            })
        },
        // 科目选择 页面刚上来的时候右面就显示
        getRightInit() {
            axios.get('/api/get/categoryByParentid.ashx?parentid=1').then((res)=> {
                this.levelTow = res.data.data;
            })
        },

        //跳转到答题页面
        toQuestion(type, chapter, fromid ) {
            this.$router.push({path: '/question', query: {
                type: type,
                chapter: chapter,
                fromid: fromid
            }})
        },
        toCuoti(n, text) {
            this.$router.push({path: '/list', query: {
                x: n,
                content: text
            }});
        },
        toShoucang(n, text) {
            this.$router.push({path: '/list', query: {
                x: n,
                content: text
            }});
        },
        toFuxi(n, text) {
            this.$router.push({path: '/list', query: {
                x: n,
                content: text
            }});
        },
        toZhanti(n, text) {
            this.$router.push({path: '/list', query: {
                x: n,
                content: text
            }});
        },
        toBiji(n, text) {
            this.$router.push({path: '/list', query: {
                x: n,
                content: text
            }});
        },

        handleScroll() {
            window.onscroll = ()=> {
                let scollTop = parseInt(document.documentElement.scrollTop || document.body.scrollTop);
                let headerDom = document.querySelector('.lianxi .header');
                if(scollTop > 30) {
                    headerDom.style.background = "#00bacb";
                }else{
                    headerDom.style.background = "rgba(0,0,0,0)";
                }
            }
        },
        //点击滑动的图片跳转到其他的页面
        toHtml(url) {
            // window.location.href = url;
        }
    },
    mounted() {
        this.uid = storage.get('uid');
        this.getData();
        this.init();
        this.handleScroll();
        if(!storage.get('username')) {
            this.$router.push('/login');
        }
    },
    beforeDestroy() {
        window.onscroll = null;
    }
}
</script>

<style lang="scss" scoped>
    .lianxi{
        padding-bottom: .6rem;
        .header{
            height: .54rem;
            width: 100%;
            line-height: .54rem;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 5;
            transition:background .3s;
            -webkit-transition:background .3s;
            -moz-transition:background .3s;
            -o-transition:background .3s;
            .left{
                width: .36rem;
                height: .36rem;
                margin: .08rem 0 0 .1rem;
                float: left;
                border-radius: 50%;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
            }
            input{
                width: 2.27rem;
                height: .26rem;
                border-radius: .13rem;
                border: none;
                outline: none;
                font-size: .14rem;
                color: #999;
                box-sizing: border-box;
                float: left;
                margin-top: .12rem;
                position: relative;
                left: 50%;
                margin-left: -1.5rem;
                padding: 0 .1rem 0 .35rem;
                background:#fff url(../../static/img/589345584270619180.png) no-repeat .1rem center;
            }
            .right{
                width: .25rem;
                height: .2rem;
                float: right;
                margin: .15rem 0.1rem 0 0;
            }
        }
        .main{
            background: -webkit-linear-gradient(#1bd0c9,#00b6cf);
            background: -o-linear-gradient(#1bd0c9,#00b6cf);
            background: -moz-linear-gradient(#1bd0c9,#00b6cf);
            background: linear-gradient(#1bd0c9,#00b6cf);
            width: 100%;
            height: 3.5rem;
            padding-top: .54rem;
            box-sizing: border-box;
            .main-top{
                width: 100%;
                margin: 0 auto 0;
                height: 1.6rem;
                position: relative;
                b{
                    display: block;
                    position: absolute;
                    top: 80%;
                    font-weight: 700;
                    font-size: .15rem;
                    color: #fff;
                    width: 100%;
                    text-align: center;
                }
                strong{
                    position: absolute;
                    top: 28%;
                    font-size: .2rem;
                    color: #fff;
                    left: 52%;
                    margin-left: .18rem;
                }
                #c{
                 margin: -.1rem auto 0;
                 display: block;
                }
                #r{
                 display: block;
                 margin: 0 auto;
                }
                #r::before{
                 color: black;
                 content: attr(min);
                 padding-right: 10px;
                }
                #r::after{
                 color: black;
                 content: attr(max);
                 padding-left: 10px;
                }
                .mask {
                    width: 130px;
                    height: 130px;
                    border-radius: 50%;
                    left: 15px;
                    top: 15px;
                    background: #13B7BD;
                    position: absolute;
                    text-align: center;
                    line-height: 120px;
                    font-size: 20px;
                    color: #fff;
                    p{
                        display: inline;
                        position: absolute;
                        left: 50%;
                        margin-left: -30px;
                        top: 45px;
                        font-size: 16px;
                        color: #fff;
                    }
                }
            }
            .canvas{
                display: flex;
                margin-top: .3rem;
                background: url(../../static/img/d1f0175c6bcb049dacdc08ad99a4dfa.png) no-repeat left bottom;
                background-size: 100% 45%;
                height: 1.15rem;
                li{
                    flex: 1;
                    text-align: center;
                    p{
                        font-size: .14rem;
                        color: #fff;
                        text-align: center;
                        line-height: 2;
                    }
                }
            }
        }
        .gray{
            background: #eee;
            height: .08rem;
            width: 100%;
        }

        .readAgain{
            height: 1.06rem;
            ul{
                display: flex;
                justify-content: space-around;
                padding-top: .17rem;
                li{
                    text-align: center;
                    img{
                        width: .4rem;
                        height: .4rem;
                        display: block;
                    }
                    h4{
                        font-size: .14rem;
                        color: #333;
                        font-weight: normal;
                        margin-top: .05rem;
                    }
                }
            }
        }

        .answer{
            width: 90%;
            height: .68rem;
            border-bottom: 1px solid #eee;
            margin: 0 auto;
            padding: .08rem 0 .08rem 0rem;
            box-sizing: border-box;
            display: flex;
            .left{
                width: .45rem;
                height: .45rem;
                position: relative;
                top: 50%;
                margin-top: -.22rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .ceter{
                flex: 1;
                margin: 0 .15rem;
                position: relative;
                top: 50%;
                margin-top: -.25rem;
                p{
                    color: #222;
                    font-size: .16rem;
                }
                span{
                    display: block;
                    color: #999;
                    font-size: .13rem;
                    margin-top: .04rem;
                }
            }
            .right{
                display: block;
                width: .88rem;
                position: relative;
                top: 50%;
                margin-top: -.14rem;
                button{
                    width: .88rem;
                    height: .28rem;
                    border-radius: .08rem;
                    font-size: .14rem;
                    color: #fff;
                    background: #00bacb;
                    border: 0;
                    outline: 0;
                }
            }
        }
        ul.bgBoy{
            margin-top: .17rem;
            display: flex;
            width: 100%;
            overflow-y: auto;
            padding: 0 .1rem 0 .1rem;
            box-sizing: border-box;
            -o-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            li{
                padding: 0 .04rem;
                &:last-child{
                    padding-right: .16rem;
                }
                .inner{
                    img{
                        display: block;
                        width: 2.38rem;
                        height: 1.1rem;
                        border-radius: .08rem;
                        -webkit-border-radius: .08rem;
                        -moz-border-radius: .08rem;
                        -o-border-radius: .08rem;
                    }
                }
            }
        }

        .footer{
            margin-top: .13rem;
            padding: 0 .17rem;
            p{
                font-size: .12rem;
                color: #4c4c4c;
            }
            .bigImg{
                width: 100%;
                // height: 1.52rem;
                margin-top: .12rem;
                border-radius: .05rem;
                -webkit-border-radius: .05rem;
                -o-border-radius: .05rem;
                -moz-border-radius: .05rem;
            }
            ul.footerUl{
                margin-top: .18rem;
                li{
                    display: flex;
                    .left{
                        flex: 1;
                        padding-top: .02rem;
                        h3{
                            color: #292929;
                            font-size: .12rem;
                            font-weight: normal;
                        }
                        span{
                            display: block;
                            color: #929292;
                            height: .32rem;
                            font-size: .12rem;
                            margin-top: .03rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                        }
                    }
                    img.right{
                        width: 1.22rem;
                        height: .62rem;
                        margin-left: .31rem;
                        border-radius: .05rem;
                        -webkit-border-radius: .05rem;
                        -o-border-radius: .05rem;
                        -moz-border-radius: .05rem;
                    }
                }
            }
        }

        .masks{
            position: fixed;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            background: rgba(0,0,0,.8);
            z-index: 10;
        }
        i.i{
            z-index: 10;
            position: fixed;
            display: block;
            left: 14%;
            top: 6%;
            width: 293px;
            height: 83px;
            // background-size: 100% 100%;
            background: url(../../static/img/suoyin.png) no-repeat 0;
        }
        h6{
            position: fixed;
            left: 50%;
            margin-left: -.98rem;
            top: 19%;
            z-index: 10;
            font-size: .2rem;
            font-weight: normal;
            color: #fff;
        }
        .xxuu{
            position: fixed;
            z-index: 20;
            right: .1rem;
            top: .15rem;
            width: .25rem;
        }
        .mask_xu{
            .maskMain{
                position: absolute;
                left: 0;
                width: 100%;
                background: #fff;
                z-index: 15;
                bottom: -100%;
                height: 0;
                overflow: hidden;
                transition: all .3s;
                -webkit-transition: all .3s;
                -o-transition: all .3s;
                -moz-transition: all .3s;
                .maskTop{
                    width: 100%;
                    height: .38rem;
                    line-height: .38rem;
                    border-bottom: 1px solid #dbdbdb;
                    font-size: .16rem;
                    color: #333;
                    text-align: center;
                }
                .mask_main{
                    display: flex;
                    background: #fff;
                    .maskLeft{
                        width: 1.3rem;
                        color: #4c4c4c;
                        font-size: .14rem;
                        ul{
                            padding: 0 .14rem 0 .29rem;
                            li{
                                padding: .14rem 0;
                                border-bottom: 1px solid #eee;
                                overflow: hidden;
                                &.active{
                                    color: #00bacb;
                                }
                                span{
                                    float: left;
                                }
                                i{
                                    float: right;
                                    font-size: .12rem;
                                }
                            }
                        }
                    }
                    .maskRight{
                        flex: 1;
                        color: #4c4c4c;
                        font-size: .14rem;
                        background: #EEEEEE;
                        ul{
                            padding: 0 .29rem 0 .27rem;
                            li{
                                padding: .14rem 0;
                                border-bottom: 1px solid #dbdbdb;
                                overflow: hidden;
                                span{
                                    float: left;
                                }
                                i{
                                    float: right;
                                    font-size: .12rem;
                                }
                            }
                        }
                    }
                }
            }
        }

    }
</style>
