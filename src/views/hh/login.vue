<template>
  <div style="height:100%">
    <div class="box">
      <div class="hz">
        <h3>请登录</h3>
        <div class="form">
          <el-form ref="ruleForm" :model="form" status-icon :rules="rules" class="demo-ruleForm">
            <el-form-item label prop="username">
              <el-input
                v-model="form.username"
                type="text"
                autocomplete="off"
                placeholder="User Name"
              ></el-input>
            </el-form-item>
            <el-form-item label prop="password">
              <el-input
                v-model="form.password"
                type="password"
                autocomplete="off"
                placeholder="Password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:100%" @click="submit('ruleForm')">Login</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/until/api.js";
export default {
  // 组件名称
  name: "Demo",
  // 局部注册的组件
  components: {},
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data() {
    return {
      form: {
        username: "admin",
        password: "admin",
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  /**
   * 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
   * 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
   */
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  mounted() {},
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 在实例初始化之后，组件属性计算之前，如data属性等
   */
  beforeCreate() {},
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  /**
   * 在挂载开始之前被调用：相关的 render 函数首次被调用。
   */
  beforeMount() {},
  /**
   * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
   * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
   */
  beforeUpdate() {},
  /**
   * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
   * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
   */
  updated() {},
  /**
   * keep-alive 组件激活时调用。 仅针对keep-alive 组件有效
   */
  activated() {},
  /**
   * keep-alive 组件停用时调用。 仅针对keep-alive 组件有效
   */
  deactivated() {},
  /**
   * 实例销毁之前调用。在这一步，实例仍然完全可用。
   */
  beforeDestroy() {},
  /**
   * Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，
   * 所有的事件监听器会被移除，所有的子实例也会被销毁。
   */
  destroyed() {},
  // 组件方法
  methods: {
    submit() {
      login(this.form).then((res) => {
        console.log(res);
        if (res.status == 0) {
          this.$message.success(res.msg);
          this.$router.push("/hh/index");
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style lang="scss"  scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .hz {
    border: 1px solid #eee;
    width: 400px;
    height: 240px;
    h3 {
      background: #f5f5f5;
      font-size: 18px;
      border-bottom: 1px solid #999;
      padding: 10px 15px;
      font-weight: 300;
    }
    .form {
      padding: 16px;
      .el-button--primary {
        font-size: 20px;
        font-weight: 600;
        background: #5a98cf;
      }
    }
  }
}
</style>
