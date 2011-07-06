This fork of jquery-bottomless-pagination makes a number of changes from the original:

1.  ajaxLoaderPath is optional. If not specified, a text 'Loading...' message is shown
2.  The total page count is retrieved from the last numbered pagination link and is used to disable the 'More' link when the end of the set is reached (Previously the link was disabled when the ajax call returned no data, requiring an extra click to confirm the end of the set).
3.  When the end of the set is reached, the 'More' link turns into a 'Back to top' link.
4.  A span is added to the 'More' link with class 'icon'. Can be used to include an image, such as an arrow, in the pagination via CSS.
5.  Updated to work with will_paginate implementation that does not wrap the current page number in a span with class 'current'. Uses the 'next page' node instead.

jquery-bottomless-pagination is a facebook-like jQuery plugin built on top of the Rails will_paginate plugin where results are returned and appended to the end of a list.

Usage:
You should already be using the will_paginate plugin.
Then, be sure to include the plugin (example in haml):

    = javascript_include_tag 'jquery.bottomlesspagination.js'

Here are the optional settings (displayed below are the defaults):

* ajaxLoaderPath:'../images/ajax-loader.gif',
* results:'.results',
* objName:'',
* callback:null

ajaxLoaderPath: the path to your image which will be displayed while the ajax call is being made. If no path is specified ('' or null), 'Loading...' is displayed while the ajax call is being made.

results: the CSS selector that jQuery will use to append the results of the ajax call to.

objName: the name of the object that you would like displayed in the phrase "More [objName]". If not set, the pagination displays "More".

Callback: a function which you can provide to perform extra functions after the objects are appended, such as adding highlight or zebra effects.

All of these settings can be provided similarly to the following:

    $.bottomlessPagination({objName:'rows', callback:function(){
      //highlight current row
      $(".results li").hover(function() {
        $(this).addClass("hover");
      }, function() {
        $(this).removeClass("hover");
      });
    }});

You may need to provide something like the following for Rails.

    $.ajaxSetup({ 
      'beforeSend': function(xhr) {
        xhr.setRequestHeader("Accept","text/javascript")} 
      });

On the rails side of things, in your controller, just return the partial which iterates through your returned objects:

    def index
      @objects = Object.paginate :page => params[:page]
      respond_to do |format|
        format.html #index.html.haml
        format.js { render :template => 'objects/_index_objects.html.haml'} # ajax response
      end
    end

and the partial:

    - for object in @object
      %li.result_row
        Your stuff here

That's it.  Be sure to check out the plugin in its entirety on Github.  Feedback is always welcome.  Enjoy!
