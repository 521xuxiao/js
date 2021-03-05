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
