var m = require('mithril');
var partial = require('chessground').util.partial;

module.exports = {
  controller: function(onUpdate) {
    var data = {
      open: m.prop(true),
      db: {
        available: ['lichess', 'masters'], //, 'me'],
        selected: m.prop('lichess')
      },
      rating: {
        available: [1600, 1800, 2000, 2200, 2500],
        selected: m.prop([2000, 2200, 2500])
      },
      speed: {
        available: ['bullet', 'blitz', 'classical'],
        selected: m.prop(['blitz', 'classical'])
      }
    };

    var toggleMany = function(c, value) {
      if (c().indexOf(value) === -1) c(c().concat([value]));
      else if (c().length > 1) c(c().filter(function(v) {
        return v !== value;
      }));
      onUpdate();
    };

    return {
      data: data,
      toggleOpen: function() {
        data.open(!data.open());
        onUpdate();
      },
      toggleDb: function(db) {
        data.db.selected(db);
        onUpdate();
      },
      toggleRating: partial(toggleMany, data.rating.selected),
      toggleSpeed: partial(toggleMany, data.speed.selected)
    };
  },
  view: function(ctrl) {
    var d = ctrl.data;
    return m('div.config', [
      m('div.title', 'Opening explorer configuration'),
      m('section.db', [
        m('label', 'Database'),
        m('div.choices',
          d.db.available.map(function(s) {
            return m('span', {
              class: d.db.selected() === s ? 'selected' : '',
              onclick: partial(ctrl.toggleDb, s)
            }, s);
          })
        )
      ]),
      m('div', {
        class: 'adv' + (d.db.selected() === 'masters' ? ' hidden' : '')
      }, [
        m('section.rating', [
          m('label', 'Players Average rating'),
          m('div.choices',
            d.rating.available.map(function(r) {
              return m('span', {
                class: d.rating.selected().indexOf(r) > -1 ? 'selected' : '',
                onclick: partial(ctrl.toggleRating, r)
              }, r);
            })
          )
        ]),
        m('section.speed', [
          m('label', 'Game speed'),
          m('div.choices',
            d.speed.available.map(function(s) {
              return m('span', {
                class: d.speed.selected().indexOf(s) > -1 ? 'selected' : '',
                onclick: partial(ctrl.toggleSpeed, s)
              }, s);
            })
          )
        ])
      ])
    ]);
  }
};
