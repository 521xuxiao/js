
/**
 *   B页面跳转到A页面， A页面缓存， 其它的跳转到A页面， A页面不缓存
 */

{
    path: '/A',
	name: 'A',
    component: A,
    meta: {
        title: "A",
        keepAlive: true
    }
},
{
    path: '/B',
    name: 'B',
    component: B
},


//	A.vue中
beforeRouteLeave(to, from, next) {
    if (to.name === "B") {             // 跳转到 B 页面
        from.meta.keepAlive = true;    //  A 页面被缓存下来
    } else {                           // 跳转到其它的页面
        from.meta.keepAlive = false;   // A 页面不被缓存
    }
    next();
}



// 路由展示区
<keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>






