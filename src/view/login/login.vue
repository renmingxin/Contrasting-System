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
import { mapActions } from "vuex";
import { setToken } from '@/libs/util'
export default {
    components: {
        LoginForm
    },
    methods: {
        ...mapActions(["handleLogin", "getUserInfo"]),
        handleSubmit({ userName, password }) {
			this.$store.commit('setAvatar','https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png');
			this.$store.commit('setToken','super_admin');
			setToken('super_admin');
			this.$router.push({ name: this.$config.homeName });
			// this.handleLogin({ userName, password }).then(res => {
            //     this.getUserInfo().then(res => {
            //         this.$router.push({
            //             name: this.$config.homeName
            //         });
            //     });
            // });
        }
    }
};
</script>

<style>
</style>
