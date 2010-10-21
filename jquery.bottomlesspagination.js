(function($){
  var settings;
  
  $.bottomlessPagination = function(callerSettings) {
    settings = $.extend({
      ajaxLoaderPath:'../images/ajax-loader.gif',
      results:'.results',
      objName:'',
      callback:null
    },callerSettings||{});
    settings.imgLoader = new Image();
    settings.imgLoader.src = settings.ajaxLoaderPath;
    settings.href = $(".current").next().attr("href");
  	
    if ($('div.pagination').size() > 0){
      $('div.pagination').wrap("<div class='pagination_links'></div>").hide();
      $('.pagination_links').append(
        "<div class='live_pagination'>" +
          "<a class='more_links' style='cursor:pointer;'>Show more " + settings.objName + "...</a>" + 
        "</div>"
      );
    }
    $(".more_links").click(function(){
      $(".more_links").hide();
      if ($(".now_loading").size() == 0)
        $(".more_links").after("<img class='now_loading' src='"+settings.imgLoader.src+"' />");
      else
        $(".now_loading").show();
      $.get(
        settings.href,'',function(data){
          $(settings.results).addrows(data);
        }
      );
      $(".now_loading").hide();
      $(".more_links").show();
      return false;
    });
    
    $.fn.addrows = function(data) {
      //remove live pagination if there are no more jobs
      if (data.length === 0 ){
        $('.live_pagination').remove();
        $('.pagination_links').append(
          "<div class='no_pagination'>" +
            "There are no more " + settings.objName + " to add..." + 
          "</div>"
        );
        return false;
      }

      var pageRE     = /page=(\d+)/,
          pageMatch  = settings.href.match(pageRE);

      if (pageMatch) {
        var pageNumber  = parseInt(pageMatch[1]) + 1;
        settings.href = settings.href.replace(pageRE, 'page=' + pageNumber);
      }

      //add results to the page
      $(settings.results).append(data);
      if (settings.callback) settings.callback();
    };
  };
})(jQuery);
