{
  const view = {
    'el': '#tabs',
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
      this.bindEvents();
    },
    bindEvents() {
      this.view.$el.on('click', '.tabs-nav > li',(event) => {
        const $li = $(event.currentTarget);
        $li.addClass('active');
        $li.siblings().removeClass('active');
        const tabName = $li.attr('data-tab-name');
        console.log(tabName);
        console.log($li[0]);
        window.eventHub.emit('selectTab', tabName);
      });
    },
  };
  controller.init(view, model);
}
