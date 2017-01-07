
window.meng = window.meng || {};
(function () {

    function Get() {
        this.def = $.Deferred();
    }

    Get.prototype.request = function (url) {
        $.get(url, function (data) {
            this.def.resolve(data);
        }.bind(this));
        return this.def;
    };
    meng.Get = Get;
})();