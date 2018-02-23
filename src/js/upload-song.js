{
  const view = {
    el: '.uploadArea',
    template: `
      <div id="container">
        <div id="pickfiles">
          <span >点击或拖曳文件</span>
          <p>文件大小不能超过40mb</p>
        </div>
      </div>
      <div id="uploadStatus">等待上传</div>
    `,
    find(selector) {
      return $(this.el).find(selector)[0];
    },
    render(data){
      $(this.el).html(this.template);
    },
  };
  const model = {};
  const controller = {
    init(view, model) {
      this.view = view;
      this.model = model;
      this.view.render(this.model);
      this.initQiniu();
    },
    initQiniu() {
      const uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4', // 上传模式，依次退化
        browse_button: this.view.find('#pickfiles'), // 上传选择的点选按钮，必需
        uptoken_url: 'http://localhost:8888/uptoken',         // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
        get_new_uptoken: false, // 设置上传文件的时候是否每次都重新获取新的uptoken
        domain: 'http://p42ttv8on.bkt.clouddn.com', // bucket域名，下载资源时用到，必需
        container: this.view.find('#container'), // 上传区域DOM ID，默认是browser_button的父元素
        max_file_size: '100mb', // 最大文件体积限制
        flash_swf_url: 'path/of/plupload/Moxie.swf', //引入flash，相对路径
        dragdrop: true, // 开启可拖曳上传
        drop_element: this.view.find('#container'), // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb', // 分块上传时，每块的体积
        auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
          'FilesAdded': function(up, files) {
            plupload.each(files, function(file) {
            // 文件添加进队列后，处理相关的事情
            });
          },
          'BeforeUpload': function(up, file) {
            // 每个文件上传前，处理相关的事情
          },
          'UploadProgress': (up, file) => {
            // 每个文件上传时，处理相关的事情
            // document.querySelector('#uploadStatus').textContent = '上传中...'
            this.view.find('#uploadStatus').textContent = '上传中...'
          },
          'FileUploaded': (up, file, info) => {
            const filename = JSON.parse(info.response).key;
            const domain = up.getOption('domain');
            const sourceLink = domain + '/' + encodeURIComponent(filename);
            this.view.find('#uploadStatus').textContent = `${filename} 上传成功！`;

            window.eventHub.emit('upload', {
              url: sourceLink,
              name: filename,
            });

          },
          'Error': function(up, err, errTip) {
            //上传出错时，处理相关的事情
          },
          'UploadComplete': function() {
            //队列文件处理完毕后，处理相关的事情
          }
        }
      });
    }
  };
  controller.init(view, model);
}
