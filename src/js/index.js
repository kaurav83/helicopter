(function fadeIn() {
    let body = document.querySelector('body');
    let html = [...document.querySelectorAll('section, object, ul, li, h1, h2, h3, p, header, footer')];

    Array.isArray(html);

    console.log(Array.isArray(html));
    console.log(html);

    let inView = (el) => {
        let sb = body.getBoundingClientRect();
        let eb = el.getBoundingClientRect();
        return !((eb.top + eb.height < 0) || (eb.top > sb.height));
    }

    let updateInView = () => {
        for (let element of html) {
            if (inView(element)) element.classList.add('inview')
            else element.classList.remove('inview');
        }
    }

    body.onscroll = updateInView;
    updateInView();
})();

(function preloadPage() {
    document.body.onload = function() {
        setTimeout(function() {
            let preloader = document.getElementById('preloader');
            if (!preloader.classList.contains('done')) {
                preloader.classList.add('done');
            }
        }, 2000);
    }
})();