window.App = window.App || {};

var inputClearingFunctions = [
  ['input', function(){ $(this).val(''); }],
  ['textarea', function(){ $(this).html(''); }],
  ['select', function(){ $(this).children().each(function(){
    if( $(this).hasClass('default-choice')){ this.selected = true;
    } else { this.selected = false; }
  }); }]
];

var AppController = function ( options ) {
  console.info('APP INITIALIZED :)');
  this.options = options || {};

  addEventListeners();
  function addEventListeners() {
    /*
    **  EXPANDER CLICK
    **  This toggles the expander element and animates.
    **
    */
    $('.expander-title').on('click', function(){
      $(this).parent().toggleClass('open');
      $(this).next('.expander-content').slideToggle(300);
    });

    /*
    **  ADD FORM ITEM CLICK
    **  This adds new empty forms for many-to one items
    **  .form-list contains both .add-form-list-item and .form-list-item
    *   .form-list-item is the div to be added
    */
    $('.add-form-list-item').on('click', function(){
      var formClone = $(
          $(this).siblings('.form-list-item')[0]
        ).clone();
      inputClearingFunctions.forEach(function(selectorFunctionPair){
        console.log("selectorFunctionPair", selectorFunctionPair);
        var selector = selectorFunctionPair[0];
        var fn = selectorFunctionPair[1];
        formClone.find(selector).each(fn);
      });
      formClone.insertBefore(this).removeClass('hidden');
    });
  }

  /*
  **  SEARCH FIELD CHECK
  **  If #patient-search exists, initialize the search
  **
  */
  if ($('#patient-search').length) {
    this.search = {};
    this.initSearch('patient-search', 
        { valueNames: ['patient-name', 'patient-dob'] });
  }


  // If we're on the print page, hide everything that shouldn't print
  if (window.location.pathname.indexOf('/patient_print') > -1) {
    convertForPrint();
  }

  /*
  **  SEARCH FIELD CHECK
  **  If #patient-search exists, initialize the search
  **
  */
  if ($('#service-map').length) {

    // temporary fake locations
    var locations = [];
    $('.location').each(function(){
      var newLocation = {};
      newLocation.coordinates = [parseFloat($(this).attr('data-latitude')), parseFloat($(this).attr('data-longitude'))];
      newLocation.address = $(this).attr('data-address');
      locations.push(newLocation);
    });

    L.mapbox.accessToken = 'pk.eyJ1Ijoic3ZtYXR0aGV3cyIsImEiOiJVMUlUR0xrIn0.NweS_AttjswtN5wRuWCSNA';
    var map = L.mapbox.map('service-map', 'svmatthews.lidab7g5');

    var markers = L.mapbox.featureLayer();
    locations.forEach(addMarker);
    function addMarker(location) {
      var content = location.address;

      var marker = L.marker(location.coordinates, {
        icon: L.mapbox.marker.icon({
          'marker-size': 'large',
          'marker-symbol': 'star',
          'marker-color': '#333'
        })
      }).bindPopup(content).addTo(markers);
    }
    markers.addTo(map);
    map.fitBounds(markers.getBounds());


  }

};


/*
**  SEARCH INITIALIZATION
**  @param(id) - the element ID of the list you're making searchable
**  @param(options) - options you can pass through, currently just an array
**    of valueNames for the classes in your list items you want to make
**    searchable.
**
*/
AppController.prototype.initSearch = function ( id, options ) {
  this.search.id = id;
  this.search.options = options;
  this.search.list = new List(id, options);
};


function addNewInputRow($table, $input_row) {
  $new_row = $input_row.clone();
  $new_row.each(function() {
    $(this).attr('id', '');
    var input = $(this).find(':input');
    input.val('');
  });
  $table.append($new_row);
  return;
}

function hideRow() {
  $(event.target).parent().siblings().each(
    function() {
      $(this).find(".hidden-input").attr('value', '');
      $(this).find("input[type='date'].hidden-input").attr('value', 'mm/dd/yyyy');
    }
  );
  $(event.target).parent().parent().hide();
}

function showHiddenFields() {
  $(event.target).parent().siblings().each(
    function() {
      $(this).find(".hidden-input").show();
      $(this).find(".read-only").hide();
    }
  );
}

function convertForPrint() {
  $('#patient_details_form').find(':input').not('.hidden-input').not('.hidden').replaceWith(function(){
    return '<span>'+this.value+'</span>'
  });
  $('.expander').replaceWith(function(){
    return $(this).children()
  });
  $('.expander-title').hide();
  $('table').not('#phone_number_table').find('th:last-child, td:last-child').hide();
}


