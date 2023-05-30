<template>
  <div>
    <a-collapse v-model="activeNames">
      <a-collapse-panel header="字典组件" key="1">
        <a-form ref="form" :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" >
          <a-form-item label="单选框字典">
            <dict-select v-model="form.radioVal" type="radio" dict="gender" :label-value="labelValue" />
            <a-button @click="setRadioValue">修改值</a-button>
            {{ form.radioVal }}
          </a-form-item>
          <a-form-item label="多选框字典">
            <dict-select v-model="form.checkboxVal" type="checkbox" dict="car" :label-value="labelValue" />
            <a-button @click="setCheckboxValue">修改值</a-button>
            {{ form.checkboxVal }}
          </a-form-item>
          <a-form-item label="下拉框字典">
            <dict-select v-model="form.selectVal" type="select" dict="paymentType" :label-value="labelValue" />
            <a-button @click="setSelectValue">修改值</a-button>
            {{ form.selectVal }}
          </a-form-item>
          <a-form-item label="下拉框多选字典">
            <dict-select v-model="form.selectMultiVal" type="select" dict="paymentType" multiple :label-value="labelValue" />
            <a-button @click="setSelectMultiValue">修改值</a-button>
            {{ form.selectMultiVal }}
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="getLabel(true)">取值Label</a-button>
            <a-button type="primary" @click="getLabel(false)">取值Value</a-button>
          </a-form-item>
        </a-form>
      </a-collapse-panel>
      <a-collapse-panel header="页面窗口" key="2">
        <a-button type="primary" @click="openPageView">打开页面窗口</a-button>
        <page-modal :visible="pageViewVisible" @close="onPageViewClose">
          <a-button>dsadsad</a-button>
        </page-modal>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      activeNames: '1',
      labelValue: false,
      form: {
        radioVal: '1',
        selectVal: '1',
        selectMultiVal: ['1'],
        checkboxVal: ['1']
      },
      pageViewVisible: false
    }
  },
  computed: {
    dict() {
      return this.$store.getters.dict
    }
  },
  created() {
    this.$store.dispatch('dict/system', ['gender', 'car', 'paymentType'])
  },
  methods: {
    setRadioValue() {
      this.form.radioVal = '0'
    },
    setCheckboxValue() {
      this.form.checkboxVal = ['2']
    },
    setSelectValue() {
      this.form.selectVal = '2'
    },
    setSelectMultiValue() {
      this.form.selectMultiVal = ['1', '2']
    },
    getLabel(v) {
      this.labelValue = v
    },
    openPageView() {
      this.pageViewVisible = true
    },
    onPageViewClose() {
      this.pageViewVisible = false
    }
  }
}
</script>
