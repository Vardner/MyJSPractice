const ExposureBlock = function () {
    const exposureBlock = $(document.createElement('div'))
        .addClass('Exposure');
    const exposureTitle = $(document.createElement('h3'))
        .addClass('Exposure-title')
        .text('Hellblade')
        .appendTo(exposureBlock);
    const exposureImageContainer = $(document.createElement('div'))
        .addClass('Exposure-imageContainer')
        .appendTo(exposureBlock);
    const exposureImage = $(document.createElement('img'))
        .attr('src', 'images/Exposure1_1.jpg')
        .addClass('Exposure-image')
        .appendTo(exposureImageContainer);

    this._exposureEl = exposureBlock;
    this._exposureTitle = exposureTitle;
    this._exposurePicture = exposureImage;

    exposureMediator.on('changePicture', this.update.bind(this));
};

ExposureBlock.prototype = {
    constructor: ExposureBlock,

    render: function (container) {
        let containerElement;
        if (container instanceof HTMLElement) {
            $(this._exposureEl).appendTo(container);
            return;
        }

        if (container instanceof jQuery) {
            this._exposureEl.appendTo(container);
            return;
        }

        containerElement = $(container);

        if (containerElement.length) {
            $(this._exposureEl).appendTo(containerElement.length === 1
                ? containerElement
                : document.querySelector(container));
        }
    },

    update: function (title, src) {
        $(this._exposureTitle).text(title);
        $(this._exposurePicture).attr('src', src);
    }
};
