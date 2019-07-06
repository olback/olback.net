/*
 *  olback.net v3.0
 */

document.addEventListener('DOMContentLoaded', function () {

    var footer = document.getElementsByTagName('footer')[0];
    var tc = document.querySelector('meta[name=theme-color]');
    var fp = document.querySelector('footer p');

    document.addEventListener('scroll', function() {

        /* Show footer */
        if(window.scrollY > footer.scrollHeight + 50 || document.documentElement.scrollTop > footer.scrollHeight + 50) {
            footer.style.visibility = 'visible';
        } else {
            footer.style.visibility = 'hidden';
        }

        /* Change theme-color */
        if(window.scrollY > window.innerHeight || document.documentElement.scrollTop > window.innerHeight) {
            tc.setAttribute('content', '#252839');
        } else {
            tc.setAttribute('content', '#677077');
        }

    }, { passive: true });

    /* Replace year in template with current one */
    fp.innerHTML = fp.innerHTML.replace(/\d{4}/, new Date().getFullYear());

}, { passive: true });