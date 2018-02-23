{
  const view = {
    el: '.page > main',
    init() {
      this.$el = $(this.el);
    },
    template: `
      <h1>新建歌曲</h1>
      <form class="form">
        <div class="row">
          <label for="name">歌名</label>
          <input type="text" id="name" value="__name__">
        </div>
        <div class="row">
          <label for="singer">歌手</label>
          <input type="text" id="singer" value="__singer__">
        </div>
        <div class="row">
          <label for="url">外链</label>
          <input type="text" id="url" value="__url__">
        </div>
        <div class="row actions">
          <button type="submit">保存</button>
        </div>
      </form>
    `,
    render(data = {}) {
      const placeholders = ['name', 'singer', 'url'];
      let html = this.template;
      placeholders.forEach((p) => {
        html = html.replace(`__${p}__`, data[p] || '');
      });
      $(this.el).html(html);
    },
    reset() {
      this.render();
    },
  };
  const model = {
    data: {
      name: '',
      singer: '',
      url: '',
      id: '',
    },
    create(data) {
      const Song = AV.Object.extend('Song');
      const song = new Song();
      song.set('name', data.name);
      song.set('singer', data.singer);
      song.set('url', data.url);
      return song.save().then((song) => {
        const {id, attributes} = song;
        Object.assign(this.data, {
          id,
          ...attributes,
        });
      }, (error) => {
        console.error(error);
      });
    },
  };
  const controller = {
    init(view, model) {
      this.view = view;
      this.model = model;
      this.view.init();
      this.view.render(this.model);
      this.bindEvents();
      this.bindEventHub();
    },
    reset(data) {
      this.view.render(data);
    },
    bindEvents() {
      this.view.$el.on('submit', 'form', (e) => {
        e.preventDefault();
        const needs = ['name', 'singer', 'url'];
        const data = {};
        needs.forEach((need) => {
          data[need] = this.view.$el.find(`#${need}`).val();
        });
        this.model.create(data)
          .then(() => {
            this.view.reset();
            window.eventHub.emit('create', deepCopy(this.model.data));
          });
      });
    },
    bindEventHub() {
      window.eventHub.on('upload', (data) => {
        this.reset(data);
      });
      window.eventHub.on('select', (data) => {
        this.model.data = data;
        this.view.render(this.model.data);
      })
    }
  };
  controller.init(view, model);
}
