"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ResizeObserver = require('resize-observer-polyfill');
var ParentSize = /** @class */ (function (_super) {
    __extends(ParentSize, _super);
    function ParentSize() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            width: 0, height: 0, top: 0, left: 0,
        };
        _this.resize = function (_a) {
            var width = _a.width, height = _a.height, top = _a.top, left = _a.left;
            _this.setState(function () { return ({
                width: width,
                height: height,
                top: top,
                left: left,
            }); });
        };
        _this.setTarget = function (ref) {
            _this.target = ref;
        };
        return _this;
    }
    ParentSize.prototype.componentDidMount = function () {
        var _this = this;
        this.ro = new ResizeObserver(function (entries, observer) {
            var _loop_1 = function (entry) {
                var _a = entry.contentRect, left = _a.left, top_1 = _a.top, width = _a.width, height = _a.height;
                _this.animationFrameID = window.requestAnimationFrame(function () {
                    _this.resize({
                        width: width,
                        height: height,
                        top: top_1,
                        left: left,
                    });
                });
            };
            for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                var entry = entries_1[_i];
                _loop_1(entry);
            }
        });
        this.ro.observe(this.target);
    };
    ParentSize.prototype.componentWillUnmount = function () {
        window.cancelAnimationFrame(this.animationFrameID);
        if (this.ro) {
            this.ro.disconnect();
        }
    };
    ParentSize.prototype.render = function () {
        var _a = this.props, className = _a.className, children = _a.children, debounceTime = _a.debounceTime, restProps = __rest(_a, ["className", "children", "debounceTime"]);
        return (React.createElement("div", __assign({ style: { width: '100%', height: '100%' }, ref: this.setTarget, className: className }, restProps), children(__assign({}, this.state, { ref: this.target, resize: this.resize }))));
    };
    return ParentSize;
}(React.Component));
exports.ParentSize = ParentSize;
//# sourceMappingURL=index.js.map