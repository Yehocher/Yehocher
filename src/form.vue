<template>
    <form>
        test111112221111
        <slot></slot>
    </form>
</template>

<script>
import DpFormItem from './form-item.vue'
export default {
    name: 'dpForm',
    data() {
        return {
        }
    },
    provide() {
        return {
        form : this
        };
    },
    created(){
        //因为vue组件是从内到外渲染的所以formItem优先于form组件渲染，在子组件mounted渲染时，派发给form事件，但是在此时form的mounted尚未触发，
        //因为form在最外层，如果在form里边侦听事件是不可以的
         this.$on('on-form-item-add', (field) => {
            if (field) this.fields.push(field);
        });
        this.$on('on-form-item-remove', (field) => {
            if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
        });
    },
    components:{
        DpFormItem
    },
    props:{
        model:{
            type:Object
        },
        rules:{
            type:Object
        }
    },
    methods:{
        // 公开方法：全部重置数据
        resetFields() {
            this.fields.forEach(field => {
                field.resetField();
            });
        },
        // 公开方法：全部校验数据，支持 Promise
        validate(callback) {
            return new Promise(resolve => {
                let valid = true;
                let count = 0;
                this.fields.forEach(field => {
                field.validate('', errors => {
                    if (errors) {
                    valid = false;
                    }
                    if (++count === this.fields.length) {
                    // 全部完成
                    resolve(valid);
                    if (typeof callback === 'function') {
                        callback(valid);
                    }
                    }
                });
                });
            });
        }
    }
}
</script>
<style scoped>
  
</style>
