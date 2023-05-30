const btn = document.getElementById("btn")
const fileDom = document.querySelector("input[type=file]")

// 选择的文件生成图片对象
function loadImage() {
    // 1、 通过上传按钮获取文件数据
    const file = fileDom.files[0]
    if(!file) return null;

    // 2、通过文件数据创建objectURL
    const objUrl = URL.createObjectURL(file)
    const img = new Image()

    return new Promise((resolve, reject) => {
        img.onload = () => {
            resolve(img)
        }
        img.onerror = () => {
            resolve(null)
        }
        img.src = objUrl
    })
}


// 创建 div 的 html
function createHtml(width, height, bmp) {
    const shadowCSSFragments = []   // 阴影css的片段
    const shadowCSSHover = []   // 鼠标移入的css阴影

    // 读取每个位图的像素点
    for(let r = 0; r < height; r++) {
        for(let c = 0; c < width; c++) {
            const i = r * width + c
            const R = bmp[i * 4]
            const G = bmp[i * 4 + 1]
            const B = bmp[i * 4 + 2]
            const A = bmp[i * 4 + 3] / 255
            shadowCSSFragments.push(`${c + 1}px ${r}px rgba(${R}, ${G}, ${B}, ${A})`)
            shadowCSSHover.push(`${c + 1}px ${r}px rgba(${255 - R}, ${255 - G}, ${255 - B}, ${A})`)
        }
    }

    return `
        <!doctype html>
        <html>
            <head>
                <meta charset="UTF-8" />
                <style>
                    .shadow-img{
                        width: ${width}px;
                        height: ${height}px;
                    }
                    .shadow-img .inner{
                        width: 1px;
                        height: 1px;
                        box-shadow: ${shadowCSSFragments.join(',')};
                        transition: 0.5s;
                    }
                    .shadow-img:hover .inner{
                        box-shadow: ${shadowCSSHover.join(',')};
                    }
                </style>
            </head>
            <body>
                <div class="shadow-img">
                    <div class="inner"></div>
                </div>
            </body>
        </html>
    `
}

// 下载生成好的html
function download(html) {
    const blob = new Blob([html], {type: "text/html"})
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.style.display = 'none'
    a.download = "demo.html"
    a.click()
}

async function generate() {
    const img = await loadImage();  // 生成图片对象
    if(!img) return;

    // 将图片画在canvas上,通过 canvas 得到每个像素点的颜色
    const cvs = document.createElement("canvas")
    cvs.width = img.width;
    cvs.height = img.height;
    const ctx = cvs.getContext("2d")
    ctx.drawImage(img, 0, 0)

    // 获取 canvas 中的位图（位图就是每个像素点的颜色）
    const bmp = ctx.getImageData(0,0,img.width, img.height).data
    const html = createHtml(img.width, img.height, bmp)

    // 下载 html
    download(html)
}

btn.onclick = generate;
