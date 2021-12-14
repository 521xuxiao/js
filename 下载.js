let params = {
            accounting_period_id: this.state.dayRange,
            flag: this.state.assetsNumber?1:""
        }
        Axios.post("/self/erp/fixedAssets/exportFixedAssetsDepreciationSummarySheetExcel", params, {responseType: 'blob'}).then(function(res) {
            let blob = res.data;
            // FileReader主要用于将文件内容读入内存
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            // onload当读取操作成功完成时调用
            reader.onload = function(e) {
                let a = document.createElement('a');
                // 获取文件名fileName
                let fileName = res.headers["content-disposition"].split("=");
                fileName = fileName[fileName.length - 1];
                let filenames = decodeURIComponent(fileName);
                a.download = filenames;
                a.href = e.target.result;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        })


第二种下载方式： illegalRecordDetailDownLoad()：这个是axios的方法  
export function illegalRecordDetailDownLoad(data){
    return axios({
        method: 'post',
        url: `/analysis/export`,
        responseType: 'blob',
        data
    })
}

// res 即为Blob对象
let res = await illegalRecordDetailDownLoad(params);
// 下载文件名字
var file = '新增建筑违法检测';
// 创建a标签
const link = document.createElement('a');
// 实例blob对象
const blob = new Blob([res], {type: 'application/vnd.ms-excel'});
// 创建的a标签添加href属性    window.URL.createObjectURL(blob) 即为blob下载对象链接 blob:http://localhost:3000/5685d7c3-e623-4092-9d73-f9be68d4ae79
console.log(window.URL.createObjectURL(blob))
link.setAttribute('href', window.URL.createObjectURL(blob));
// a标签添加download属性
link.setAttribute('download', file+new Date().getTime() + '.xlsx');
link.style.visibility = 'hidden';
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
