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

ajaxLoaderPath is the path to your image which will be displayed while the ajax call is being made.
results is the CSS selector that jQuery will use to append the results of the ajax call to.
objName is the name of the object that you would like displayed in the phrase "Show more (objName)..." and "There are no more (objName) to add..."
finally, callback is a function which you can provide to perform extra functions after the objects are appended, such as adding highlight or zebra effects.

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
      format.html
      #ajax response
      format.js { render :template => 'objects/_index_objects.html.haml'}
    end
  end

and the partial:

  - for object in @object
    %li.result_row
      Your stuff here

That's it.  Be sure to check out the plugin in its entirety on Github.  Feedback is always welcome.  Enjoy!
