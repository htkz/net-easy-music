{
  const view = {
    'el': 'section.playlists',
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
    },
  };
  controller.init(view, model);
}
