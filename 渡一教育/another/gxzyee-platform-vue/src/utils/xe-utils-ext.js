import XEUtils from 'xe-utils'

XEUtils.mixin({
  toArrayTreeExt(data, opt) {
    const tree = XEUtils.toArrayTree(data, opt)
    XEUtils.removeEmptyChildren(tree)
    return tree
  },
  removeEmptyChildren(list) {
    list.forEach(item => {
      const { children } = item
      if (children) {
        if (children.length === 0) {
          delete item.children
        } else {
          XEUtils.removeEmptyChildren(children)
        }
      }
    })
  },
  toDateDiffText(date) {
    const currDate = new Date().getTime()
    const dateDiff = XEUtils.getDateDiff(date, currDate)
    if (dateDiff.done) {
      if (dateDiff.time < 31536000000) {
        if (dateDiff.time < 2592000000) {
          if (dateDiff.time < 86400000) {
            if (dateDiff.time < 3600000) {
              if (dateDiff.time < 60000) {
                if (dateDiff.time < 10000) {
                  return `刚刚`
                }
                return `${dateDiff.ss}秒之前`
              }
              return `${dateDiff.mm}分钟之前`
            }
            return `${dateDiff.HH}小时之前`
          }
          return `${dateDiff.dd}天之前`
        }
        return `${dateDiff.MM}个月之前`
      }
      return `${dateDiff.yyyy}年之前`
    }
    return ''
  }
})
