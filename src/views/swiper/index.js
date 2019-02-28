import template from './index.html'
import './style.css'

export default class {
  mount(container) {
    document.title = 'swiper'
    container.innerHTML = template
    // window.onload = function () {
      //initialize swiper when document ready
      var mySwiper = new Swiper('.swiper .swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        // loop: true,

        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar',
        },

        autoplay: {
          delay: 3000
        }
      })
    // };

     window.myName = 'i am window';

    Function.prototype._call = function (context) {
      if (typeof this !== 'function') {
        throw new TypeError('Error')
      }

      context = context || window;
      context.fn = this;

      const args = [...arguments].slice(1);
      const result = context.fn(...args);

      delete context.fn;

      return result;
    }

    Function.prototype._apply = function (context) {
      if (typeof this !== 'function') {
        throw new TypeError('Error')
      }

      context = context || window;
      const tmpFnSymbol = new Symbol();

      context[tmpFnSymbol] = this;

      const args = [...arguments][1] || [];
      const result = context[tmpFnSymbol](...args);

      delete context.tmpFnSymbol;

      return result;
    }

    Function.prototype._bind = function (context) {
      context = context || window;

      const tmpFuncSymbol = new Symbol();
      context[tmpFuncSymbol] = this;

      const args = [...arguments].slice(1);

      return function () {
        return contex
      }
    }

    function sayName(args) {
      console.log(this.myName);
      console.log(args, 'args');
    }

    const obj = {
      myName: 'i am obj'
    };

    // sayName();
    sayName._apply(obj, 'alsjdflaj');

    function test() {
      setTimeout(() => {
        console.log(1);
      }, 0);

      new Promise(function executor(resolve) {
        console.log(2);

        for (var index = 1; index < 10000; index++) {
          index == 9999 && resolve()
        }

        console.log(3);
      }).then(function () {
        console.log(4);
      })

      console.log(5);
    }

    function flatten(_arr) {
      /* 代码实现 */
      // const a = [false, null, ["a", "b[c]d"]];
      return _arr.reduce((acc, next) => Array.isArray(next) ? acc.concat(flatten(next)) : acc.concat(next), []);
    }
  }
}
