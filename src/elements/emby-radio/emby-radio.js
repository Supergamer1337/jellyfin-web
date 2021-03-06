import layoutManager from 'layoutManager';
import 'css!./emby-radio';
import 'webcomponents';

/* eslint-disable indent */

    let EmbyRadioPrototype = Object.create(HTMLInputElement.prototype);

    function onKeyDown(e) {
        // Don't submit form on enter
        // Real (non-emulator) Tizen does nothing on Space
        if (e.keyCode === 13 || e.keyCode === 32) {
            e.preventDefault();

            if (!this.checked) {
                this.checked = true;

                this.dispatchEvent(new CustomEvent('change', {
                    bubbles: true
                }));
            }

            return false;
        }
    }

    EmbyRadioPrototype.attachedCallback = function () {
        const showFocus = !layoutManager.mobile;

        if (this.getAttribute('data-radio') === 'true') {
            return;
        }

        this.setAttribute('data-radio', 'true');

        this.classList.add('mdl-radio__button');

        let labelElement = this.parentNode;
        labelElement.classList.add('mdl-radio');
        labelElement.classList.add('mdl-js-radio');
        labelElement.classList.add('mdl-js-ripple-effect');
        if (showFocus) {
            labelElement.classList.add('show-focus');
        }

        let labelTextElement = labelElement.querySelector('span');

        labelTextElement.classList.add('radioButtonLabel');
        labelTextElement.classList.add('mdl-radio__label');

        let html = '';

        html += '<div class="mdl-radio__circles">';

        html += '<svg>';
        html += '<defs>';
        html += '<clipPath id="cutoff">';
        html += '<circle cx="50%" cy="50%" r="50%" />';
        html += '</clipPath>';
        html += '</defs>';
        html += '<circle class="mdl-radio__outer-circle" cx="50%" cy="50%" r="50%" fill="none" stroke="currentcolor" stroke-width="0.26em" clip-path="url(#cutoff)" />';
        html += '<circle class="mdl-radio__inner-circle" cx="50%" cy="50%" r="25%" fill="currentcolor" />';
        html += '</svg>';

        if (showFocus) {
            html += '<div class="mdl-radio__focus-circle"></div>';
        }

        html += '</div>';

        this.insertAdjacentHTML('afterend', html);

        this.addEventListener('keydown', onKeyDown);
    };

    document.registerElement('emby-radio', {
        prototype: EmbyRadioPrototype,
        extends: 'input'
    });

/* eslint-enable indent */
