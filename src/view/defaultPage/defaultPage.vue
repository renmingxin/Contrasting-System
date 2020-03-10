<template>
    <div class="pc-container"></div>
</template>

<script>
    import {getMenuList} from '@/api/ready.js'

    export default {
        data(){
            return {}
        },
        mounted(){
            console.log('默认页面')
            this.getMenuList()
        },
        methods: {
            getMenuList(){
                getMenuList({}, data => {
                    console.log(data)
                    let arr = []
                    data.obj.forEach((item, index) => {
                        arr.push(this.formatMenuList(item))
                    })
                    this.$store.commit('setMenuList', arr)
                    sessionStorage.setItem('menuList', JSON.stringify(arr))
                    this.$router.push({name: this.$config.homeName})
                })
            },
            formatMenuList(data){
                let {icon, title} = data
                data.expand = true
                data.children = data.menuItems
                data.meta = {icon, title, showAlways: true}
                if (data.children && Array.isArray(data.children)) {
                    for (let menuItem of data.children) {
                        this.formatMenuList(menuItem)
                    }
                }
                return data
            }
        }
    }
</script>

<style scoped>
    .pc-container {
        width: 100%;
        height: 100%;
        background-image: url("../../assets/images/login-bg.jpg");
    }
</style>
