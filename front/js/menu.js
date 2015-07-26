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