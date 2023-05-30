<template>
  <a-popover
    v-model.trim="visible"
    :trigger="trigger"
  >
    <template slot="title">
      <a-input-search
        v-model.trim="searchValue"
        placeholder="输入英文关键词进行搜索"
        @change="filterIcon"
      />
    </template>

    <template slot="content">
      <div class="icon-box">
        <ul
          class="icons-list"
        >
          <li
            v-for="(item,index) in icons"
            :key="index"
            :class="item ===icon?'active':''"
            @click="handleClick(item)"
          >
            <a-icon :type="item" />
            <span class="anticon-class"><span class="ant-badge">
             {{item}}</span></span>
          </li>
        </ul>
      </div>
    </template>
    <a><a-icon  :type="icon">
    </a-icon></a>
  </a-popover>
</template>

<script>
import Icon from '@ant-design/icons-vue'
const definitions = Icon.definitions.collection
const antIcons = []
Object.keys(definitions).forEach(key => {
  // @ts-ignore
  if (definitions[key].theme === 'outline') {
    antIcons.push(definitions[key].name)
  }
})

export default {
  name: 'IconPicker',
  props: {
    icon: {
      type: String,
      required: true
    },
    // 自定义触发方式
    trigger: {
      type: String,
      default: 'click',
      validator: function(value) {
        return ['click', 'hover', 'focus'].indexOf(value) !== -1
      }
    }
  },
  data() {
    return {
      icons: antIcons,
      visible: false,
      searchValue: ''
    }
  },
  watch: {
    visible(val, oldVal) {
      this.searchValue = ''
    }
  },
  created() {

  },
  methods: {
    handleClick(icon) {
      this.$emit('onChange', icon)
      this.visible = false
      this.icons = antIcons
    },
    filterIcon() {
      if (this.searchValue) {
        this.icons = antIcons.filter(item => item.toLowerCase().includes(this.searchValue.toLowerCase()))
      } else {
        this.icons = antIcons
      }
    }
  }
}
</script>

<style scoped>
  .icon-box{
    overflow: auto;
    font-size: 20px;
    padding: 0px;
    width: 300px;
    height: 230px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: flex-start;
    justify-content: center;
  }
  ul.icons-list{
    width: 100%;
    padding: 0px;
  }
  ul.icons-list li {
    position: relative;
    float: left;
    width: 16.6%;
    margin: 3px 0;
    padding: 10px 0 0;
    overflow: hidden;
    color: #555;
    text-align: center;
    list-style: none;
    background-color: inherit;
    border-radius: 4px;
    cursor: pointer;
    transition: color .3s ease-in-out,background-color .3s ease-in-out;
  }

  ul.icons-list li:hover,ul.icons-list li.active {
    background-color: #1890ff;
    color: #fff;
  }

  ul.icons-list li .anticon-class {
    display: block;
    font-family: 'Lucida Console',Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;
    white-space: nowrap;
    text-align: center;
    transform: scale(.83);
  }
</style>
