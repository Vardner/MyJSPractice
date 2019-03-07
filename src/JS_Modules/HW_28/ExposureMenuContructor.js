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

export {ExposureMenu};