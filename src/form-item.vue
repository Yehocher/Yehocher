<template>
    <div>
        <label v-if="label" :class="{ 'i-form-item-label-required': isRequired }">{{label}}</label>
         <div>
            <slot></slot>
            <div v-if="validateState === 'error'" class="i-form-item-message">{{ validateMessage }}</div>
        </div>
    </div>
</template>

<script>
import Emitter from './mixins/emitter.js';
import AsyncValidator from 'async-validator';
export default {
    data() {
        return {
            validateState: '',  // 校验状态
            validateMessage: '',  // 校验不通过时的提示信息
            isRequired: false,  // 是否为必填
        }
    },
    inject: ['form'],
    mixins:[Emitter],
    name:'dpFormItem',
    componentName:'dpFormItem',
    computed:{
        // 从 Form 的 model 中动态得到当前表单组件的数据
        fieldValue(){
            return this.form.mode[this.prop];
        }
    },
    props:{
        label:{
            type:String,
            default:''
        },
        prop:{
            type:String
        }
    },
    methods: {
        getRules(){
            // 从 Form 的 rules 属性中，获取当前 FormItem 的校验规则
            let formRules = this.form.rules;
            formRules = formRules ? formRules[this.prop] : [];
            return [].concat(formRules || []);
        },
        // 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
        getFilteredRule (trigger) {
            const rules = this.getRules();
            return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
        },
        /**
         * @description: 校验数据
         * @param trigger 校验类型
         * @param callback 回调函数
         */
        validate(trigger, callback = function () {}){
            let rules = this.getFilteredRule(trigger);
            if(!rules || rules.length === 0){
                return;
            }
            //设置状态为校验中
            this.validateState = 'validating';
            // 以下为 async-validator 库的调用方法
            let descriptor = {};
            let model = {};
            model[this.prop] = this.fieldValue;
            descriptor[this.prop] = rules;
            const validator = new AsyncValidator(descriptor);//作用？
             validator.validate(model,{ firstFields: true },error=>{
                this.validateState = !errors ? 'success' : 'error';
                this.validateMessage = errors ? errors[0].message : '';
                callback(this.validateMessage);
            })
        },
        onFieldBlur() {
            //鼠标移开校验
            this.validate('blur');
        },
        onFieldChange() {
            //值改变的时候校验
            this.validate('change');
        },
        setRules () {
            let rules = this.getRules();
            if (rules.length) {
                rules.every((rule) => {
                    // 如果当前校验规则中有必填项，则标记出来
                    this.isRequired = rule.required;
                });
            }

            this.$on('on-form-blur', this.onFieldBlur);
            this.$on('on-form-change', this.onFieldChange);
        },
        /// 从 Form 的 rules 属性中，获取当前 FormItem 的校验规则
        getRules () {
            let formRules = this.form.rules;

            formRules = formRules ? formRules[this.prop] : [];

            return [].concat(formRules || []);
        },
        resetField(){
            this.validateState = '';
            this.validateMessage = '';
            this.form.model[this.prop] = this.initialValue //表单值 重置
        }
    },
    // 组件渲染时，将实例缓存在 Form 中
    mounted() {
        // 如果没有传入 prop，则无需校验，也就无需缓存
        if(this.prop){
            // 设置初始值，以便在重置时恢复默认值
            this.initialValue = this.fieldValue;
            this.dispatch('dpForm', 'on-form-item-add', this);
            this.setRules();
        }
    },
    // 组件销毁前，将实例从 Form 的缓存中移除
    beforeDestroy () {
        this.dispatch('dpForm', 'on-form-item-remove', this);
    }
}
</script>
<style lang="less">

 .i-form-item-label-required:before {
    content: '*';
    color: red;
  }
  .i-form-item-message {
    color: red;
  }
  
</style>
