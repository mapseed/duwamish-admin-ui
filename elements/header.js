var emitter = require('component-emitter')

module.exports = function (h) {
  var header = {}
  emitter(header)

  header.render = function header_render (state) {
    var title = h('h1.site-title', state.title)

    var logo = h('img.site-logo-image', {
      src: ''
    })

    return h('header.site-header', [
      h('a.site-logo', { href: '/' }, [
        logo,
        title
      ]),
      h('ul.site-header-nav', [
        h('li.site-header-nav-item', h('a', { href: '/map' }, 'map')),
        h('li.site-header-nav-item', h('a', { href: '/list' }, 'list')),
        h('li.site-header-nav-item', h('a', { href: '/grid' }, 'grid'))
      ])
    ])
  }

  return header
}
