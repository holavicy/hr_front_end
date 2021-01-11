export default ({ request }) => ({
  // 获取钉钉用户信息
  DING_LOGIN (data) {
    return request({
      url: 'getUserInfo?code=' + data.code
    })
  }
})
