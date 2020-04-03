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
			confirm() {
				let param = this.user;
				if (!param.name) {
					this.$api.msg('请填写用户名');
					return;
				}
				if (!param.password) {
					this.$api.msg('请填写密码');
					return;
				}
				// 请求后台进行登录
				uni.request({
					url: Api.BASEURI + 'user-service/user/login',
					method: 'POST',
					data: param,
					header: {
						'content-type': 'application/json',
					},
					success: res => {
						// 接口调用成功
						if (res.data.message == '请先登录' || res.data.code == 100) {
							uni.showToast({
								title: '请先登录',
								icon: 'none'
							});
						}

						console.log('登录返回数据:' + JSON.stringify(res.data));
						if (res.data.code == 200) {
							try {
								uni.setStorageSync('userId', res.data.data.loginName);
								uni.setStorageSync('token', res.data.data.accessToken);
								uni.setStorageSync('userInfo', res.data.data);
							} catch (e) {
								// handle the exception
							};
							// delta 返回的页面数，如果 delta 大于现有页面数，则返回到首页。
							uni.navigateBack({
								delta: 1
							});
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'none'
							});
						}
					},
					fail: (e) => {
						console.log('接口' + endpoint + '请求失败:' + JSON.stringify(e));
					},
					complete: () => {}
				});
				// uni请求结束
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.icon-shouhuodizhi {
			font-size: 36upx;
			color: $font-color-light;
		}
	}

	.default-row {
		margin-top: 16upx;

		.tit {
			flex: 1;
		}

		switch {
			transform: translateX(16upx) scale(.9);
		}
	}

	.add-btn {
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
