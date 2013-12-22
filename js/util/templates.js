var JST = {

  streamlist: _.template([
    '<ul class="streamlist">',
      '<% _.each(items, function(item){ %>',
        '<% if(item.active) %>',
          '<li class="active"><%= item.id %></li>',
        '<% else %>',
          '<li><%= item.id %></li>',
      '<% }); %>',
    '</ul>'
    ].join('')),

  playlist: _.template([
    '<% if(items) { %>',
      '<% _.each(items, function(item, i){ %>',
        '<% if (i === active){ %>',
          '<li data-index="<%= i%>" class="active">',
            '<% if (status === 1){ %>',
              '<i class="fa fa-volume-up"></i>',
            '<% }else{ %>',
              '<i class="fa fa-volume-off"></i>',
            '<% } %>',
            '<%= _.unescape(item.title) %>',
          '</li>',
        '<% }else{ %>',
          '<li data-index="<%= i%>">',
            '<i class="fa fa-play"></i>',
            '<%= _.unescape(item.title) %>',
          '</li>',
        '<% } %>',
      '<% }); %>',
    '<% } else { %>',
      '<center> Start listening to your favorite subreddits. </center>',
    '<% } %>'
    ].join(' ')),

  player: _.template([
    '<div class="controls">',
      '<i class="back fa fa-fast-backward" ></i>',
      '<i class="play fa fa-play" ></i>',
      '<i class="forward fa fa-fast-forward" ></i>',
    '</div>',
    '<div class="progress">',
      '<div class="track-progress">',
        '<div class="slider"></div>',
      '</div>',
    '</div>'
  ].join(' '))
};

module.exports = JST;
