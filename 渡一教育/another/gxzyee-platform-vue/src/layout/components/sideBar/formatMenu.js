export function formatMenu(data) {
  const result = []
  data.forEach((item) => {
    const obj = {
      icon: item.meta ? (item.meta.icon || (item.children && item.children.length ? 'folder' : 'file')) : item.children && item.children.length ? 'folder' : 'file',
      title: item.meta ? item.meta.title : '',
      path: item.path,
      name: item.name,
      hidden: item.meta ? item.meta.hidden || false : true,
      target: item.meta ? item.meta.target : ''
    }
    if (item.children && item.children.length) {
      obj.children = formatMenu(item.children)
    }
    result.push(obj)
  })
  return result
}
