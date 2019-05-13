<template>
    <input 
     
     type="text"
     :value="currentValue"
     @input="handleInput" 
     @blur="handleBlur"
    >
    <!-- 
        input  
     -->
</template>

<script>
import Emitter from './mixins/emitter.js';
export default {
    name:'dpInput',
    mixins: [ Emitter ],
    props:{
        value:{
            type:String,
            default:''
        }
    },
    data() {
        return {
            currentValue: this.value
        }
    },
    watch: {
    //侦听value值改变
      value (val) {
        this.currentValue = val;
      }
    },
    methods: {
        handleInput(event){
            const value = event.target.value;   
            this.currentValue = value;
            this.$emit('input', value);
            this.dispatch('dpFormItem', 'on-form-change', value);
        },
        handleBlur(){
            this.dispatch('dpFormItem', 'on-form-blur', this.currentValue);
        }
    },
}
</script>
<style lang="">
    
</style>