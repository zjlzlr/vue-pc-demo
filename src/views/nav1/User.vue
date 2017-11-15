<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUser">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<template>
			<el-table :data="users" highlight-current-row style="width: 100%;">
				<el-table-column type="index" width="60">
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="120" sortable>
				</el-table-column>
				<el-table-column prop="sex" label="性别" width="100" sortable>
				</el-table-column>
				<el-table-column prop="age" label="年龄" width="100" sortable>
				</el-table-column>
				<el-table-column prop="birth" label="生日" width="120" sortable>
				</el-table-column>
				<el-table-column prop="addr" label="地址" min-width="180" sortable>
				</el-table-column>
			</el-table>
		</template>

	</section>
</template>
<script>
import { lockHttp } from '@/lib/http'
export default {
  data () {
    return {
      filters: {
        name: ''
      },
      users: []
    }
  },
  methods: {
    // 获取用户列表
    getUser () {
      const url = '/rock/userList'
      lockHttp.get(url).then((result) => {
        this.users = result.data
      }).catch(() => {
      })
      // NProgress.start()
      // getUserList(para).then((res) => {
      //   this.users = res.data.users
      //   this.loading = false
      // })
    }
  },
  mounted () {
    this.getUser()
  }
}
</script>

<style scoped>

</style>