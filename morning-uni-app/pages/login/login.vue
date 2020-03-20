<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">用户名</text>
			<input class="input" type="text" v-model="user.name" placeholder="用户名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">密码</text>
			<input class="input" type="number" v-model="user.password" placeholder="密码" placeholder-class="placeholder" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
	import Api from '@/common/api';
	export default {
		data() {
			return {
				user: {
					name: 'shutan',
					password: '123456'
				}
			}
		},
		methods: {
			//提交
			confirm(){
				let data = this.user;
				if(!data.name){
					this.$api.msg('请填写用户名');
					return;
				}
				if(!data.password){
					this.$api.msg('请填写密码');
					return;
				}
				let cartData = Api.apiCall('post', 'product-service/comment/queryComment',data);
				
			},
		}
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		
		.tit{
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
