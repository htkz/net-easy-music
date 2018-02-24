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
        (song) => $(`<div class="song"><li data-song-id="${song.objectId}">${song.name}</li></div>`)
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
        const songId = $(event.currentTarget).attr('data-song-id');
        this.model.data.songs.forEach((song) => {
          if(song.objectId === songId) {
            window.eventHub.emit('select', deepCopy(song));
          };
        });
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
      window.eventHub.on('new', () => {
        this.view.clearActive();
      });
      window.eventHub.on('update', (data) => {
        const songs = this.model.data.songs;
        songs.forEach((song) => {
          if(song.objectId === data.objectId) {
            Object.assign(song, data);
            this.view.render(this.model.data);
          };
        });
      });
    },
  };
  controller.init(view, model);
}
