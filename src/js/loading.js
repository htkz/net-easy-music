{
  const view = {
    el: '#loading',
  };
  const controller = {
    init(view) {
      this.view = view;
      this.bindEventHub();
    },
    bindEventHub() {
      window.eventHub.on('beforeUpload', () => {
        $(this.view.el).show();
      });
      window.eventHub.on('afterUpload', () => {
        $(this.view.el).hide();
      });
    },
  };
  controller.init(view);
}
