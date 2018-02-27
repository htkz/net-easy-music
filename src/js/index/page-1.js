{
  const view = {
    'el': '.page-1',
    init() {
      this.$el = $(this.el);
    },
  };
  const model = {};
  const controller = {
    init(view, model) {
      this.view = view;
      this.model = model;
      this.view.init();
      this.bindEventHub();
      this.loadModule('./js/index/page-1-1.js');
      this.loadModule('./js/index/page-1-2.js');
    },
    bindEventHub() {
      window.eventHub.on('selectTab', (tabName) => {
        if(tabName === 'page-1') {
          this.view.$el.show();
        } else {
          this.view.$el.hide();
        };
      });
    },
    loadModule(src) {
      const script = document.createElement('script');
      script.src = src;
      document.body.appendChild(script);
    },
  };
  controller.init(view, model);
}
