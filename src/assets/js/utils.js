// 判断是否是图片
export function judgeImgUrl(imgUrl){
  let img = document.createElement("img");
  img.src = imgUrl;
  return new Promise(function(resolve) {
    img.onerror = () => {
      resolve(false);
    };
    img.onload = () => {
      resolve(true);
    };
  });
}
