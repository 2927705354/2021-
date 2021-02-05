<template>
  <div>
    <h3>商品详情</h3>
    <div class="box">
      <el-form status-icon class="demo-ruleForm">
        <el-form-item label="商品名称">
          <br />
          <p>{{ form.name }}</p>
        </el-form-item>
        <el-form-item label="商品描述">
          <br />
          <p>{{ form.subtitle }}</p>
        </el-form-item>
        <el-form-item label="当前状态">
          <br />
          {{ form.status=='1'?'在售':'已下架' }}
        </el-form-item>
        <el-form-item label="所属分类">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options1" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-select v-model="value1" placeholder="请选择">
            <el-option v-for="item in options2" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格">
          <div style="margin-top: 15px;">
            <el-input v-model="form.price" readonly placeholder="请输入内容" class="input-with-select">
              <el-button slot="append" disabled>元</el-button>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="商品库存">
           <div style="margin-top: 15px;">
            <el-input v-model="form.stock" readonly placeholder="请输入内容" class="input-with-select">
              <el-button slot="append" disabled>件</el-button>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="商品照片"><br>
          <img v-for="(item,index) in form.subImages.split(',') " v-show="form.subImages.split(',').length>1" :key="index" style="width:60px;height:60px;margin-left:20px" :src="form.imageHost+item" alt="" />
          <img v-show="form.subImages.split(',').length<=1" style="width:60px;height:60px;margin-left:20px" :src="form.imageHost+form.subImages" alt="" />
        </el-form-item>
        <el-form-item label="商品详情">
          <p v-html="form.detail"></p>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { detail, getlist, getlist2 } from "@/until/api";
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
      form: {},
      options1: [],
      options2: [],
      value: "",
      value1: "",
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
  mounted() {
    let id = this.$route.params.id;
    // console.log(id);
    detail(id).then((res) => {
      console.log(res);
      this.form = res.data;
      // console.log(this.form.categoryId);
      getlist().then((res) => {
        // console.log(res);
        this.options1 = res.data;
        this.value = res.data.filter((item) => {
          return item.id == this.form.parentCategoryId;
        })[0].name;
        // this.value1 = this.form.parentCategoryId;
        getlist2(this.form.parentCategoryId).then((res) => {
          // console.log(res);
          this.options2=res.data
          this.value1 = res.data.filter((item) => {
            return item.id == this.form.categoryId;
          })[0].name;
        });
      });
    });
  },
  // 组件方法
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style lang="scss"  scoped>
h3 {
  font-size: 28px;
  color: #666666;
  font-weight: 400;
  border-bottom: 1px solid #999;
  height: 60px;
  line-height: 60px;
}
.el-input__inner {
  border: none !important;
}
</style>
