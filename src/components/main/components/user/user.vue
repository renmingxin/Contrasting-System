<template>
    <div class="user-avatar-dropdown">
        <Dropdown @on-click="handleClick">
            <Badge :dot="!!messageUnreadCount">
                <Avatar style="background-color: #87d068" icon="ios-person" />
            </Badge>
            <Icon :size="18" type="md-arrow-dropdown"></Icon>
            <DropdownMenu slot="list">
                <!-- <DropdownItem name="message">
          消息中心<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
                </DropdownItem>-->
                <DropdownItem name="logout">退出登录</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
import "./user.less";
export default {
    name: "User",
    props: {
        userAvatar: {
            type: String,
            default: ""
        },
        messageUnreadCount: {
            type: Number,
            default: 0
        }
    },
    methods: {
        logout() {
			this.$router.push({
				name: "login"
			});
        },
        message() {
            this.$router.push({
                name: "message_page"
            });
        },
        handleClick(name) {
            switch (name) {
                case "logout":
                    this.logout();
                    break;
                case "message":
                    this.message();
                    break;
            }
        }
    }
};
</script>
