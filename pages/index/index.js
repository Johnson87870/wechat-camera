// // index.js
// // 获取应用实例
// const app = getApp()
// let ctxWidth = '';
// let ctxHeight = '';
// let ctx = null; //Camera
// let canvaCtx = null; //canvas
// Page({
//   data: {
//     baseImg: '',
//     isBaseImg: '',
//     isCanvas: false,
//     openCamera: true,
//   },
//   onLoad() {
//     this.getSystemInfo();
//     this.changeText();
//     this.getImageInfo();
//     this.getContentInfo();
//     this.getIdenHeight();

//   },
//   getImageInfo() {
//     wx.createSelectorQuery().select('.camera-photo').fields({
//       size: true
//     }).exec((result) => {
//       console.log('getImageInfo', result);
//     })
//   },
//   changeText() {
//     wx.getSystemInfo({
//       success: res => {
//         console.log('res', res);
//         this.setData({
//           info: res,
//         })
//       }
//     })
//   },
//   getIdenHeight() {
//     wx.createSelectorQuery().select('.identification').fields({
//       size: true
//     }).exec((res) => {
//       this.setData({
//         identWidth: res[0].width,
//         identHeight: res[0].height - 100,
//         maskWidth: (this.data.info.windowWidth - res[0].width) / 2,
//         maskHeight: (this.data.info.windowHeight - 100 - res[0].height) / 2
//       });
//       this.initCanvas();
//     })
//   },
//   getContentInfo() {
//     wx.createSelectorQuery().select('.content').fields({
//       size: true
//     }).exec((result) => {
//       console.log('content result', result)
//       this.setData({
//         contentWidth: result[0].width,
//         contentHeight: result[0].height
//       })
//     })
//   },
//   initCanvas() {
//     let convasX = this.data.maskWidth; //遮罩层上下的高度(生成canvas的起始横坐标)
//     let convasY = this.data.maskHeight; //遮罩层左右的宽度(生成canvas的起始纵坐标)
//     let canvasWidth = this.data.contentWidth; //中间裁剪部位的宽度
//     let canvasHeight = this.data.contentHeight; //中间裁剪部位的高度
//     let convasXL = convasX / 2;
//     ctxWidth = canvasWidth; //canvas的宽度
//     ctxHeight = canvasHeight; //canvas的高度
//     this.setData({
//       canvasWidth,
//       canvasHeight,
//       convasX,
//       convasXL,
//       convasY
//     })
//   },
//   getSystemInfo() {
//     wx.getSystemInfo({
//       success: (result) => {
//         console.log('result', result.statusBarHeight);
//         this.setData({
//           statusBarHeight: result.statusBarHeight
//         })
//       },
//     })
//   },
//   takePhoto() {
//     ctx = wx.createCameraContext();
//     ctx.takePhoto({
//       quality: 'high',
//       success: (res) => { //得到图片
//         this.takeCanvas(res.tempImagePath)
//         this.setData({
//           baseImg: res.tempImagePath,
//           isBaseImg: true,
//           isCanvas: true,
//           openCamera: false
//         })
//       }
//     })
//   },

//   takeCanvas(path) {
//     wx.getImageInfo({
//       src: path,
//       success: imgInfo => {
//         console.log('imgInfo', imgInfo);
//         let {
//           info
//         } = this.data;
//         // let convasX = this.data.maskWidth;
//         // let convasY = this.data.maskHeight;
//         // console.log('maskWidth', this.data.maskWidth);
//         // console.log('maskHeight',this.data.maskHeight);
//         // if (imgInfo.width - this.data.info.windowWidth > 1) {
//         //   // this.data.maskWidth; //遮罩层上下的高度(生成canvas的起始横坐标)
//         //   // const s = imgInfo.width - this.data.info.windowWidth;
//         //   // const b = imgInfo.width - s;
//         //   // console.log('s', s);
//         //   const u = imgInfo.width - this.data.identWidth;
//         //   convasX = (u /2) - this.data.maskWidth;
//         // }
//         // if (imgInfo.height - this.data.info.windowHeight > 1) {
//         //   // const s = imgInfo.height - this.data.info.windowHeight;       console.log('s', s);
//         //   const u = imgInfo.height - this.data.identHeight;
//         //   convasY = (u / 2) - this.data.maskHeight ; //遮罩层左右的宽度(生成canvas的起始纵坐标)
//         // }
//         // let canvasWidth = this.data.identWidth; //中间裁剪部位的宽度
//         // let canvasHeight = this.data.identHeight + 100; //中间裁剪部位的高度
//         // // 我这里宽度和高度都计算了设备比，其实两个值是一样的 ，计算一个就够了
//         // let prxHeight = info.windowHeight / imgInfo.height; //计算设备比
//         // let prxWidth = info.windowWidth / imgInfo.width; //计算设备比


