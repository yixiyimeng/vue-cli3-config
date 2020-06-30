<template>
	<a-modal :visible="visible" title="修改头像" :maskClosable="false" :confirmLoading="confirmLoading" :width="800" @cancel="cancelHandel"
	 :afterClose="afterClose" :destroyOnClose="true" >
		<label class="btn" for="upload2">更换图片</label>
		<input type="file" id="upload2" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg"
		 @change="uploadImg($event, 2)">
		<a-row>
			<a-col :xs="24" :md="12" :style="{height: '350px'}">
				<vue-cropper ref="cropper" :img="options.img" :info="true" :autoCrop="options.autoCrop" :autoCropWidth="options.autoCropWidth"
				 :autoCropHeight="options.autoCropHeight" :fixedBox="options.fixedBox" @realTime="realTime" :outputType="options.outputType">
				</vue-cropper>
			</a-col>
			<a-col :xs="24" :md="12" :style="{height: '350px'}">
				<div class="avatar-upload-preview">
					<img :src="previews.url" :style="previews.img" />
				</div>
			</a-col>
		</a-row>

		<template slot="footer">
			<a-button key="back" @click="cancelHandel">取消</a-button>
			<a-button key="submit" type="primary" :loading="confirmLoading" @click="okHandel">保存</a-button>
		</template>
	</a-modal>
</template>
<script>
	import {
		VueCropper
	} from 'vue-cropper'
	// import {
	// 	api
	// } from '@/api';

	export default {
		components: {
			VueCropper
		},
		data() {
			return {
				visible: false,
				id: null,
				confirmLoading: false,

				options: {
					img: '',
					autoCrop: true,
					autoCropWidth: 200,
					autoCropHeight: 200,
					fixedBox: true,
					outputType:'png'
				},
				previews: {},

			};
		},

		methods: {
			edit(id) {
				this.visible = true;
				this.id = id;
				/* 获取原始头像 */

			},
			close() {
				this.id = null;
				this.visible = false;
			},
			cancelHandel() {
				this.close();
			},
			okHandel() {
				const vm = this;
				if (!vm.options.img) {
					vm.$message.error('请选择一张图片');
					return false;
				}
				vm.confirmLoading = true
				this.$refs.cropper.getCropData(data => {
					this.modelSrc = data;
					/* 获取头像base64 */
					var imgdata = data.split(',')[1];
					var fileType = data.split(';')[0].split('/')[1];
					var param = {
						file: data,
						fileName: new Date().getTime() + 'avatar.png'
					}
					this.$postAction(api.uploadImg, param).then(da => {
						if (da.code == 0) {
							this.$message.success('修改个人头像成功');
							this.visible = false;
							this.$emit('uploadImg',da.picUrl)
						}
					}).finally(() => {
						vm.confirmLoading = false
						vm.close()
					});
					// 					var params = {
					// 						"fileType": fileType,
					// 						"data": imgdata
					// 
					// 					};
					//alert(JSON.stringify(api))
					// 					this.$http.post(api.uploadImage, params).then(da => {
					// 						this.$emit('getimg', da.data)
					// 						vm.confirmLoading = false
					// 						vm.close()
					// 						vm.$message.success('上传头像成功');
					// 					})

				});




			},

			realTime(data) {
				this.previews = data
			},
			uploadImg(e, num) {
				//上传图片
				// this.option.img
				var file = e.target.files[0];
				if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
					alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
					return false;
				}
				var reader = new FileReader();
				reader.onload = e => {
					let data;
					if (typeof e.target.result === "object") {
						// 把Array Buffer转化为blob 如果是base64不需要
						data = window.URL.createObjectURL(new Blob([e.target.result]));
					} else {
						data = e.target.result;
					}
					this.options.img = data;
				};
				// 转化为base64
				// reader.readAsDataURL(file)
				// 转化为blob
				reader.readAsArrayBuffer(file);
			},
			afterClose() {
				this.options.img = '';
				this.previews = '';
				this.confirmLoading=false
			},
		}
	};
</script>

<style lang="less" scoped>
	.avatar-upload-preview {
		position: absolute;
		top: 50%;
		transform: translate(50%, -50%);
		width: 200px;
		height: 200px;
		border-radius: 50%;
		box-shadow: 0 0 4px #ccc;
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.btn {
		display: inline-block;
		line-height: 1;
		white-space: nowrap;
		cursor: pointer;
		background: #fff;
		border: 1px solid #c0ccda;
		color: #1f2d3d;
		text-align: center;
		box-sizing: border-box;
		outline: none;
		margin-bottom: 20px;
		padding: 9px 15px;
		font-size: 14px;
		border-radius: 4px;
		color: #fff;
		background-color: #50bfff;
		border-color: #50bfff;
		transition: all 0.2s ease;
		text-decoration: none;
		user-select: none;
	}
</style>
