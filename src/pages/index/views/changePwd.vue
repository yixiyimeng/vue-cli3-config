<template>
	<div>
		<a-form :form="form" autocomplete="off">
			<a-form-item label="旧密码" :labelCol="formTailLayout.labelCol" :wrapperCol="formTailLayout.wrapperCol">
				<a-input-password allow-clear placeholder="请输入旧密码" ref="userNameInput" v-decorator="['pwdOld', { rules: [{ required: true, message: '密码必须包含大小写字母和数字，长度不低于8位' }, { validator: checkConfirmold }] }]">
				</a-input-password>
			</a-form-item>
			<a-form-item label="新密码" :labelCol="formTailLayout.labelCol" :wrapperCol="formTailLayout.wrapperCol">
				<a-input-password allow-clear placeholder="请输入新密码" ref="userNameInput"  v-decorator="['pwdNew', { rules: [{ required: true, message: '密码必须包含大小写字母和数字，长度不低于8位' }, { validator: validateToNextPassword }] }]">
				</a-input-password>
			</a-form-item>
			<a-form-item label="确认密码" :labelCol="formTailLayout.labelCol" :wrapperCol="formTailLayout.wrapperCol">
				<a-input-password placeholder="请再次输入新密码" ref="userNameInput"  v-decorator="['confirm_password', { rules: [{ required: true, message: '密码必须包含大小写字母和数字，长度不低于8位' }, { validator: compareToFirstPassword }] }]"
				 @blur="handleConfirmBlur"  allow-clear/></a-form-item>
		</a-form>
	</div>
</template>

<script>
	import {
		isPwd
	} from '@/utils/validate';
	// import {
	// 	api
	// } from '@/api';
	export default {
		data() {
			return {
				formTailLayout: {
					labelCol: {
						span: 4
					},
					wrapperCol: {
						span: 18
					}
				},
				form: this.$form.createForm(this),
				editpwdinfo: {},
				confirmDirty: ''
			};
		},
		methods: {
			
			/*校验旧密码*/
			checkConfirmold(rule, value, callback) {
				if (value) {
					if (!isPwd(value)) {
						// 正则验证
						callback('密码必须包含大小写字母和数字，长度不低于8位'); // 校验未通过
					}
				}
				callback(); // 校验通过
			},
			
			handleConfirmBlur(e) {
				const value = e.target.value;
				this.confirmDirty = this.confirmDirty || !!value;
			},
			compareToFirstPassword(rule, value, callback) {
				const form = this.form;
				if (value) {
					if (!isPwd(value)) {
						// 正则验证
						callback('密码必须包含大小写字母和数字，长度不低于8位'); // 校验未通过
					} else if (value !== form.getFieldValue('pwdNew')) {
						callback('两次输入的密码不匹配');
					} else {
						callback();
					}
				} else {
					callback();
				}
			},
			validateToNextPassword(rule, value, callback) {
				const form = this.form;
				if (value) {
					if (!isPwd(value)) {
						// 正则验证
						callback('密码必须包含大小写字母和数字，长度不低于8位'); // 校验未通过
					} else if (this.confirmDirty) {
						form.validateFields(['confirm_password'], {
							force: true
						});

					}
				}
				callback();
			},

			resetPwd() {
				this.form.validateFields((err, values) => {
					// 验证表单没错误
					if (!err) {
						console.log('form values', values)
						let parameter = Object.assign({}, values);
						this.$postAction(api.resetPwd, parameter).then(da => {
							if (da.code == 0) {
								this.$message.success('修改密码成功');
								this.form.resetFields()
							}
						})

					}
				})

			}
		}
	};
</script>

<style lang="less">
	form .has-feedback .ant-input-affix-wrapper .ant-input-suffix{
		padding-right: 0 !important;
	}
</style>
