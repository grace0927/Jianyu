// backbone model

var Todo = Backbone.Model.extend({
    defaults: {
        author: '',
        title: '',
        due: ''
    }
});

// backbone collection

var Todos = Backbone.Collection.extend({
//    url: 'todos.php'
});

// initial a collection

var todos = new Todos();

// backbone view for one todo

var TodoView = Backbone.View.extend({
    model: new Todo(),
    tagName: 'tr',
    initialize: function() {
        this.template = _.template($('.todo-list-template').html());
    },
    events: {
        'click .edit-todo': 'edit',
        'click .delete-todo': 'delete',
        'click .update-todo': 'update',
        'click .cancel': 'cancel',
    },
    edit: function() {
        $('.edit-todo').hide();
        $('.delete-todo').hide();
        this.$('.update-todo').show();
        this.$('.cancel').show();

        var author = this.$('.author').html();
        var title = this.$('.title').html();
        var due = this.$('.due').html();

        this.$('.author').html('<input class="form-control update-author-input" value="'+author+'"/>');
        this.$('.title').html('<input class="form-control update-title-input" value="'+title+'"/>');
        this.$('.due').html('<input class="form-control update-due-input" value="'+due+'"/>');
    },
    update: function() {
        this.model.set('author', this.$('.update-author-input').val());
        this.model.set('title', this.$('.update-title-input').val());
        this.model.set('due', this.$('.update-due-input').val());

        this.model.save(null, {
            success: function() {},
            error: function() {}
        });
    },
    cancel: function() {
        todosView.render();
    },
    delete: function() {
        this.model.destroy({
            success: function(res) {},
            error: function() {}
        });
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

// backbone view for all todos

var TodosView = Backbone.View.extend({
    model: todos,
    el: $('.todo-list'),
    initialize: function() {
        var self = this;
        this.model.on('add', this.render, this);
        this.model.on('change', function() {
            setTimeout(function(){
                self.render();
            }, 30);
        }, this);
        this.model.on('remove', this.render, this);

        /*
        this.model.fetch({
            success: function(response) {},
            error: function() {}
        });
        */
    },
    render: function() {
        var self = this;
        this.$el.html('');
        _.each(this.model.toArray(), function(todo) {
            self.$el.append((new TodoView({model: todo})).render().$el);
        });
        return this;
    }
});

var todosView = new TodosView();

$(document).ready(function() {
    $('.add-todo').on('click', function(){
        var todo = new Todo({
            author: $('.author-input').val(),
            title: $('.title-input').val(),
            due: $('.due-input').val()
        });
        todos.add(todo);
        todo.save(null, {
            success: function(response) {},
            error: function() {}
        });

        author: $('.author-input').val('');
        title: $('.title-input').val('');
        due: $('.due-input').val('');
    });
});
