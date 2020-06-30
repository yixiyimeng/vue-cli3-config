<template>
	<sub-page-view>
		<div class="home">
			<input type="text">
		</div>
	</sub-page-view>
</template>

<script>
	// @ is an alias to /src

	import axios from 'axios'

	export default {
		name: 'home',
		components: {},
		data() {
			return {
				api: process.env.VUE_APP_API,
				name: ''
			}
		},
		mounted() {
			// js代码中使用环境变量
			console.log("BASE_URL: ", process.env.BASE_URL);
			console.log("VUE_APP_API: ", process.env.VUE_APP_API);

			axios.get('/api/1').then(res => {
				console.log('proxy:', res);
			})

		}
	}
</script>


<style>
	.nihao {
		background: blue;
	}
</style>
