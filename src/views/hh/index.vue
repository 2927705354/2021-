<template>
<div style="height:100%">
  <el-container style="height:100%">
  <el-header>
    <h3 @click="$router.push('/hh/wel')">MMALL ADMIN</h3>
    <div><span>欢迎，admin</span><span style="color:#6C7AB7" @click="logout">退出</span></div>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      style=" background-color: #F8F8F8;"

      router
      >
      <el-menu-item index="/hh/wel" style="border-bottom:1px solid #ccc">
        <i class="el-icon-menu"></i>
        <span slot="title">Home</span>
      </el-menu-item>
        <el-menu-item index="">
        <i class="el-icon-setting"></i>
        <span slot="title">商品</span>
      </el-menu-item>
       <el-menu-item index="/hh/goods" style="padding-left:50px">
        <span slot="title">商品管理</span>
      </el-menu-item>
      <el-menu-item index="/hh/cate" style="border-bottom:1px solid #ccc;padding-left:50px">
        <span slot="title">品类管理</span>
      </el-menu-item>
         <el-menu-item index="">
        <i class="el-icon-setting"></i>
        <span slot="title">订单</span>
      </el-menu-item>
      <el-menu-item index="/hh/list" style="border-bottom:1px solid #ccc;padding-left:50px">
        <span slot="title">订单管理</span>
      </el-menu-item>
    </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</div>
</template>

<script>
import {logout} from '@/until/api'
export default {
  // 组件名称
  name: 'Demo',
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data () {
    return {}
  },
  /**
  * 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
  * 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
  */
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  mounted () {
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
  * 在实例初始化之后，组件属性计算之前，如data属性等
  */
  beforeCreate () {
  },
  /**
  * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
  */
  created () {
  },
  /**
  * 在挂载开始之前被调用：相关的 render 函数首次被调用。
  */
  beforeMount () {
  },
  /**
  * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
  * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
  */
  beforeUpdate () {
  },
  /**
  * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
  * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
  */
  updated () {
  },
  /**
  * keep-alive 组件激活时调用。 仅针对keep-alive 组件有效
  */
  activated () {
  },
  /**
  * keep-alive 组件停用时调用。 仅针对keep-alive 组件有效
  */
  deactivated () {
  },
  /**
  * 实例销毁之前调用。在这一步，实例仍然完全可用。
  */
  beforeDestroy () {
  },
  /**
  * Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，
  * 所有的事件监听器会被移除，所有的子实例也会被销毁。
  */
  destroyed () {
  },
  // 组件方法
  methods: {
    logout() {
      logout().then(res => {
        console.log(res)
        if(res.status==0) {
          this.$message.success('退出登录成功')
          this.$router.push('/hh/login')
        }
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
 .el-header{
    background-color: #F8F8F8;
    color: #333;
    line-height: 60px;
    display:flex;
    justify-content: space-between;
    border:1px solid #ccc;
    h3{
      font-size: 20px;
      color: #999999;
      cursor: pointer;
    }
    span{
      font-size: 16px;
    }
    span:nth-of-type(1){
      margin-right: 10px;
    }
      span:nth-of-type(2){
      margin-right: 10px;
      cursor: pointer;
    }
  }

  .el-aside {
    background-color: #F8F8F8;
    color: #333;
    // text-align: center;
    height: 100%;
    border-right:1px solid #ccc;

  }

  .el-main {
    background-color: #fff;
    color: #333;
  }

.el-icon-arrow-down:before{
    display: none!important;
}
.el-menu-item, .el-submenu__title{
  height: 40px;
  line-height: 40px;
}
</style>
