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
    '<% _.each(items, function(item, i){ %>',
      '<li data-index="<%= i%>">',
        '<i class="fa fa-play"></i>',
        '<%= _.unescape(item.title) %>', 
      '</li>',
    '<% }); %>'
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