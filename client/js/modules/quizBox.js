export default class QuizBox {

  init() {
    var body = document.body,
        quizWrapper = document.getElementById('quiz');

    if (quizWrapper) {
      var resize = function(){
        var offset = ((window.innerHeight - quizWrapper.offsetHeight) / 2 );
        var MIN_PADDING = 25;

        offset = (offset < MIN_PADDING) ? MIN_PADDING : offset;

        body.style.paddingTop = offset + 'px';
        body.style.paddingBottom = offset + 'px';
      };

      resize();

      window.onload = function() {
        resize();
      };

      window.onresize = function() {
        resize();
      };
    }
  }
}
