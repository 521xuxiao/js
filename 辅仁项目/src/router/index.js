import Vue from 'vue'
import Router from 'vue-router'
import registration from '@/components/registration';
import login from '@/components/login';
import list from '@/components/list';
import shoucangSearch from '@/components/shoucangSearch';
import shoucangZhanti from '@/components/shoucangZhanti';
import question from '@/components/question';
import detail from '@/components/detail';
import forgotPassword from '@/components/forgotPassword';
import index from '@/components/index';
import lianxi from '@/components/lianxi';
import kecheng from '@/components/kecheng';
import zixun from '@/components/zixun';
import my from '@/components/my';
import paySuccess from '@/components/pay/paySuccess';
import search from '@/components/search/search';
import searchXiaoChao from '@/components/search/searchXiaoChao';
import anwserDetail from '@/components/anwser/anwserDetail';
import anwser from '@/components/anwser/anwser';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/search',
            component: search
        },
        {
            path: '/shoucangZhanti',
            component: shoucangZhanti
        },
        {
            path: '/shoucangSearch',
            component: shoucangSearch
        },
        {
            path: '/list',
            component: list
        },
        {
            path: '/detail',
            component: detail
        },
        {
            path: '/question',
            component: question,
            meta: {
                // index: 2
            }
        },
        {
            path: '/forgotPassword',
            component: forgotPassword
        },
        {
            path: '/anwser',
            component: anwser
        },
        {
            path: '/anwserDetail',
            component: anwserDetail
        },
        {
            path: '/searchXiaoChao',
            component: searchXiaoChao
        },
        {
            path: '/registration',
            component: registration
        },
        {
            path: '/paySuccess',
            component: paySuccess
        },
        {
            path: '/login',
            name: 'login',
            component: login,
        },
        {
            path: '/',
            component: index,
            children: [
                {
                    path: '/',
                    component: lianxi,
                    meta: {
                        index: 1
                    }
                },
                {
                    path: 'lianxi',
                    component: lianxi,
                    meta: {
                        keepAlive: false,
                        index: 1
                    }
                },
                {
                    path: '/kecheng',
                    component: kecheng,
                    meta: {
                        keepAlive: true,
                        index: 2
                    }
                },
                {
                    path: '/zixun',
                    component: zixun,
                    meta: {
                        index: 3
                    }
                },
                {
                    path: '/my',
                    component: my,
                    meta: {
                        index: 4
                    }
                },
            ]
        },

    ]
})
