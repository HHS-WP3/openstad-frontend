$(document).ready(function($) {
    // add function and trigger it here
  var $ideaList = $(".ideas-list");

  /**
   * If default sort is set on the list, sort items
   */
  if ($ideaList.attr('data-default-sort')) {
    var values = $ideaList.attr('data-default-sort').split(',');
    var sortAttr = values[0];
    var descOrAsc = values[1];

    sortElements(sortAttr, descOrAsc, ".ideas-list", ".idea-item");

    //set the select box to the right value to prevent confusion
    $('.ideas-sort-select').val(values);
  }

  // on change of select run the sort function, format is simple value,order.
  // So: likes,asc
  // It will look for the data attribute on the idea list element: data-likes="10"
  $('.ideas-sort-select').on('change', function (ev) {
    ev.preventDefault();
    var values = $(this).val().split(',');
    var sortAttr = values[0];
    var descOrAsc = values[1];
  //  $('.gridder-close').click();
    sortElements(sortAttr, descOrAsc, '.ideas-list', '.idea-item');
  })
});

function sortElements(arg, order, sel, elem) {



        var $selector = $(sel),
        $element = $selector.find(elem);

        if (arg === 'random') {
          $element.shuffle();
        } else {
          $element.sort(function(a, b) {
                  var an = parseInt(a.getAttribute('data-'+ arg)),
                  bn = parseInt(b.getAttribute('data-'+ arg));
                  if (order === "asc") {
                          if (an > bn)
                          return 1;
                          if (an < bn)
                          return -1;
                  } else if (order === "desc") {
                          if (an < bn)
                          return 1;
                          if (an > bn)
                          return -1;
                  }
                  return 0;
          });

          $element.detach().appendTo($selector);
        }
}