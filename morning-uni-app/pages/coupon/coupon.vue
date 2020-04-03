<template>
	<view class="coupon-item">
		<view class="coupon-money">
			<view class="nick" v-if="!types">{{item.shopName}}使用</view>
			<view class="layof" :style="{color:theme}">￥{{item.discountQuota}}</view>
			<view class="end_time">{{item.validDeadline}}前使用</view>
			<view v-if="!types">
				<view class="tit">券号：{{item.templateKey}}</view>
				<view class="demand">{{item.name}}</view>
			</view>
		</view>
		<view class="get-btn" v-if="!types" :style="{color:color, borderColor:color, background:solid}" @click="acquireCoupon(item.id,item.status)">{{item.showMsg}}</view>
		<view class="get-btn" v-if="types" :style="{color:color, borderColor:color, background:solid}" @click="settleCoupon(item.id)">{{item.showMsg}}</view>
		<!-- <navigator class="get-btn" v-if="!types" :style="{color:color, borderColor:color, background:solid}" :url='item.url'>立即领取</navigator> -->
	</view>
</template>

<script>
	import Api from '@/common/api';
	export default {
		components: {

		},
		data() {
			return {
				// 优惠券的状态，1:可用的,2:已使用的
				status: '1',
				showMsg: '立即领取'
			}
		},
		props: {
			item: {
				type: Object
			},
			types: {
				type: String,
				default: ''
			},
			theme: {
				type: String,
				default: '#ff9000'
			},
			solid: {
				type: String,
				default: '#ffffff'
			},
			color: {
				type: String,
				default: '#ff9000'
			}
		},
		methods: {
			// 领取购物券
			acquireCoupon(id,status){
				if(status == 1){
					return;
				}
				let param ={
					'userId':uni.getStorageSync('userId'),
					'templateId':id
				};
				console.log('领取购物券请求信息:'+JSON.stringify(param));
				// 请求后台进行登录
				uni.request({
					url: Api.BASEURI + 'coupon-service/coupon/acquireTemplate',
					method: 'POST',
					data: param,
					header: {
						'content-type': 'application/json',
					},
					success: res => {
						// 接口调用成功
						console.log('领取购物券返回数据:' + JSON.stringify(res.data));
						if (res.data.code == 200) {
							this.showMsg='领取成功';
						} else {
							console.log('领取购物券失败'+JSON.stringify(res.data.message));
							this.showMsg=res.data.message;
						}
					},
					fail: (e) => {
						console.log('接口' + endpoint + '请求失败:' + JSON.stringify(e));
					},
					complete: () => {}
				});
				// uni请求结束
			},
			// 使用购物券
			settleCoupon(id){
				console.log('使用购物券'+id);
				// 优惠券的状态，1:可用的,2:已使用的
				if(this.item.status == 1){
					// 如果是可用的
					this.item.status=2;
					this.item.showMsg='已使用';
				}else if(this.item.status == 2){
					// 如果是已使用的
					this.item.status=1;
					this.item.showMsg='立即使用';
				}else{
					console.log('状态非法'+this.item.status);
				}
				this.$emit('transferCoupon',id+','+this.item.status);
			}
		}
	}
</script>

<style lang='scss'>
	.coupon-item {
		width: 100%;
		height: auto;
		display: table;
		border-radius: 10upx;
		padding: 0 20upx;
		margin-top: 22upx;
		border: 1px solid #eeeeee;
		position: relative;

		.coupon-money {
			width: 465upx;
			height: auto;
			display: table;
			float: left;
			padding: 26upx 0;
			border-style: none dotted none none;
			border-color: #eeeeee;

			.nick {
				width: 100%;
				height: 50upx;
				line-height: 30upx;
				font-size: $font-sm;
				color: #999999;
			}

			.tit {
				width: 100%;
				height: 50upx;
				line-height: 50upx;
				font-size: 24upx;
				color: #999999;
			}

			.demand {
				width: 100%;
				height: 30upx;
				line-height: 30upx;
				font-size: 24upx;
				color: #999999;
			}

			.layof {
				width: 100%;
				height: 48upx;
				line-height: 30upx;
				font-size: 44upx;
				color: #ff9000;
				font-weight: bold;
			}

			.end_time {
				width: 100%;
				height: 30upx;
				line-height: 30upx;
				font-size: 24upx;
				color: #999999;
			}
		}

		.get-btn {
			width: 146upx;
			height: 52upx;
			line-height: 50upx;
			position: absolute;
			top: 50%;
			right: 26upx;
			margin-top: -26upx;
			text-align: center;
			border-radius: 60upx;
			color: #ff9000;
			border: 1px solid #ff9000;
			font-size: $font-sm;
			float: right;
		}
	}

	.coupon-item:after {
		width: 40upx;
		height: 20upx;
		position: absolute;
		left: 460upx;
		top: -1px;
		border-radius: 0 0 40upx 40upx;
		content: "";
		display: block;
		background: #ffffff;
		border: 1px solid #eeeeee;
		border-top: 0px;
	}

	.coupon-item:before {
		width: 40upx;
		height: 20upx;
		position: absolute;
		left: 460upx;
		bottom: -1px;
		border-radius: 40upx 40upx 0 0;
		content: "";
		display: block;
		background: #ffffff;
		border: 1px solid #eeeeee;
		border-bottom: 0px;
	}
</style>
