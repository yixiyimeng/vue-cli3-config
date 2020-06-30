<template>
	<div id="app">
		<div class="flex">
			<div class="leftpart flex-1">
				<div class="copyright">
					<p class="name">{{webInfo.name}}</p>
					<p class="englishName">{{webInfo.engname}}</p>
					<div class="bd"></div>
				</div>
			</div>
			<div class="loginbox flex flex-align-center">
				<div>
					<!-- <img src="../../assets/cslogo5.png" alt="" class="logo"> -->
					<div class="title">用户登录</div>
					<div class="subtitle">欢迎登陆{{webInfo.name}}</div>
					<a-form :form="form" @submit="handleSubmit" autocomplete="off">
						<a-form-item :validate-status="userNameError() ? 'error' : ''" :help="userNameError() || ''">
							<a-input allow-clear v-decorator="['username', { rules: [{ required: true, message: '请输入用户名!' }] }]" placeholder="请输入账号">
								<i class="material-icons icon iconfont" slot="prefix">person_outline</i>
							</a-input>
						</a-form-item>
						<a-form-item :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
							<a-input v-decorator="['password', { rules: [{ required: true, message: '请输入密码!' }] }]" type="password"
							 placeholder="请输入密码" allow-clear>
								<i class="material-icons icon iconfont" slot="prefix">lock_outline</i>
							</a-input>
						</a-form-item>
						<a-form-item class="checked-form-item">
							<a-checkbox class="remember" v-decorator="[
									'remember',
									{
										valuePropName: 'checked',
										initialValue: true
									}
								]">
								记住密码
							</a-checkbox>
						</a-form-item>
						<a-form-item>
							<a-button type="primary" html-type="submit" :disabled="hasErrors(form.getFieldsError())" class="loginBtn">立即登录</a-button>
						</a-form-item>
					</a-form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		webInfo
	} from '@/utils/base.js'

	function hasErrors(fieldsError) {
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	}
	export default {
		name: 'app',
		data() {
			return {
				hasErrors,
				form: this.$form.createForm(this),
				webInfo: {}
			};
		},
		created() {
			this.webInfo = webInfo;
		},
		mounted() {
			this.$nextTick(() => {
				// To disabled submit button at the beginning.
				try {
					let loginInfo = this.$ls.get('loginInfo', {});
					this.form.setFieldsValue(this.$pick(loginInfo, 'username', 'password'))
				} catch (e) {
					//TODO handle the exception
				}
				this.form.validateFields();

			});
		},
		methods: {
			userNameError() {
				const {
					getFieldError,
					isFieldTouched
				} = this.form;
				return isFieldTouched('username') && getFieldError('username');
			},
			// Only show error after a field is touched.
			passwordError() {
				const {
					getFieldError,
					isFieldTouched
				} = this.form;
				return isFieldTouched('password') && getFieldError('password');
			},
			handleSubmit(e) {
				e.preventDefault();
				this.form.validateFields((err, values) => {
					if (!err) {
						let loginParams = {
							username: values.username.trim(),
							password: values.password.trim()
						}
						this.$postAction('/auth/login', loginParams).then(da => {
							if (da.code == 200) {
								this.$ls.set('userInfo', da.data);
								if (values.remember) {
									this.$ls.set('loginInfo', loginParams);
								}
								location.href = "index.html";
							}

						})
					}
				});
			}
		}
	};
</script>
<style lang="scss">
	@import '../../assets/base.scss';
	@import '../../assets/font.css';
</style>
<style scoped="scoped" lang="scss">
	

	#app {

		height: 100%;

		&>div {
			height: 100%;
		}

		.leftpart {
			background: url(assets/bg.jpg) no-repeat center center;
			background-size: cover;
			position: relative;

			.copyright {
				position: absolute;
				bottom: 50px;
				left: 55px;
				color: #fff;

				.name {
					font-size: 30px;
					font-weight: bold;
					margin-bottom: 0;
					line-height: 45px;
				}

				.englishName {
					font-size: 14px;
					margin-bottom: 20px;
				}

				.bd {
					height: 1px;
					background: #fff;
					position: relative;

					&:after {
						position: absolute;
						content: '';
						display: block;
						height: 5px;
						width: 37px;
						left: 0;
						top: -3px;
						background: #fff;
					}
				}
			}
		}

		.loginbox {
			width: 750px;
			background: #fff;
			color: #125fc9;

			&>div {
				margin: 0 auto;

				.title {
					font-size: 40px;
					font-weight: bold;
					text-align: center;
				}

				.subtitle {
					font-weight: bold;
					text-align: center;
					font-size: 30px;
					margin-bottom: 100px;
				}

				.ant-form {
					width: 385px;
					margin: 0 auto;
				}
			}

			/deep/ .ant-form-item {
				// margin-bottom: 10px;
			}

			/deep/ .ant-input-affix-wrapper {
				height: 44px;
			}

			/deep/ .ant-input {
				border-width: 0 !important;
				border-bottom-width: 1px !important;
				border-radius: 0;
				box-shadow: none !important;
				font-size: 16px;
				padding-left: 68px;
			}

			/deep/ .ant-input-affix-wrapper .ant-input-prefix {
				left: 0;
			}

			.checked-form-item /deep/ .ant-form-item-control {
				line-height: 30px;
			}

			.remember {
				font-size: 12px;
				color: #383838;
				line-height: 1;
			}

			.material-icons {
				font-size: 30px;
				line-height: 1;
				color: #808080;
			}

			.loginBtn {
				width: 272px;
				margin: 0 auto;
				height: 48px;
				display: block;
				font-size: 16px;
			}

			.logo {
				display: block;
				margin: 0 auto 20px;
				width: 200px;
			}
		}
	}
</style>
