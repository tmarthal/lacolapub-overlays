## Amazon to LA County Libary Bookmarklet

A simple bookmarklet that embeds mouseovers to *.amazon.com book links with easy access to reserve the text
at your local LA County library.


Bookmarklet Link

[COLA Public Amazon Highlight](javascript: (function () { var includeScript = function(id, src, callback) { var s = document.getElementById(id); var head = document.getElementsByTagName('head')[0]; if (s) head.removeChild(s); s = document.createElement('script'); s.src = src; s.id = id; s.onload = callback; head.appendChild(s); }; if (typeof jQuery == 'undefined') { includeScript('jquery-script', 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js', console.log('loaded jquery')); includeScript('colapub-highlight', 'https://raw.github.com/tmarthal/lacolapub-overlays/master/colap.bookmarklet.js'); } else { includeScript('colapub-highlight', 'https://raw.github.com/tmarthal/lacolapub-overlays/master/colap.bookmarklet.js'); } }());)
