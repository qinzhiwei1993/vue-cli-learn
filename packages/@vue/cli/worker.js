var a = require('debug')('worker:a')
  , b = require('debug')('worker:b');
 
  a.enabled = true;
  b.enabled = true
function work() {
  a('doing lots of uninteresting work');
  setTimeout(work, Math.random() * 1000);
}
 
work();
 
function workb() {
  b('doing some work');
  setTimeout(workb, Math.random() * 2000);
}
 
workb();