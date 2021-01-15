<template>
  <d2-container>
    <template slot="header">
        <div class="action-wrapper">
            <div class="filter-item"><span>工号：</span> <el-input size="mini" placeholder="请输入内容" v-model="staffNoSearch"></el-input></div>
            <div class="filter-item"><span>姓名：</span> <el-input size="mini" placeholder="请输入内容" v-model="name"></el-input></div>
            <el-button size="mini" type="primary" @click="getList(1)">查询</el-button>
            <el-button size="mini" type="primary" plain @click="exportFile()">导出</el-button>
        </div>
    </template>
    <el-table :data="list" border style="width: 100%" size="mini" v-loading="loading">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="CODE" label="工号" width="80"></el-table-column>
        <el-table-column prop="NAME" label="姓名" width="80"></el-table-column>
        <el-table-column prop="ORGNAME" label="业务单元" width="200"></el-table-column>
        <el-table-column label="一级部门" width="120">
           <template slot-scope="scope">
            {{scope.row.dept_list[0]}}
          </template>
        </el-table-column>
        <el-table-column label="二级部门" width="120">
          <template slot-scope="scope">
            {{scope.row.dept_list[1]}}
          </template>
        </el-table-column>
        <el-table-column label="三级部门" width="120">
          <template slot-scope="scope">
            {{scope.row.dept_list[2]}}
          </template>
        </el-table-column>
        <el-table-column prop="POSTNAME" label="岗位" width="120"></el-table-column>
        <el-table-column prop="JIGUAN" label="籍贯" width="160"></el-table-column>
        <el-table-column prop="MINZU" label="民族" width="120"></el-table-column>
        <el-table-column prop="SEX" label="性别" width="120"></el-table-column>
        <el-table-column prop="HUKOUXINGZHI" label="户口性质" width="120"></el-table-column>
        <el-table-column prop="HUKOUSUOZAIDI" label="户口所在地" width="120"></el-table-column>
        <el-table-column prop="ZHENGZHIMIANMAO" label="政治面貌" width="120"></el-table-column>
        <el-table-column prop="HUNYINZHUANGKUANG" label="婚姻状况" width="80"></el-table-column>
        <el-table-column prop="MOBILE" label="手机号码" width="100"></el-table-column>
        <el-table-column prop="ZHENGJIANLEIXING" label="证件类型" width="80"></el-table-column>
        <el-table-column prop="ZHENGJIANHAO" label="证件号码" width="160"></el-table-column>
        <el-table-column prop="YOUXIAOQI" label="身份证有效期" width="120"></el-table-column>
        <el-table-column prop="CENSUSADDR" label="身份证地址" width="300"></el-table-column>
        <el-table-column prop="GLBDEF1" label="联系地址" width="300"></el-table-column>
        <el-table-column prop="BIRTHDATE" label="出生日期" width="100"></el-table-column>
        <el-table-column prop="AGE" label="年龄" width="50"></el-table-column>
        <el-table-column prop="JOINDATE" label="入职集团日期" width="120"></el-table-column>
        <el-table-column prop="MUXIANBEGINDATE" label="入职母线日期" width="120"></el-table-column>
        <el-table-column prop="ZCDENGJI" label="职称等级" width="120"></el-table-column>
        <el-table-column prop="ZCNAME" label="职称名称" width="120"></el-table-column>
        <el-table-column prop="CREATIONTIME" label="职称获取时间" width="140"></el-table-column>
        <el-table-column prop="XUELI" label="学历" width="120"></el-table-column>
        <el-table-column prop="SCHOOL" label="学校名称" width="180"></el-table-column>
        <el-table-column prop="MAJOR" label="专业" width="120"></el-table-column>
        <el-table-column prop="BEGINDATE" label="入校时间" width="120"></el-table-column>
        <el-table-column prop="ENDDATE" label="毕业时间" width="120"></el-table-column>
        <el-table-column prop="JTAGE" label="集团工龄" width="100"></el-table-column>
        <el-table-column prop="MXAGE" label="母线工龄" width="100"></el-table-column>
        <el-table-column prop="ZWMC" label="职务名称" width="120"></el-table-column>
        <el-table-column prop="ZWJB" label="职务级别" width="100"></el-table-column>
        <el-table-column prop="ZHIJI" label="行政级别" width="100"></el-table-column>
        <el-table-column prop="POSTSERIESNAME" label="岗位序列" width="120"></el-table-column>
        <el-table-column prop="JOBTYPENAME" label="员工状态" width="120"></el-table-column>
        <el-table-column label="是否有试用期" width="120">
           <template slot-scope="scope">
            {{scope.row.IFPROP == 'Y' ? '是':'否'}}
          </template>
        </el-table-column>
        <el-table-column label="试用期开始日期" width="120">
           <template slot-scope="scope">
            {{scope.row.JOBTYPENAME == '试用期员工' ? scope.row.PROBEGINDATE:''}}
          </template>
        </el-table-column>
        <el-table-column label="试用期结束日期" width="120">
           <template slot-scope="scope">
            {{scope.row.JOBTYPENAME == '试用期员工' ? scope.row.PROBENDDATE:''}}
          </template>
        </el-table-column>
        <el-table-column prop="ZZDATE" label="实际转正日期" width="120"></el-table-column>
        <el-table-column prop="LINKMAN" label="紧急联系人姓名" width="120"></el-table-column>
        <el-table-column prop="LINKMANMOBILE" label="紧急联系人电话" width="120"></el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="[5, 10, 20, 50, 100]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total" style="margin-top:10px"></el-pagination>

  </d2-container>
