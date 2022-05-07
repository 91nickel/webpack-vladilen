import * as $ from 'jquery'

function createAnalyticsTs(): object {
    let counter = 0;
    let isDestroyed:boolean = false;

    const listener = function (): number {
        return counter++;
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

window['analytics_ts'] = createAnalyticsTs();