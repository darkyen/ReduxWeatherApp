# About this folder
This is the folder for all the actions, we are following Redux pattern
an example follows

```javascript
export function createTodo(text) {
  return {
    type: 'CREATE_TODO',
    text,
    date: Date.now()
  }
}
export function editTodo(id, text) {
  return {
    type: 'EDIT_TODO',
    id,
    text,
    date: Date.now()
  };
}
export function deleteTodo(id) {
  return {
    type: 'DELETE_TODO',
    id
  };
}
```

As you can see redux actions are simply functions that represent a
well formatted object.
