export default ({ request }) => ({
  // 花名册
  HUA_MING_CE (data) {
    return request({
      url: '/huaMingCe?page=' + (data.page || '') + '&pageSize=' + (data.pageSize || '') + '&staffNo=' + (data.staffNo || '') + '&name=' + (data.name || '')+ '&groupValue=' + (data.groupValue || '')
    })
  },
  // 导出花名册
  EXPORT_HUA_MING_CE (data) {
    return request({
      url: '/exportHuaMingCe?page=' + (data.page || '') + '&pageSize=' + (data.pageSize || '') + '&staffNo=' + (data.staffNo || '') + '&name=' + (data.name || '')+ '&groupValue=' + (data.groupValue || '')
    })
  },
  // 获取部门列表
  GET_ORG_LIST (data) {
    return request({
      url: '/orgList'
    })
  },
  // 获取业务单元列表
  GET_GROUPS_LIST (data) {
    return request({
      url: '/groupsList'
    })
  }
})
