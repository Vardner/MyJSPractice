'use strict';
const defaultMenuWork28 = $('#Menu').find('li[data-work="28"]');
// const tabletMenuWork28 = $('#Menu--tablet').find('li[data-work="28"]');

defaultMenuWork28.on('click', renderHW_28);
// tabletMenuWork26.on('click', renderHW_28);

// import {exposureMediator, ExposureBlock, ExposureMenu} from './modules.min.js';
const exposureMediator = (function () {
    const subscribers = {};
    return {
        on: function (event, callback) {
            subscribers[event] = subscribers[event] || new Set();
            subscribers[event].add(callback);
        },

        off: function (event, callback) {
            if (subscribers[event]) {
                subscribers[event].delete(callback);
            } else {
                throw Error(`Reference Error: event "${event}" hasn't exist`);
            }
        },

        emit: function (event, ...rest) {
            if (subscribers[event]) {
                subscribers[event].forEach((callback) => {
                    callback(...rest);
                });
            } else {
                throw Error(`Reference Error: event "${event}" hasn't exist`);
            }
        }
    };
})();

const ExposureMenu = function (isVertical) {
    const exposureMenu = $(document.createElement('ul')).addClass('ExposureMenu');
    const exposureMenuTitles = ['Cats', 'Dogs', 'Rabbits'];
    const exposureMenuSubItems = [[{
        name: 'Hellblade',
        imgSrc: 'images/Exposure1_1.jpg'
    }, {
        name: 'Aries',
        imgSrc: 'images/Exposure1_2.jpg'
    }, {
        name: 'Van Gogh',
        imgSrc: 'images/Exposure1_3.jpg'
    }], [{
        name: 'Seal',
        imgSrc: 'images/Exposure2_1.jpg'
    }, {
        name: 'Optical prism',
        imgSrc: 'images/Exposure2_2.jpg'
    }, {
        name: 'Pond',
        imgSrc: 'images/Exposure2_3.jpg'
    }], [{
        name: 'Raccon Rocket',
        imgSrc: 'images/Exposure3_1.jpg'
    }, {
        name: 'Disneyland',
        imgSrc: 'images/Exposure3_2.jpg'
    }, {
        name: 'Pirate',
        imgSrc: 'images/Exposure3_3.jpg'
    }]];

    let exposureMenuItemContainer;
    let exposureMenuItem;
    let exposureSubMenu;
    let exposureSubMenuItem;
    let exposureSubMenuItemContainer;

    this._menuItems = {};
    this._menuEl = exposureMenu;

    if (isVertical) {
        exposureMenu.addClass('ExposureMenu--vertical');
    }

    exposureMenuTitles.forEach((title, index) => {

        exposureMenuItemContainer = $(document.createElement('li'))
            .addClass('ExposureMenu-item')
            .appendTo(exposureMenu);

        exposureMenuItem = $(document.createElement('span'))
            .addClass('ExposureMenu-itemText')
            .text(title)
            .appendTo(exposureMenuItemContainer);

        exposureSubMenu = $(document.createElement('ul'))
            .addClass('ExposureMenu-subMenu')
            .appendTo(exposureMenuItemContainer);

        const itemName = exposureMenuItem.text();
        this._menuItems[exposureMenuItem.text()] = exposureMenuItemContainer;


        exposureMenuItem.on('click', () => {
            exposureMediator.emit('toggleSubmenu', itemName);
        });

        exposureMenuSubItems[index].forEach((item) => {
            exposureSubMenuItemContainer = $(document.createElement('li'))
                .addClass('ExposureMenu-item')
                .appendTo(exposureSubMenu);

            exposureSubMenuItem = $(document.createElement('span'))
                .addClass('ExposureMenu-itemText')
                .text(item.name).appendTo(exposureSubMenuItemContainer);

            exposureSubMenuItem[0].imageSrc = item.imgSrc;

            exposureSubMenuItem.on('click', () => {
                exposureMediator.emit('changePicture', item.name, item.imgSrc);
            });
        });
    });

    exposureMediator.on('toggleSubmenu', this.toggleSubmenu.bind(this));
};

ExposureMenu.prototype = {
    constructor: ExposureMenu,

    render: function (container) {
        let containerElement;
        if (container instanceof HTMLElement) {
            $(this._menuEl).appendTo(container);
            return;
        }

        if (container instanceof jQuery) {
            this._menuEl.appendTo(container);
            return;
        }

        containerElement = $(container);

        if (containerElement.length) {
            $(this._menuEl).appendTo(containerElement.length === 1
                ? containerElement
                : document.querySelector(container));
        }
    },

    toggleSubmenu: function (menu) {
        let submenuTarget;
        for (let key in this._menuItems) {
            if (key !== menu) {
                $(this._menuItems[key]).find('ul').slideUp('fast');
            } else {
                submenuTarget = $(this._menuItems[key]).find('ul');
            }
        }

        submenuTarget.slideToggle({
            duration: 300,
            start: () => submenuTarget.css('display', 'flex')
        });
    }
};

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

function renderHW_28 (e) {
    const task = e.target.closest('li.Menu-item');
    let taskNumber;

    // Validate item link
    if (task.classList.contains('disabled') || task.parentElement.classList.contains('Menu')) {
        return;
    }

    taskNumber = parseInt(task.dataset.task);

    switch (taskNumber) {
        case 1:
            HW_28.task1.render();
            break;

        default:
            alert('This task doesn\'t exist :(');
    }
}

const HW_28 = {
    task1: {
        render () {
            HW_28.clearContentContainer();

            const renderArea = $('#Content-area');
            let task;

            if (this.taskItem) {
                renderArea.append(this.taskItem);
                return;
            }

            const taskContainer = $(document.createElement('div')).addClass('Task-container Task-container--exposure').appendTo(renderArea);

            const exposure = new ExposureBlock();
            const horizontalMenu = new ExposureMenu(false);
            const verticalMenu = new ExposureMenu(true);

            horizontalMenu.render(taskContainer);
            exposure.render(taskContainer);
            verticalMenu.render(taskContainer);

            this.taskItem = taskContainer;
        },
    },

    clearContentContainer: function () {
        const renderArea = document.getElementById('Content-area');
        while (renderArea.firstChild) {
            renderArea.removeChild(renderArea.firstChild);
        }
    }
};