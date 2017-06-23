'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (window, document) {
  'use strict';

  var Utils = {
    /**
     * Remove
     * @param  {HTMLElement|Event} nodeOrEvent [description]
     * @return {void}
     */
    remove: function remove(nodeOrEvent) {
      var node = nodeOrEvent.constructor.name === 'HTMLDivElement' ? nodeOrEvent : nodeOrEvent.currentTarget;

      node.parentNode.removeChild(node);
    }
  };

  var DismissableAlertComponent = function () {
    function DismissableAlertComponent(node) {
      _classCallCheck(this, DismissableAlertComponent);

      node.addEventListener('click', this.close);
    }

    _createClass(DismissableAlertComponent, [{
      key: 'close',
      value: function close(event) {
        event.preventDefault();

        var alertNode = event.currentTarget.parentNode;

        if (alertNode.classList.contains('fade')) {
          alertNode.addEventListener('transitionend', Utils.remove, false);
        } else {
          Utils.remove(alertNode);
        }

        alertNode.classList.remove('in');
      }
    }]);

    return DismissableAlertComponent;
  }();

  var DropDownMenuComponent = function () {
    function DropDownMenuComponent(node) {
      _classCallCheck(this, DropDownMenuComponent);

      node.addEventListener('click', this.open);
      node.addEventListener('blur', this.close);
    }

    _createClass(DropDownMenuComponent, [{
      key: 'open',
      value: function open(event) {
        event.preventDefault();

        event.currentTarget.parentElement.classList.toggle('open');
      }
    }, {
      key: 'close',
      value: function close(event) {
        event.preventDefault();

        event.currentTarget.parentElement.classList.remove('open');

        // Trigger the click event on the target if it not opening another menu
        if (event.relatedTarget && event.relatedTarget.getAttribute('data-toggle') !== 'dropdown') {
          event.relatedTarget.click();
        }
      }
    }]);

    return DropDownMenuComponent;
  }();

  var CollapsableBehavior = function () {
    // private _originNode
    // private _targetNode

    function CollapsableBehavior(node) {
      var _this = this;

      _classCallCheck(this, CollapsableBehavior);

      this._originNode = node;
      var targetSelector = node.dataset.target ? node.dataset.target : node.hash;
      this._targetNode = document.querySelector(targetSelector);

      node.addEventListener('click', function (event) {
        _this.toggle(event);
      });
    }

    /**
     * Set an element to its the potential maximum height
     *
     * @see http://stackoverflow.com/a/3485654/2736233
     *
     * @param  {HTMLElement} node DOM element
     * @return {void}
     */


    _createClass(CollapsableBehavior, [{
      key: '_setMaxHeight',
      value: function _setMaxHeight(node) {
        var currentHeight = node.style.height;
        node.style.height = 'auto';
        var maxHeight = getComputedStyle(node).height;

        // Force re-paint
        // @see http://stackoverflow.com/a/3485654/2736233
        node.style.height = currentHeight;
        this._targetNode.offsetHeight; // jshint ignore:line

        node.style.height = maxHeight;
      }
    }, {
      key: 'toggle',
      value: function toggle(event) {
        event.preventDefault();

        if (this._targetNode.classList.contains('in')) {
          this.hide();
        } else {
          this.show();
        }
      }
    }, {
      key: 'show',
      value: function show() {
        var _this2 = this;

        this._targetNode.addEventListener('transitionend', function () {
          _this2.complete(false);
        });

        this._originNode.setAttribute('aria-expanded', true);
        this._targetNode.classList.remove('collapse');
        this._targetNode.classList.add('collapsing');
        this._targetNode.style.height = '1px';
        this._setMaxHeight(this._targetNode);
        this._targetNode.setAttribute('aria-expanded', true);
      }
    }, {
      key: 'hide',
      value: function hide() {
        var _this3 = this;

        this._targetNode.addEventListener('transitionend', function () {
          _this3.complete(true);
        }, false);

        this._originNode.setAttribute('aria-expanded', false);
        this._originNode.classList.remove('collapse');
        this._targetNode.classList.add('collapsing');

        // Force re-paint
        // @see http://stackoverflow.com/a/3485654/2736233
        this._targetNode.style.height = getComputedStyle(this._targetNode).height;
        this._targetNode.offsetHeight; // jshint ignore:line

        this._targetNode.style.height = '1px';
        this._targetNode.setAttribute('aria-expanded', false);
      }
    }, {
      key: 'complete',
      value: function complete(isHiding) {
        this._targetNode.classList.remove('collapsing');
        this._targetNode.classList.add('collapse');
        this._targetNode.style.height = 'auto';

        if (!isHiding) {
          this._targetNode.classList.add('in');
        } else {
          this._targetNode.classList.remove('in');
        }
      }
    }]);

    return CollapsableBehavior;
  }();

  var collapsableNodes = document.querySelectorAll('[data-toggle=collapse]');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = collapsableNodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var collapsableNode = _step.value;

      new CollapsableBehavior(collapsableNode);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var alertNodes = document.querySelectorAll('[data-dismiss=alert]');
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = alertNodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var alertNode = _step2.value;

      new DismissableAlertComponent(alertNode);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var dropDownNodes = document.querySelectorAll('[data-toggle=dropdown]');
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = dropDownNodes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var dropDownNode = _step3.value;

      new DropDownMenuComponent(dropDownNode);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
})(window, window.document);