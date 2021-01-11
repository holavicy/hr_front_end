export default ({ request }) => ({
  // 花名册
  HUA_MING_CE (data) {
    return request({
      url: '/huaMingCe?page=' + (data.page || '') + '&pageSize=' + (data.pageSize || '') + '&staffNo=' + (data.staffNo || '') + '&name=' + (data.name || '') + '&getYear=' + (data.getYear || '')
    })
  },
   // 导出花名册
   EXPORT_HUA_MING_CE (data) {
    return request({
      url: '/exportHuaMingCe?page=' + (data.page || '') + '&pageSize=' + (data.pageSize || '') + '&staffNo=' + (data.staffNo || '') + '&name=' + (data.name || '') + '&getYear=' + (data.getYear || '')
    })
  }
})