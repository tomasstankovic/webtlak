import IndexBox from './modules/indexBox';
import QuizBox from './modules/quizBox';
import * as Parallax from './modules/parallax';
import Zapisniky from './modules/zapisniky';

var index = new IndexBox();
var quiz = new QuizBox();
var zapisniky = new Zapisniky();

index.init();
quiz.init();
zapisniky.init();