/*
**  REQUEST BUTTON CLICK / UPDATE
**  Updates the className of the patient-list-item and changes
**  the text within the button.
**
*/
function sharePatientInfo( btn ) {
  $(btn).addClass('shared');
  $(btn).text('information sent');
}

/*
**  FILTERS
**  
**
*/

// var Filter = function(options) {
//   this.options = options || {};
//   this.filter_element = document.getElementById(options.id);
//   this.filters = options.filters;
//   this.buttons = [];
//   this.filterClass = '.' + options.filterClass;

//   this._build(this.filters);
// }

// Filter.prototype._build = function(filters) {
//   // build the 'all' filter first
//   this.filter_element.innerHTML = '<span class="sidebar_title"><i class="fa fa-sliders"></i> Filter Patients</span>';
//   this.filter_element.appendChild(this._createFilter('All', 'all', true));
//   var _this = this;
//   for (var i = 0; i < filters.length; ++i) {
//     var filter = _this._createFilter(filters[i].name, filters[i].id);
//     _this.buttons.push(filter);
//     _this.filter_element.appendChild(filter);
//   }
// }

// Filter.prototype._createFilter = function(name, id, activeState) {
//   var _this = this;
//   var btn = document.createElement('button');
//   btn.className = 'button filter_button';
//   if (activeState) btn.className += ' filter_button_active';
//   btn.setAttribute('data-filter', id);
//   btn.innerHTML = name;
//   btn.onclick = function() {
//     $('.filter_button').removeClass('filter_button_active');
//     $(this).addClass('filter_button_active');
//     _this.filterElements(id);
//   }
//   return btn;
// }

// Filter.prototype.filterElements = function(id) {
//   console.log(id);
//   if (id != 'all') {
//     $(this.filterClass).addClass('filter_hide');
//     $('.'+id).removeClass('filter_hide');
//   } else {
//     $(this.filterClass).removeClass('filter_hide');
//   }
// }

window.menu = {
  yDown: null,
  xDown: null,
  swipeMenuState: false,
  elem: document.getElementById('nav'),
  button: document.getElementById('nav_button'),
  open: function() {
    menu.elem.className += ' open';
    document.body.className = 'menu_open';
    menu.button.className += ' open';
    menu.swipeMenuState = !menu.swipeMenuState;
  },
  close: function() {
    menu.elem.className = 'nav';
    document.body.className = '';
    menu.button.className = 'button button_nav';
    menu.swipeMenuState = !menu.swipeMenuState;
  },
  toggle: function() {
    if (menu.swipeMenuState) {
      menu.close();
    } else {
      menu.open();
    }
  },
  handleTouchStart: function(event) {
    menu.xDown = event.touches[0].clientX;                                      
    menu.yDown = event.touches[0].clientY;
  },
  handleTouchMove: function(event) {
    if ( ! menu.xDown || ! menu.yDown ) {
      return;
    }
    var xUp = event.touches[0].clientX,                                    
        yUp = event.touches[0].clientY,
        xDiff = menu.xDown - xUp,
        yDiff = menu.yDown - yUp;
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
      document.body.className = 'menu_open'; // prevent vertical scroll during open
      if ( xDiff > 0 ) {
        if (menu.swipeMenuState) menu.close(); 
      } else {
        if (!menu.swipeMenuState) menu.open();
      }                       
    } else {
      if ( yDiff > 0 ) {
        /* up swipe, do nothing */ 
      } else { 
        /* down swipe, do nothing */
      }                                                                 
    }
    /* reset values */
    menu.xDown = null;
    menu.yDown = null; 
  }
}

// screen swiping
document.addEventListener('touchstart', menu.handleTouchStart, false);
menu.button.addEventListener('click', menu.toggle, false);        
document.addEventListener('touchmove', menu.handleTouchMove, false);

/*
**  PATIENT DATA USED FOR SEARCH
**
*/
window.patients = {
  total: 10,
  list: [
    {
      name: 'Sam Matthews',
      dob: '02/09/1989',
      ssn: '469-23-9973'
    },
    {
      name: 'Sarah Johnson',
      dob: '02/09/1989',
      ssn: '469-23-9973'
    },
    {
      name: 'Cotton Awesome',
      dob: '02/09/1989',
      ssn: '469-23-9973'
    },
    {
      name: 'Super Duper',
      dob: '02/09/1989',
      ssn: '222-33-4444'
    },
    {
      name: 'John Matthews',
      dob: '02/09/1989',
      ssn: '469-23-9973'
    },
    {
      name: 'Sam Johnson',
      dob: '02/09/1989',
      ssn: '469-23-9973'
    }
  ]
};


