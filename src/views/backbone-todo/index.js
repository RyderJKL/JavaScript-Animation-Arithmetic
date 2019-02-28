import template from './index.html';
import './style.css';

export default class {
  mount(container) {
    document.title = 'todo';
    container.innerHTML = template;
    this.lanuchBackboneApp();
    // container.querySelector('.bar__gofoo').addEventListener('click', () => {
    //   // 调用 router.go 方法加载 /foo 页面
    //   router.go('/home')
    // })
  }

  lanuchBackboneApp () {
    // Todo Model
    // ----

    const Todo = Backbone.Model.extend({
      defaults () {
        return {
          title: "empty todo ...",
          order: Todos.nextOrder(),
          done: false
        }
      },

      toggle () {
        this.save({ done: !this.get('done')});
      }
    })

    // Todo Collection
    // ----

    const TodoList = Backbone.Collection.extend({
      model: Todo,

      localStorage: new Backbone.LocalStorage("todo-backbone"),

      done () {
        return this.where({ done: true });
      },

      remaining () {
        return this.whree({ done: false })
      },

      nextOrder () {
        if (!this.length) return 1;

        return this.last().get('order') + 1;
      },

      comparator: 'order'
    })

    const Todos = new TodoList;

    // Todo Item View
    const TodoView = Backbone.View.extend({
      tagName: "li",

      template: _.template($("#item-template").html()),

      events: {
        'click .toggle': 'toggleDone',
        'dblclick .view': 'edit',
        'click a.destroy': 'clear',
        'keypress .edit': 'updateOnEenter',
        'blur .edit': 'close'
      },

      initialize () {
        this.listenTo(this.model, 'change', this.render),
        this.listenTo(this.model, 'destroy', this.remove)
      },

      render () {
        this.$el.html(this.template(this.model.toJSON()));
        this.$el.toggleClass('done', this.model.get('done'));
        this.input = this.$('.edit');
        return this;
      },

      toggleDone () {
        this.model.toggle();
      },

      edit () {
        this.$el.addClass('editing');
        this.input.focus();
      },

      clear () {
        this.model.destroy()
      },

      updateOnEenter(e) {
        if (e.keyCode === 13) this.close();
      },

      close () {
        const inputValue = this.input.val();

        if (!inputValue) {
          this.clear();
          return;
        }

        this.model.save({title: inputValue});
        this.$el.removeClass('editing');
      }
    })

    const AppView = Backbone.View.extend({
      el: $('#todoapp'),

      events: {
        'keypress #new-todo': 'createOnEnter',
        'click #clear-completed': 'clearCompleted',
        'click #toggle-all': 'toggleAllComplete'
      },

      initialize () {
        this.input = this.$('#new-todo');
        this.allCheckbox = this.$('#toggle-all')[0];

        this.listenTo(Todos, 'add', this.addOne);
        this.listenTo(Todos, 'reset', this.addAll);
        this.listenTo(Todos, 'all', this.render);

        this.footer = this.$('footer');
        this.main = this.$('#main');

        Todos.fetch();
      },

      render () {
        const done = Todos.done().length;
        const remaining = Todos.remaining.length;

        this.allCheckbox.checked = !remaining;

        if (!Todos.length) {
          this.main.hide();
          this.footer.hide();
          return
        }

        this.main.show();
        this.footer.show();
      },

      addOne (todo) {
        const view = new TodoView({ model: todo});
        const todoEleItem = view.render().el;
        this.$("#todo-list").append(todoEleItem);
      },

      addAll () {
        console.log('addAll')
      },

      createOnEnter (e) {
        if (e.keyCode !== 13) return;
        if (!this.input.val()) return;

        Todos.create({ title: this.input.val()});

        this.input.val('');
      },

      clearCompleted () {

      },

      toggleAllComplete () {

      }
    })

    const app = new AppView;
  }
}
