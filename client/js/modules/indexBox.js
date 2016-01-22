export default class IndexBox {

  init() {
    var intro = document.getElementById('intro'),
        introBox = document.getElementById('intro__box');

    var resize = function(){
      var offset = ((window.innerHeight - introBox.offsetHeight) / 2 );

      intro.style.paddingTop = offset + 'px';
      introBox.style.marginBottom = (offset + 150) + 'px';
    };

    resize();

    window.onresize = function() {
      resize();
    };
  }
}
