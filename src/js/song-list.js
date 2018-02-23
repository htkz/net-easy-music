{
  const view = {
    el: '#songList-container',
    template: `
      <ul class="songList">
      </ul>
    `,
    render(data) {
      const $el = $(this.el);
      $el.html(this.template);
      const {songs} = data;
      const divList = songs.map(
        (song) => $(`<div class="song"><li>${song.name}</li></div>`)
      );
      $el.find('ul').empty();
      divList.map((div) => {
        $el.find('ul').append(div);
      });
    },
    activeItem(li) {
      $li = $(li);
      $li.addClass('active');
      $li.parent().siblings().find('li.active').removeClass('active');
    },
    clearActive() {
      $(this.el).find('.active').removeClass('active');
    },
  };
  const model = {
    data: {
      songs: [],
    },
    find() {
      const query = new AV.Query('Song');
      return query.find().then((songs) => {
        this.data.songs = deepCopy(songs);
        return songs;
      });
    },
  };
  const controller = {
    init(view, model) {
      this.view = view;
      this.model = model;
      this.view.render(this.model.data);
      this.bindEvents();
      this.bindEventHub();
      this.getAllSongs();
    },
    getAllSongs() {
      this.model.find().then(() => {
        this.view.render(this.model.data);
      });
    },
    bindEvents() {
      $(this.view.el).on('click', 'li', (event) => {
        event.preventDefault();
        this.view.activeItem(event.currentTarget);
      });
    },
    bindEventHub() {
      window.eventHub.on('upload', () => {
        this.view.clearActive();
      });
      window.eventHub.on('create', (song) => {
        this.model.data.songs.push(song);
        this.view.render(this.model.data);
      });
    },
  };
  controller.init(view, model);
}
