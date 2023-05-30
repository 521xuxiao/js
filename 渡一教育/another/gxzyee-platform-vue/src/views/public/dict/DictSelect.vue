<template>
  <div class="dict-select">
      <a-select v-if="type==='select'"  style="min-width: 200px;" v-model="val" @change="onChange" allow-clear :mode="multiple?'multiple':''">
        <a-select-option
            v-for="item in options"
            :key="item.id"
            :value="labelValue?item.value:item.key">
            {{ item.value }}
        </a-select-option>
      </a-select>

      <a-radio-group  v-if="type==='radio'" v-model="val" @change="onChange">
        <a-radio
            v-for="item in options"
            :key="item.id"
            :value="labelValue?item.value:item.key"
        >
          {{ item.value }}
        </a-radio>
      </a-radio-group>

      <a-checkbox-group  v-if="type==='checkbox'" v-model="val" @change="onChange">
        <a-checkbox
            v-for="item in options"
            :key="item.id"
            :value="labelValue?item.value:item.key"
        >
          {{ item.value }}
        </a-checkbox>
      </a-checkbox-group>
  </div>
</template>

<script>

export default {
  name: 'DictSelect',
  // 双向绑定
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Array,Number]
    },
    // 字典类型
    dict: {
      required: true,
      type: String
    },
    // 组件类型:select,radio,checkbox
    type: {
      required: true,
      type: String,
      default: () => { return 'select' }
    },
    // 支持多选select时生效
    multiple: {
      type: Boolean,
      default: () => { return false }
    },
    // 取值返回label
    labelValue: {
      type: Boolean,
      default: () => { return false }
    },
    // 字典数据源
    dataSource: {
      type: String,
      default: () => { return 'system' }
    }
  },
  data () {
    return {
      val: this.value
    }
  },
  computed:{
    options(){
      return this.$store.getters.dict[this.dataSource][this.dict] || []
    }
  },
  watch: {
    value (nVal) {
      this.val = nVal
    }
  },
  created () {
    this.$store.dispatch(`dict/${this.dataSource}`, [this.dict])
  },
  methods:{
    onChange(data){
        if(this.type==='radio'){
            data = data.target.value
        }
      this.$emit("change",data)
    }
  }
}
</script>
<style type="text/css" scoped>
.dict-select{
  display: inline-block;
}
</style>
