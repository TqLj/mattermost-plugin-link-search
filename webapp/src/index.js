/*eslint no-console: ['error', { allow: ['warn', 'error', 'log'] }] */

import {id as pluginId} from './manifest';

export default class Plugin {
    // eslint-disable-next-line no-unused-vars
    initialize(registry, store) {
        // @see https://developers.mattermost.com/extend/plugins/webapp/reference/
        var q = (new URLSearchParams(location.search)).get('q');
        if (!q) {
            return;
        }
        var input = document.getElementById('searchBox');
        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeInputValueSetter.call(input, q);
        var ev2 = new Event('input', {bubbles: true});
        input.dispatchEvent(ev2);
        input.focus();
        $('.search__form')[0].requestSubmit();
        $('.sidebar--right__expand')[0].click();
    }
}

window.registerPlugin(pluginId, new Plugin());
