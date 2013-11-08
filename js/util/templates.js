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
    ].join(' '))
};

module.exports = JST;