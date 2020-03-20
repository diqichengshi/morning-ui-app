import store from '../store/index';
export default {

	BASEURI: 'http://localhost:8081/api/trans-gateway/',
	// BASEURI:'http://localhost:8081/api/',
	ESURI: 'http://localhost:8081/api/api/trans-gateway/',

	/**
	 * 封装请求（async await 封装uni.request）
	 * method	   post/get
	 * endpoint    接口方法名
	 * data		   所需传递参数
	 * load		   是否需要loading
	 */
	async apiCall(method, endpoint, data, load) {
		if (!load) {
			uni.showLoading({
				title: '请稍候',
				mask: true
			});
		}
		let fullurl = this.BASEURI + endpoint;
		let Authorization;
		const userToken = uni.getStorageSync('userToken');
		const userInfo = uni.getStorageSync('userInfo');
		if (userInfo) {
			// data.memberId = userInfo.id;
			Authorization = userToken;
		}

		let [error, res] = await uni.request({
			url: fullurl,
			data: data,
			method: method,
			header: {
				'storeid': 3,
				'Content-Type': 'application/x-www-form-urlencoded',
				// 'content-type': 'application/json',
				'authorization3': Authorization || ''
			},
		});
		if (!load) {
			uni.hideLoading();
		}

		// console.log(res.data);
		
		if (res.data.message == '请先登录' || res.data.code == 100) {
			uni.showToast({
				title: '请先登录',
				icon: 'none'
			});
			uni.navigateTo({
				url: `/pages/login/login`
			})
		}

		if (res.data.code == 200) {
			console.log('接口'+endpoint+'请求成功');
			return res.data.result;
		} else {
			console.log('接口'+endpoint+'请求失败:'+res.data.message);
			uni.showToast({
				title: res.data.message,
				icon: 'none'
			});
		}
	},
	/**
	 * 封装请求（async await 封装uni.request）
	 * method	   post/get
	 * endpoint    接口方法名
	 * data		   所需传递参数
	 * load		   是否需要loading
	 */
	async apiEsCall(method, endpoint, data, load) {
		if (!load) {
			uni.showLoading({
				title: '请稍候',
				mask: true
			});
		}

		let fullurl = this.BASEURI + endpoint;
		let Authorization;
		const userToken = uni.getStorageSync('userToken');
		const userInfo = uni.getStorageSync('userInfo');
		if (userInfo) {
			data.memberId = userInfo.id;
			Authorization = userToken;

		}
		let [error, res] = await uni.request({
			url: fullurl,
			data: data,
			method: method,
			header: {
				'storeId': 1,
				'Content-Type': 'application/x-www-form-urlencoded',
				// 'content-type': 'application/json',
				'Authorization': Authorization || ''
			},
		});
		console.log(error);
		if (!load) {
			uni.hideLoading();
		}
		return res;

	},
}
