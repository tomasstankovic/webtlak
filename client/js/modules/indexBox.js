export default class IndexBox {

  init() {
    var intro = document.getElementById('intro'),
        introBox = document.getElementById('intro__box');

    var resize = function(){
      intro.style.height = window.innerHeight + 'px';

      introBox.style.marginTop = -(introBox.offsetHeight / 2 ) + 'px';
      introBox.style.marginLeft = -(introBox.offsetWidth / 2 ) + 'px';
    };

    resize();
    window.onresize = function() {
      resize();

    };
  }
}
