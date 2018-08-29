'use strict';

class ResourcesService {
    /**
     * @constructor
     */
    constructor() {
        this._resourceCache = {};
        this._readyCallbacks = [];
    }

    /**
     * @description loads images
     * @param {array} data
     */
    load(data) {
        if(data instanceof Array) {
            const rs = this;
            data.forEach(function(url) {
                rs._load(url);
            });
        } else {
            this._load(data);
        }
    }

    /**
     * @description loads image via url
     * @param {string} url
     * @returns {Image}
     * @private
     */
    _load(url) {
        if(this._resourceCache[url]) {
            return this._resourceCache[url];
        } else {
            const img = this._getImage(url);
            this._resourceCache[url] = false;
            img.src = url;
        }
    }

    /**
     * @description gets image from cache via url
     * @param {string} url
     * @returns {Image}
     */
    get(url) {
        return this._resourceCache[url];
    }

    /**
     * @description gets new image
     * @param {string} url
     * @returns {HTMLImageElement}
     * @private
     */
    _getImage(url) {
        const img = new Image();
        const rs = this;
        img.onload = function() {
            rs._resourceCache[url] = img;
            if(rs._isReady()) {
                rs._readyCallbacks.forEach(function(func) { func(); });
            }
        };

        return img;
    }

    /**
     * @description calls function after images loaded
     * @param func
     */
    onReady(func) {
        this._readyCallbacks.push(func);
    }

    /* This function determines if all of the images that have been requested
     * for loading have in fact been properly loaded.
     */
    _isReady() {
        let ready = true;
        for(let k in this._resourceCache) {
            if(this._resourceCache.hasOwnProperty(k) &&
                !this._resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }
}