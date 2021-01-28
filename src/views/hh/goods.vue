<template>
  <div>
    <div class="top">
      <h3>商品管理</h3>
      <el-button type="primary" icon="el-icon-plus" @click="$router.push('/hh/addgoods')">添加商品</el-button>
    </div>
    <div class="body">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input v-model="input" style="width:260px;margin-left:20px" placeholder="关键词"></el-input>
      <el-button style="margin-left:20px" @click="search">查询</el-button>
      <el-table :data="tableData" border style="width: 100%;margin-top:20px">
        <el-table-column prop="id" label="id" width="180"></el-table-column>
        <el-table-column prop="name" label="信息" width="180"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <div>
              <span>{{ scope.row.status==1?'在售':'已下架' }}</span>
              <el-button
                type="warning"
                style="margin-left:20px"
                size="mini"
                @click="setsale(scope.row.id,scope.row.status)"
              >{{ scope.row.status==1?'下架':'上架' }}</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" size="mini" @click="detail(scope.row.id)">查看</el-button>
              <el-button type="primary" size="mini" @click="upda(scope.row.id)">编辑</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { list, search, setsale } from "@/until/api";
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
      options: [
        {
          value: "a",
          label: "按商品id查询",
        },
        {
          value: "b",
          label: "按商品名称查询",
        },
      ],
      value: "a",
      input: "",
      tableData: [],
      total: 0,
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
    this.get();
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
   * 在实例初始化之后，组件属性计算之前，如data属性等
   */
  beforeCreate() {},
  /**
   * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
   */
  created() {},
  // 组件方法
  methods: {
    // 页面初始化渲染
    get() {
      list(1).then((res) => {
        console.log(res);
        this.tableData = res.data.list;
        this.total = res.data.total;
      });
    },
    // 改变页码数
    handleCurrentChange(e) {
      console.log(e);
      list(e).then((res) => {
        console.log(res);
        this.tableData = res.data.list;
        this.total = res.data.total;
      });
    },
    // 搜索
    search() {
      console.log(this.value);
      let name;
      if (this.value == "a") {
        name = "productId";
      } else {
        name = "productName";
      }
      console.log(name);
      search(name, this.input)
        .then((res) => {
          console.log(res);
          this.tableData = res.data.list;
          this.total = res.data.total;
        })
        .catch((err) => {
          alert("哪里不对了呢");
          prompt("qued");
          let aa = confirm("hhh");
          if (aa == true) {
            console.log("tyui");
          } else {
            console.log("123");
          }
        });
    },
    // 设置商品状态
    setsale(id, ee) {
      let status, name;
      if (ee == 1) {
        status = 2;
        name = "确定要下架该商品？";
      } else {
        status = 1;
        name = "确定要上架该商品？";
      }
      let sett = confirm(name);
      if (sett == true) {
        setsale(id, status).then((res) => {
          console.log(res);
          if (res.status == 0) {
            alert("修改产品销售状态成功");
            this.get();
          }
        });
      }
    },
    // 查看
    detail(ee) {
      console.log(ee)
      this.$router.push(`/hh/detail/${ee}`)
    },
    upda(ee) {
      console.log(ee)
      this.$router.push(`/hh/addgoods?id=${ee}`)
    }
  },
};
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
.body {
  margin-top: 20px;
}
</style>
