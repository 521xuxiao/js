<template>
  <div>
    <a-select
        :mode="mode"
        v-model.trim="selectedItems"
        show-search
        allow-clear
        label-in-value
        :placeholder="$t('user.selectUsers')"
        style="width: 100%"
        :filter-option="false"
        :not-found-content="fetching ? undefined : null"
        @search="fetchUser"
        @change="handleChange"
    >
      <a-spin v-if="fetching" slot="notFoundContent" size="small" />
      <a-select-option v-for="d in data" :key="d.value" :disabled="d.disabled">
        {{ d.title }}
      </a-select-option>
    </a-select>

  </div>
</template>
<script>
import debounce from 'lodash/debounce';
import  {page} from '@/api/user'
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    // 设置 Select 的模式为多选或标签 'default' | 'multiple' | 'tags' | 'combobox'
    mode: {
      type: String,
      default: 'default'
    },
    value:{
      type: [String,Object,Array]
    },
    // 禁止选择列表
    disabledValue:{
      type: [String,Object,Array]
    }
  },
  data() {
    this.lastFetchId = 0;
    // 防抖
    this.fetchUser = debounce(this.fetchUser, 800);
    return {
      data: [],
      selectedItems: this.value,
      disabledItems: this.disabledValue,
      fetching: false,
    };
  },
  watch:{
    value(val,oldValue) {
      if(val){
        this.selectedItems = val
      }
    }
  },
  created() {
    this.fetchUser()
  },
  methods: {
    fetchUser(value) {
      this.lastFetchId += 1;
      const fetchId = this.lastFetchId;
      this.data = [];
      this.fetching = true;
      page({userNo:value})
          .then(res => {
            if (fetchId !== this.lastFetchId) {
              // for fetch callback order
              return;
            }
            const data = res.data.records.map(user => {
              let disabled = false
              if(this.disabledItems instanceof Array){
                 disabled = this.disabledItems.some(t=>{
                   if(t instanceof String){
                    return  t === user.userId
                   }else {
                     return t.userId === user.userId
                   }
                 })
              }
              else if(this.disabledItems instanceof  String){
                disabled = this.disabledItems === user.userId
              }
              else if(this.disabledItems instanceof  Object){
                disabled = this.disabledItems.userId === user.userId
              }
            return {
              title: `${user.fullName} - ${user.userNo}`,
              value: user.userId,
              disabled: disabled
            } });
            this.data = data;
            this.fetching = false;
          });
    },
    handleChange(value) {
      this.selectedItems = value
      this.fetching = false
      this.$emit("change",value)
    },
  },
};
</script>