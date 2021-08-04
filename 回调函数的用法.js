//  回调函数的用法

test(()=>{
    console.log("拿到数据之后走的");
});




function test(callback) {
    axios.get("/api/xxx").then(res=>{
        res.data;
        // 利用回调函数往外返回数据
        callback && callback();
    }).catch()
}
