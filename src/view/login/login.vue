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
    import LoginForm from '_c/login-form'
    import {getUserInfo} from '@/api/ready.js'
    import {fomatFormData} from '@/libs/util.js'

    export default {
        components: {
            LoginForm
        },
        mounted(){

        },
        methods: {
            handleSubmit({userName, password}){
                let params = {
                    username: userName,
                    password: password
                }
                getUserInfo(fomatFormData(params), data => {
                    this.$Notice.success({
                        title: data.msg
                    })
                    this.$router.push({name: 'defaultPage'})
                })
            }
        }
    }
</script>

<style>
</style>
