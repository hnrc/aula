$(document).ready(function() {
  FastClick.attach(document.body);

  $(document).on("click",".navbar-collapse.in",function(e) {
    if( $(e.target).is("a") ) {
        $(this).collapse("hide");
    }
  });

  routie("new", function() {
    makeFancy("new", "Recently added");
    load("talks", populateVideos);
  });

  routie("locations", function() {
    makeFancy("locations", "Locations");
    load("locations", populateList);
  });

  routie("locations/:location", function(location) {
    makeFancy("locations", "Location: " + location);
    load("locations/" + location, populateVideos);
  });

  routie("speakers", function() {
    makeFancy("speakers", "Speakers");
    load("speakers", populateList);
  });

  routie("speakers/:speaker", function(speaker) {
    makeFancy("speakers", "Speaker: " + speaker);
    load("speakers/" + speaker, populateVideos);
  });

  routie("tags", function() {
    makeFancy("tags", "Tags");
    load("tags", populateList);
  });

  routie("tags/:tag", function(tag) {
    makeFancy("tags", "Tag: " + tag);
    load("tags/" + tag, populateVideos);
  });

  routie("search/:query", function(query) {
    makeFancy("", "Search: " + query);
    load("search?query=" + query, populateVideos);
  });

  routie("about", function() {
    makeFancy("about", "About");
    $(".item").remove();
    $.tmpl($("#about-template"), {"title": "Worldoooo"}).appendTo("#content");
  });

  routie("*", function(name) {
    routie("new");
  });
});

$("#search").submit(function(e) {
  routie("search/" + $("#input-search").val());
});

var makeFancy = function(section, header) {
  $(".active").removeClass("active");
  $(".menu-" + section).addClass("active");
  $(".section-header").text(header);
}

var load = function(path, populate) {
  $(".item").remove();
  $(".spinner").remove(); 
  $.tmpl($("#spinner-template")).appendTo("#content");
  $.ajax({
    url: "/api/" + path,
    dataType: "json",
    success: function(items) {
      $(".item").remove();
      $(".spinner").remove();
      populate(items, path);
    }
  });
};

var populateVideos = function(items) {
  $.each(items, function(i, item) {
    $.tmpl($("#talk-template"), item).appendTo("#content");
  });
};

var populateList = function(items, path) {
  var wrapper = $.tmpl($("#list-wrapper-template"));
  $.each(items, function(i, item) {
    $.tmpl($("#list-template"), item, {"basePath": path}).appendTo($(wrapper).find(".list-group"));
  });
  wrapper.appendTo("#content");
  new List("list", { valueNames: [ "list-title", "badge" ]}).sort("list-title", { order: "asc" });
};