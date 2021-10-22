import request from './request';
import qs from 'qs'

// 音频文件上传接口
export function uploadVoiceFile(params) {
  return request.post('/UploadVoiceFile', qs.stringify(params));
}

// 图片上传接口
export function uploadImage(params) {
  return request.post('/UploadImg', params);
}