</template>

<script>
import dayjs from 'dayjs'
import { mapActions } from 'vuex'
export default {
  name: 'huamingce',
  data () {
    return {
      dayjs,
      loading: false,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      staffNoSearch: '',
      name: '',
      list: [],
      userInfo: {}
    }
  },
  methods: {
    ...mapActions('d2admin/db', [
      'database',
      'databaseClear'
    ]),
    async load () {
      const db = await this.database({ user: true })
      this.userInfo = db.get('user_info').value()
      console.log(this.userInfo)
    },
    // 获取列表
    getList (page) {
      this.loading = true
      if (page) {
        this.pagination.currentPage = page
      }
      const data = {
        staffNo: this.staffNoSearch,
        name: this.name,
        page: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      }
      this.$api.HUA_MING_CE(data).then((res) => {
        this.loading = false
        this.list = res.list
        this.pagination.total = res.count
      })
    },
    exportFile () {
      this.loading = true
      const data = {
        staffNo: this.staffNoSearch,
        name: this.name
      }
      this.$api.EXPORT_HUA_MING_CE(data).then((res) => {
        // console.log(res)
        this.loading = false
        console.log(1)
        const href = 'http://' + this.HOST_FILES + res.url
        console.log(2)
        console.log(href)
        // window.location.href = href
        this.$message.success('导出成功')
      }).catch(e => {
        this.loading = false
        this.$message.error('导出失败')
      })
    },
    handleSizeChange (val) {
      this.pagination.pageSize = val
      this.getList(1)
    },
    handleCurrentChange (val) {
      this.pagination.currentPage = val
      this.getList()
    }
  },
  created () {
    this.load()
    this.getList(1)
  }
}
</script>

<style scoped>
.action-wrapper{
    display: flex;
    font-size: 12px;
}

.action-wrapper .filter-item{
    width: 260px;
    display: flex;
    align-items: center;
    margin-right: 20px;
}

.action-wrapper .filter-item span{
    width: 60px;
    flex-shrink: 0;
}

.margin-right-20{
    margin-right: 20px;
}

.cus-badge{
  font-size: 10px;
  line-height: 12px;
  background: red;
  color: #ffffff;
  border-radius: 5px;
  padding: 0 4px;
  font-style: normal;
}
</style>
