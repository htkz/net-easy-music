{
  const view = {
    'el': '.page-3',
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
    },
    bindEventHub() {
      window.eventHub.on('selectTab', (tabName) => {
        if(tabName === 'page-3') {
          this.view.$el.show();
        } else {
          this.view.$el.hide();
        };
      });
    },
  };
  controller.init(view, model);
}
