<template>
  <div>
    <div id="main" style="width: 600px;height:400px;"></div>

    <!-- <van-button type="primary" @click="login">主要按钮</van-button> -->
    <!-- <input id="" v-model="text" type="text" name="" @input="chan(text)"> -->
    <div v-drag class="hz"></div>
  </div>
</template>

<script>
// let qs=require('qs')
import { _debounce, _throttle } from "@/until/fetch";
import { login } from "@/until/api";
export default {
  // 组件名称
  name: "Demo",
  // 局部注册的组件
  components: {},
  directives: {
    drag: {
      bind() {},
      inserted(el, binding) {
        el.onmousedown = function (e) {
          console.log(e.clientX, e.clientY);
          console.log(el.offsetWidth, el.offsetHeight, el.offsetLeft, el.offsetTop)
          let x=e.clientX-el.offsetLeft
          let y=e.clientY-el.offsetTop
          console.log(x, y)
          document.onmousemove=_throttle(function(e) {
            console.log(e.clientY)
            el.style.top=e.clientY-y+'px'
            el.style.left=e.clientX-x+'px'

            if (e.clientY-y + el.offsetHeight>=document.body.clientHeight) {
              el.style.top = document.body.clientHeight-el.offsetHeight+'px'
            }
            if (e.clientX - x + el.offsetWidth >= document.body.clientWidth) {
              console.log(document.body.clientWidth - el.offsetWidth);
              el.style.left = document.body.clientWidth - el.offsetWidth + "px";
            }
            if (e.clientX - x <= 0) {
              el.style.left = 0;
            }
            if (e.clientY - y <= 0) {
              el.style.top = 0;
            }
          }, 100)
          el.onmouseup=(e) => {
            document.onmousemove=null
          }

        };
      },
    },
  },

  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data() {
    return {
      text: "",
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
    let myChart = this.$echarts.init(document.getElementById("main"));

    // 指定图表的配置项和数据
    let option = {
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
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
    login() {
      login(`username=admin&password=123456`).then((res) => {
        console.log(res);
      });
    },
    chan: _debounce(function () {
      console.log(this.text);
    }, 1000),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style lang="scss"  scoped>
.hz {
  width: 100px;
  height: 100px;
  background: red;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
