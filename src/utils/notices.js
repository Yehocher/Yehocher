import Alert from '../Alert.vue';
import Vue from 'vue';
Alert.newInstance  = (val) =>{
    const props = val || {};
    const instance = new Vue({
        data:props,
        render(h){
            return h(Alert,{
                props:props
            })
        }
    })
    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const alert = instance.$children[0];
    return {
        add(val){
            alert.add(val);
        },
        remove(name){
            alert.remove(name);
        }
    }
}
export default Alert;