<style lang="less">
@import "./login.less";
</style>

<template>
    <div class="login">
        <div class="login-con">
            <Card icon="log-in" title="欢迎登录" :bordered="false">
                <div class="form-con">
                    <login-form @on-success-valid="handleSubmit"></login-form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import LoginForm from "_c/login-form";
import { getUserInfo } from '@/api/login.js'
import { fomatFormData,fomatFormData2,aaa } from '@/libs/util.js'
export default {
    components: {
        LoginForm
    },
    mounted(){
    
    },
    methods: {
        handleSubmit({ userName, password }) {
            let params = {
                username:userName,
                password:password,
            }
            let callback = {
                onOk:data=>{
                    console.log(data);
                },
                onError:data=>{
                    console.log(data);
                }
                
            }
            getUserInfo(fomatFormData(params),callback)
            // this.$router.push({ name: this.$config.homeName });
			
        },
        // fomatFormData = (msg)=>{
        //     let params = new URLSearchParams();
        //     for (let key in msg) {
        //         params.append(key, msg[key])
        //     }
        //     return params;
        // }
    }
};
</script>

<style>
</style>