//         let convasX = imgInfo.width / 4;
//         let convasY = imgInfo.height / 5;
//         let canvasWidth = this.data.identWidth;
//         let canvasHeight = this.data.identHeight + 100; ;
//         let convasXL = convasX / 2;
//         canvaCtx = wx.createCanvasContext("myCanvas"); //自定义组件，需要加this
//         console.log('convasX', convasX);
//         console.log('convasY', convasY);
//         console.log('convasXL', convasXL);
//         console.log('canvasWidth', canvasWidth);
//         console.log('canvasHeight',canvasHeight);
//         console.log('canvaCtx', canvaCtx);
//         canvaCtx.drawImage(path, convasXL, convasY, canvasWidth, canvasHeight, 0, 0, (parseInt(canvasWidth)), (parseInt(canvasHeight))); //绘制到canvas上的位置，canvas的宽高等
//         canvaCtx.draw(true, () => {
//           wx.canvasToTempFilePath({
//             fileType: "png",
//             quality: 1,
//             canvasId: "myCanvas",
//             success: canvasToPath => {
//               console.log('canvasToPath', canvasToPath, canvasToPath.tempFilePath);
//               this.setData({
//                 isSuccess: true,
//                 isBaseImg: false,
//                 isCanvas: false,
//                 openCamera: false,
//                 baseImg: canvasToPath.tempFilePath,
//                 srcCanvasPath: canvasToPath.tempFilePath
//               })
//             }
//           })
//         })
//       }
//     })
//   },

//   clearPhoto() {
//     canvaCtx.clearRect(0,0,ctxWidth, ctxHeight)
//     canvaCtx.draw()
//     this.setData({
//         srcCanvasPath:"",
//         isCanvas:false,
//         isSuccess:false,
//         isBaseImg:false,
//         openCamera: true
//     })
//   },

//   retry() {
//     this.clearPhoto()
//   }
// })



const app = getApp()
let ctxWidth = '';
let ctxHeight = '';
let ctx = null; //Camera
let canvaCtx=null;//canvas
Page({
  data: {
    openCamera: true,
  },
  changeText() {
    wx.getSystemInfo({
      success: res => {
        let convasX = res.screenWidth / 4; //遮罩层上下的高度(生成canvas的起始横坐标)
        let convasY = res.screenHeight / 5; //遮罩层左右的宽度(生成canvas的起始纵坐标)
        let canvasWidth = convasX * 3; //中间裁剪部位的宽度
        let canvasHeight = convasY * 3; //中间裁剪部位的高度
        let convasXL = convasX / 2;
        ctxWidth = canvasWidth; //canvas的宽度
        ctxHeight = canvasHeight; //canvas的高度
        this.setData({
          info: res,
          canvasWidth,
          canvasHeight,
          convasX,
          convasXL,
          convasY
        })
      }
    })
  },
  onLoad: function () {},
  onShow() {
    this.changeText()
  },
  takePhoto() {
    ctx = wx.createCameraContext(); //初始化camera
    ctx.takePhoto({ //生成图片
      quality: 'high',
      success: (res) => { //得到图片
        this.takeCanvas(res.tempImagePath)
        this.setData({
          baseImg: res.tempImagePath,
          isBaseImg: true,
          isCanvas:true,
          isSuccess: false
        })
      }
    })
  },
  takeCanvas(path) { //将拍摄的照片绘制到canvas上
    wx.getImageInfo({
      src: path,
      success: imgInfo => {
        console.log('imgInfo', imgInfo);
        let {info} = this.data;
        let convasX = imgInfo.width / 4;
        let convasY = imgInfo.height / 5;
        let canvasWidth = convasX * 3;
        let canvasHeight = convasY * 5;
        let convasXL = convasX / 2;
        // 我这里宽度和高度都计算了设备比，其实两个值是一样的 ，计算一个就够了
        let prxHeight = info.windowHeight / imgInfo.height;//计算设备比
        let prxWidth = info.windowWidth / imgInfo.width;//计算设备比
        // ctx = wx.createCanvasContext("myCanvas", this);//自定义组件，需要加this
        canvaCtx = wx.createCanvasContext("myCanvas");//自定义组件，需要加this
        console.log('canvaCtx', canvaCtx);
        console.log('convasX', convasX);
        console.log('convasY', convasY);
        console.log('canvasWidth', canvasWidth);
        console.log('canvasHeight',canvasHeight);
        console.log('canvaCtx', canvaCtx);
        console.log('prxHeight',prxHeight);
        console.log('prxWidth', prxWidth);
        canvaCtx.drawImage(path,convasXL,(convasY-20),canvasWidth,canvasHeight,0,0,(parseInt(canvasWidth) * prxWidth),(parseInt(canvasHeight) * prxHeight) );//绘制到canvas上的位置，canvas的宽高等
        canvaCtx.draw(true, () => {
          wx.canvasToTempFilePath({
            fileType: "png",
            quality: 1,
            canvasId: "myCanvas",
            success: canvasToPath => {
              console.log('canvasToPath', canvasToPath.tempFilePath);
              this.setData({
                openCamera: false,
                isSuccess:true,
                isBaseImg: false,
                isCanvas:false,
                baseImg: canvasToPath.tempFilePath,
                srcCanvasPath: canvasToPath.tempFilePath
              })
            }
          })
        })
      }
    })
  },
  clearPhoto(){
    canvaCtx.clearRect(0,0,ctxWidth, ctxHeight)
    canvaCtx.draw()
    this.setData({
        srcCanvasPath:"",
        isCanvas:false,
        isSuccess:false,
        isBaseImg:false,
        openCamera: true
    })
  },
  confirmBack(){//确定绘制成功后的操作，根据自己的需求写即可
 
  }
})