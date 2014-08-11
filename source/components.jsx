/** @jsx React.DOM */

var TodoService = {
  _states: [],
  saveTodoState: function (currentState) {
    this._states.push(currentState);
  },
  undo: function () {
    return this._states.pop();
  }
};

var TodoList = React.createClass({
  render: function () {
    var items = this.props.items.map(function (item) {
      return <li>{item}</li>;
    });

    return <ul>{items}</ul>;
  }
});

var TodoForm = React.createClass({
  componentDidMount: function () {
    this.refs.description.getDOMNode().focus();
  },
  componentDidUpdate: function () {
    this.refs.description.getDOMNode().focus();
  },
  handleClick: function (evt) {
    evt.preventDefault();
    var descriptionRef = this.refs.description.getDOMNode();
    this.props.onSubmit(descriptionRef.value);
    descriptionRef.value = '';
  },
  render: function () {
    return <div><input type="text" ref="description" /><button onClick={this.handleClick}>Add</button></div>
  }
});

var TodoPanel = React.createClass({
  getInitialState: function () {
    return { items: [] }
  },
  handleNewTodoItem: function (item) {
    TodoService.saveTodoState(_.map(this.state.items, _.clone));
    console.log(TodoService._states);

    var items = this.state.items;
    items.push(item);

    this.setState({items: items});
  },
  handleUndo: function () {
    this.setState({items: TodoService.undo() });
  },
  render: function () {
    return (
      <div>
        <TodoForm onSubmit={this.handleNewTodoItem}/>
        <TodoList items={this.state.items} />
        <button onClick={this.handleUndo} disabled={TodoService._states.length ? '' : 'disabled'}>Undo last action</button>
      </div>
    );
  }
});

React.renderComponent(<TodoPanel />, document.getElementById('main'));