var cookie = {
    get: function(name){
        var cookieStr = document.cookie;
        var datas = cookieStr.split("; ");
        for(var i = 0; i < datas.length; i++){
            var detail = datas[i].split("=");
            if(detail[0] == name){
                return decodeURIComponent(detail[1]);
            }
        }
        return "";
    },

    set: function(name, value, expires) {
        var exp = new Date();
        exp.setDate(exp.getDate() + expires);
        // 获得GMT字符串
        var gmtStr = exp.toGMTString();
        // 设置cookie
        document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + gmtStr;
    },

    remove: function(name){
        set(name, "", -1);
    }
}
export default cookie;
