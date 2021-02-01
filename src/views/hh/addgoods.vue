<template>
  <div>
    <div class="top">商品管理 -- 修改商品</div>
    <div class="box">
      <el-form status-icon class="demo-ruleForm" label-width="80px" style="margin-top:20px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name" type="text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="form.subtitle" type="text" autocomplete="off"></el-input>
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
            <template>
              <el-input-number
                v-model="form.price"
                controls-position="right"
                :min="1"
                @change="handleChange"
              ></el-input-number>
              <el-button slot="append" disabled>元</el-button>
            </template>
          </div>
        </el-form-item>
        <el-form-item label="商品库存">
          <div style="margin-top: 15px;">
            <template>
              <el-input-number
                v-model="form.stock"
                controls-position="right"
                :min="1"
                @change="handleChange1"
              ></el-input-number>
              <el-button slot="append" disabled>件</el-button>
            </template>
          </div>
        </el-form-item>
        <el-form-item label="商品照片">
          <br />
          <img
            v-for="(item,index) in form.subImages.split(',') "
            :key="index"
            style="width:60px;height:60px;margin-left:20px"
            :src="form.imageHost+item"
            alt
          />
          <el-upload
            class="upload-demo"
            action="http://admintest.happymmall.com/manage/product/upload.do"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
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
      value: "",
      value1: "",
      options1: [],
      options2: [],
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
    let id = this.$route.query.id;
    console.log(id);
    detail(id).then((res) => {
      console.log(res);
      this.form = res.data;
      // console.log(this.form.categoryId);
      getlist().then((res) => {
        console.log(res);
        this.options1 = res.data;
        this.value = res.data.filter((item) => {
          return item.id == this.form.parentCategoryId;
        })[0].name;
        this.value1 = this.form.parentCategoryId;
        getlist2(this.form.parentCategoryId).then((res) => {
          // console.log(res);
          this.options2 = res.data;
          this.value1 = res.data.filter((item) => {
            return item.id == this.form.categoryId;
          })[0].name;
        });
      });
    });
  },
  // 组件方法
  methods: {
    handleChange(ee) {
      console.log(ee);
    },
    handleChange1(ee) {
      console.log(ee);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style lang="scss"  scoped>
.top {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #999;
  color: #666666;
  font-size: 28px;
  font-weight: 400;
}
</style>
