<template>
<div>
  <div class="top">
    <h3>品类管理</h3>
     <el-button type="primary" icon="el-icon-plus" @click="$router.push('/hh/addgoods')">添加品类</el-button>
  </div>
  <p style="font-size:16px;margin-top:10px;line-height:20px">当前商品分类ID:&nbsp;&nbsp;{{ text }}</p>
   <el-table
    :data="tableData"
    border
    style="width: 100%;margin-top:10px">
    <el-table-column
      prop="id"
      label="品类ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="品类名称"
      width="180">
    </el-table-column>
    <el-table-column
      label="操作"
      >
      <template slot-scope="scope">
        <div>
       <el-button type="primary" size="mini" @click="upda(scope.row.id,scope.row.name)">修改名称</el-button>
       <el-button v-show="flag==true" type="primary" size="mini" @click="look(scope.row.id)">查看其子品类</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import {cate, setcate, lookcate} from '@/until/api'
export default {
  // 组件名称
  name: 'Demo',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data () {
    return {
      text:0,
      tableData:[],
      flag:true,
      id:''
    }
  },
  /**
  * 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
  * 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
  */
  // 计算属性
  computed: {},
  // 侦听器
  watch: {
    $route:{
      handler(ee) {
        console.log(ee)
        if(this.$route.fullPath.includes('?')) {
          this.flag=false
        }else{
          this.flag=true
        }
        console.log(this.flag)
      },
      immediate:true
    }
  },
  mounted () {
    this.get()
  },
  // 组件方法
  methods: {
    get() {
      cate().then(res => {
        console.log(res)
        this.tableData=res.data
      })
    },
    upda(ee, aa) {
      let bb=  prompt('请输入新的品类名称', aa)
      console.log(bb)
      if(bb==null||bb=='') {
        alert('请输入正确的品类名称')
        return
      }
      setcate(ee, bb).then(res => {
        console.log(res)
        alert('更新品类名字成功')
      })
      if(this.flag==false) {
        console.log('12')
        lookcate(this.id).then(res => {
          console.log(res)
          this.tableData=res.data
        })
      }else{
        console.log('334')
        this.get()
      }

    },
    look(ee) {
      console.log(ee)
      this.id=ee
      this.$router.push(`/hh/cate?${ee}`)
      lookcate(ee).then(res => {
        console.log(res)
        this.tableData=res.data
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style lang="scss"  scoped>
.top {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  align-items: center;
  height: 60px;
  h3 {
    font-size: 26px;
    color: #666666;
  }
  .el-button {
    height: 36px;
    font-size: 14px;
    font-weight: 400;
    background: #337ab7;
  }
}
</style>
