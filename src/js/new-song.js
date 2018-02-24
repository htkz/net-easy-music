{
  const view = {
    el: '.newSong',
    template: `新建歌曲`,
    render(data){
      $(this.el).html(this.template);
    }
  };
  const model = {};
  const controller = {
    init(view, model) {
      this.view = view;
      this.model = model;
      this.view.render(this.model);
      this.active();
      this.bindEventHub();
      this.bindEvents();
    },
    active() {
      $(this.view.el).addClass('active');
    },
    deactive() {
      $(this.view.el).removeClass('active');
    },
    bindEvents() {
      $(this.view.el).on('click', (event) => {
        event.preventDefault();
        this.active();
        window.eventHub.emit('new');
      });
    },
    bindEventHub() {
      window.eventHub.on('upload', (data) => {
        this.active();
      });
      window.eventHub.on('select', (data) => {
        const songId = data.id;
        this.deactive();
      });
    },
  };
  controller.init(view, model);
}
