import * as $ from 'jquery'
function createAnalytics() {
    let counter = 0;
    let isDestroyed = false;

    const listener = function () {
        counter++;
    };

    $(document).on('click', listener);
    return {
        destroy: function () {
            $(document).off('click', listener);
            isDestroyed = true;
        },
        getClicks: function () {
            if (isDestroyed)
                return `Analytics is destroyed. Total clicks = ${counter}`;
            else
                return counter;
        },
    }
}

window.analytics = createAnalytics();