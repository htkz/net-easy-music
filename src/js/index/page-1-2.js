{
  const view = {
    'el': 'section.songs',
    init() {
      this.$el = $(this.el);
    },
    render(songs) {
      songs.forEach((song) => {
        const $li = $(`
          <li>
            <h3>${song.name}</h3>
            <p>
            <svg class="icon icon-sq">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-sq"></use>
            </svg>
            ${song.singer}
            </p>
            <a class="playButton" href="#">
              <svg class="icon icon-play">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play"></use>
              </svg>
            </a>
          </li>
        `);
        this.$el.find('ol.list').prepend($li);
      });
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
      this.view.init();
      this.model.find().then((song) => {
        console.log(this.model.data);
        this.view.render(this.model.data.songs);
      });
    },
  };
  controller.init(view, model);
}
