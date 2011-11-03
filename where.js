(function() {
    var sanitizeCondition = function(condition, params) {
        if (params) {
            params = JSON.parse(JSON.stringify(params));

            for (var key in params)
                condition = condition.replace("@" + key, params[key]);
        }

        return condition;
    };

    Array.prototype.where = function(condition, params) {
        condition = sanitizeCondition(condition, params);

        var func = eval("Array.prototype.where.cache = function() { return " + condition + "; };"),
            result = [];

        for (var i = 0, l = this.length; i != l; i++) {
            if (func.apply(this[i]))
                result.push(this[i]);
        }

        return result;
    };

    Array.prototype.link = function(otherArray, condition, params) {
        condition = sanitizeCondition(condition, params);

        var func = eval("Array.prototype.where.cache = function(other) { return " + condition + "; };"),
            result = [];

        for (var i = 0, l = this.length; i != l; i++) {
            for (var i2 = 0, l2 = otherArray.length; i2 != l2; i2++) {
                if (func.call(this[i], otherArray[i2]))
                    result.push({ left: this[i], right: otherArray[i2] });
            }
        }

        return result;
    };
})();