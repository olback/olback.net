/*
 *  olback.net v4.0
 */

// @ts-check

const professions = [
    'web developer',
    'back-end developer',
    'DevOps',
    'sys admin'
];

window.addEventListener('DOMContentLoaded', async () => {

    // If the pathname is /mail, scroll to the contact form real quick
    if (location.pathname === '/mail') {
        document.getElementById('contact').scrollIntoView();
    }

    const timeout = {

        /**
         * @param {number} ms
         * @private
         */
        _timeout: async function(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        char: async function() {
            return this._timeout(75);
        },

        next: async function() {
            return this._timeout(1000);
        },

        show: async function() {
            return this._timeout(3000);
        }

    };

    const underscore = {

        underscore: document.getElementById('underscore'),

        show: function() {
            this.underscore.style.display = 'inline';
        },

        hide: function() {
            this.underscore.style.display = 'none';
        },

        stop: function() {
            this.underscore.classList.remove('blink');
        },

        start: function() {
            this.underscore.classList.add('blink');
        }

    };

    const profession = {

        profession: document.getElementById('profession'),

        /**
         * @param {string} char
         */
        push: function(char) {
            if (char === ' ') {
                this.profession.innerHTML += '&nbsp;';
            } else if (char === '.') {
                this.profession.innerHTML += '<span class="accent">.</span>';
            } else {
                this.profession.innerText += char;
            }
        },

        pop: function() {
            const s = this.profession.innerText;
            this.profession.innerText = s.substring(0, s.length - 1);
        },

        /**
         * @param {string} text
         */
        write: async function(text) {
            let charArr = text.split('');
            underscore.hide();
            while (charArr.length) {
                this.push(charArr.shift());
                await timeout.char();
            }
            await timeout.char();
            profession.push('.');
            underscore.show();
        },

        delete: async function() {
            underscore.stop();
            while (this.profession.innerText) {
                await timeout.char();
                this.pop();
            }
            underscore.start();
        }

    };

    const index = {
        _index: 0,
        get next() {
            this._index = ++this._index % professions.length;
            return this._index;
        }
    };

    // Loop through professions
    (async () => {

        while (true) {

            await timeout.show();
            await profession.delete();
            await timeout.next();
            await profession.write(professions[index.next]);

        }

    })();

    // Make sure the mouse was moved before form submission. This is to prevent bots.
    (() => {

        function onMove() {
            // @ts-ignore
            document.querySelector('form>input[name=_interactive]').checked = true;
            // @ts-ignore
            document.querySelector('form>button[disabled]').disabled = false;
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('touchmove', onMove);
            console.log('Mouse moved, enabling form.');
        }
        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('touchmove', onMove, { passive: true });

    })();

    // Handle arrow & read more click
    (() => {

        function scrollToOSS() {
            document.getElementById('oss').scrollIntoView({ behavior: 'smooth' });
        }

        document.getElementById('arrow').addEventListener('click', scrollToOSS, { passive: true });
        document.getElementById('read-more').addEventListener('click', scrollToOSS, { passive: true });

    })();

    // Handle to-top arrow and click
    // (() => {

    //     const arrow = document.getElementById('scroll-top');

    //     arrow.addEventListener('click', () => {

    //         window.scrollTo({ top: 0, behavior: 'smooth' });

    //     }, { passive: true });

    //     const minScrollHeight = window.innerHeight * 0.7;

    //     // TODO: Hide to top button if footer is visible
    //     window.addEventListener('scroll', () => {

    //         if (window.pageYOffset >= minScrollHeight) {
    //             arrow.classList.add('show');
    //         } else {
    //             arrow.classList.remove('show');
    //         }

    //     }, { passive: true });

    // })();

    // Cookie stuff
    (async function () {

        const itemKey = 'cookie-accepted';

        if (localStorage.getItem(itemKey) !== 'true') {

            await timeout.next();

            const cookie = document.getElementById('cookie');
            const cookieBtn = document.getElementById('cookie-ok');

            cookie.classList.add('show');

            cookieBtn.addEventListener('click', () => {
                cookie.classList.remove('show');
                localStorage.setItem(itemKey, 'true');
            });

        }

    })();

    // Darkmode toggle
    (() => {

        const itemKey = 'darkmode';

        if (localStorage.getItem(itemKey) === 'true') {
            document.body.classList.add('dark');
        }

        document.getElementById('darkmode-toggle')
        .addEventListener('click', () => {
            localStorage.setItem(itemKey, String(document.body.classList.toggle('dark')));
        }, { passive: true });

    })();

    // Set language colors
    (() => {

        const langDots = document.getElementsByClassName('lang-dot');

        for (const ld of langDots) {
            const color = ld.getAttribute('data-lang-color');
            // @ts-ignore
            ld.style.backgroundColor = color;
        }

    })();

}, { passive: true });
