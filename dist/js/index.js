'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function fadeIn() {
    var body = document.querySelector('body');
    var html = [].concat(_toConsumableArray(document.querySelectorAll('section, object, ul, li, h1, h2, h3, p, header, footer')));

    Array.isArray(html);

    console.log(Array.isArray(html));
    console.log(html);

    var inView = function inView(el) {
        var sb = body.getBoundingClientRect();
        var eb = el.getBoundingClientRect();
        return !(eb.top + eb.height < 0 || eb.top > sb.height);
    };

    var updateInView = function updateInView() {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = html[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var element = _step.value;

                if (inView(element)) element.classList.add('inview');else element.classList.remove('inview');
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    };

    body.onscroll = updateInView;
    updateInView();
})();

(function preloadPage() {
    document.body.onload = function () {
        setTimeout(function () {
            var preloader = document.getElementById('preloader');
            if (!preloader.classList.contains('done')) {
                preloader.classList.add('done');
            }
        }, 2000);
    };
})();