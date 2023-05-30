
export default {
  inserted(el, binding) {
    function addWaterMarker(str, str2, parentNode, font, textColor) { // 水印文字，父元素，字体，文字颜色
      const can = document.createElement('canvas')
      // 设置画布的长宽
      can.width = 400
      can.height = 200
      can.style.display = 'none'

      const cans = can.getContext('2d')
      // 旋转角度
      cans.rotate(-20 * Math.PI / 180)
      cans.font = font || '15px Vedana'
      // 设置填充绘画的颜色、渐变或者模式
      cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)'
      // 设置文本内容的当前对齐方式
      cans.textAlign = 'left'
      // 设置在绘制文本时使用的当前文本基线
      cans.textBaseline = 'Middle'
      // 在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
      if (str) {
        cans.fillText(str, can.width / 16, can.height / 2)
      }
      if (str2) {
        cans.fillText(str2, can.width / 16, can.height / 2 + 22)
      }
      const div = document.createElement('div')
      div.className = 'water-marker'
      div.style.pointerEvents = 'none'
      div.style.position = 'absolute'
      div.style.left = '0px'
      div.style.top = '0px'
      div.style.w = 'absolute'
      div.style.zIndex = '999'
      div.style.width = '100%'
      div.style.height = '100%'
      div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
      parentNode.style.position = 'relative'
      parentNode.appendChild(div)
    }
    addWaterMarker(binding.value.text, binding.value.text2, el, binding.value.font, binding.value.textColor)
  }

}
