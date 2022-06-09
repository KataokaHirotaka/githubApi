'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n      <td>', '</td>\n      <td>\n        <a href="', '" target="blank">', '</a>\n      </td>\n      <td>', '</td>\n    '], ['\n      <td>', '</td>\n      <td>\n        <a href="', '" target="blank">', '</a>\n      </td>\n      <td>', '</td>\n    ']),
    _templateObject2 = _taggedTemplateLiteral(['\n      <table>\n        <thead>\n          <tr>\n            <th>\u9806\u4F4D</th>\n            <th>\u30EA\u30DD\u30B8\u30C8\u30EA</th>\n            <th>\u30B9\u30BF\u30FC\u6570</th>\n          </tr>\n        </thead>\n      </table>\n    '], ['\n      <table>\n        <thead>\n          <tr>\n            <th>\u9806\u4F4D</th>\n            <th>\u30EA\u30DD\u30B8\u30C8\u30EA</th>\n            <th>\u30B9\u30BF\u30FC\u6570</th>\n          </tr>\n        </thead>\n      </table>\n    ']),
    _templateObject3 = _taggedTemplateLiteral(['\n      <div class="no_result">\n        <p>\n          \u30C7\u30FC\u30BF\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\uFF9F(\uFF9F\xB4\u0414\uFF40\uFF9F)\uFF9F\u3002 [\u60B2]<br>\n          \u6B63\u3057\u3044\u8A00\u8A9E\u3092\u5165\u529B\u3057\u3066\u306D\u2500=\u2261\u03A3((( \u3064\u2022\u0300\u03C9\u2022\u0301)\u3064\n        </p>\n      </div>\n    '], ['\n      <div class="no_result">\n        <p>\n          \u30C7\u30FC\u30BF\u3092\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\uFF9F(\uFF9F\xB4\u0414\uFF40\uFF9F)\uFF9F\u3002 [\u60B2]<br>\n          \u6B63\u3057\u3044\u8A00\u8A9E\u3092\u5165\u529B\u3057\u3066\u306D\u2500=\u2261\u03A3((( \u3064\u2022\u0300\u03C9\u2022\u0301)\u3064\n        </p>\n      </div>\n    ']),
    _templateObject4 = _taggedTemplateLiteral(['\n      <div>\n        <img src="./img/nakayama-kinnikun.jpg">\n      </div>\n    '], ['\n      <div>\n        <img src="./img/nakayama-kinnikun.jpg">\n      </div>\n    ']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GitHubApi = function () {
  function GitHubApi() {
    _classCallCheck(this, GitHubApi);

    this.textInput = document.getElementById('searchId');
    this.searchBtn = document.getElementById('searchBtn');
    this.result = document.getElementById('result');
  }

  _createClass(GitHubApi, [{
    key: 'init',
    value: function init() {
      this.clickEvents();
    }
  }, {
    key: 'clickEvents',
    value: function clickEvents() {
      var _this = this;

      this.searchBtn.addEventListener('click', function () {
        _this.main();
      });
    }
  }, {
    key: 'main',
    value: async function main() {
      try {
        while (this.result.firstChild) {
          this.result.removeChild(result.firstChild);
        }var searchId = this.getSearchId();
        var data = await this.fetchSearchData(searchId);
        var total_count = data.total_count;
        var muscleCondition = searchId.match(/きんにく|なかやま|筋肉|きんに/g);
        if (total_count > 0) {
          this.createTableHeader();
          for (var i = 0; i < 20; i++) {
            this.createView(data.items[i], i);
          }
        } else if (muscleCondition) {
          this.createMuscleView();
        } else {
          this.createNoDataView();
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, {
    key: 'createView',
    value: function createView(data, index) {
      // 結果を載せた見た目を作成
      var url = data.html_url;
      var star = data.stargazers_count;
      var rank = index + 1;
      var name = data.name;
      var table = document.querySelector('#result table');

      var node = document.createElement('tr');
      var tableEl = this.escapeHTML(_templateObject, rank, url, name, star);
      node.innerHTML += tableEl;
      table.append(node);
    }
  }, {
    key: 'createTableHeader',
    value: function createTableHeader() {
      // ランキングを表示するテーブルのヘッダーを作成
      var table = this.escapeHTML(_templateObject2);
      this.result.innerHTML += table;
    }
  }, {
    key: 'createNoDataView',
    value: function createNoDataView() {
      var node = this.escapeHTML(_templateObject3);
      this.result.innerHTML += node;
    }
  }, {
    key: 'createMuscleView',
    value: function createMuscleView() {
      var node = this.escapeHTML(_templateObject4);
      this.result.innerHTML += node;
    }
  }, {
    key: 'escapeHTML',
    value: function escapeHTML(strings) {
      var _this2 = this;

      for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        values[_key - 1] = arguments[_key];
      }

      return strings.reduce(function (result, str, i) {
        console.log(i);
        var val = values[i - 1];
        if (typeof value === 'string') {
          console.log(result + _this2.escapeSpecialChars(val) + str);
          return result + _this2.escapeSpecialChars(val) + str;
        } else {
          return result + String(val) + str;
        }
      });
    }
  }, {
    key: 'escapeSpecialChars',
    value: function escapeSpecialChars(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot').replace(/'/g, '&#039;');
    }
  }, {
    key: 'fetchSearchData',
    value: function fetchSearchData(searchId) {
      return fetch('https://api.github.com/search/repositories?q=' + searchId + '+in:name&sort=stars&order=desc').then(function (res) {
        if (res.ok) {
          return res.json();
        } else throw new Error(res.status + ': ' + res.statusText);
      }).catch(function (error) {
        throw new Error(error);
      });
    }
  }, {
    key: 'getSearchId',
    value: function getSearchId() {
      var val = this.textInput.value;
      return val;
    }
  }]);

  return GitHubApi;
}();

var gitHubApi = new GitHubApi();
gitHubApi.init();
