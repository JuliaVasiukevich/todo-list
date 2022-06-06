const json = localStorage.getItem("todos") || "[]";
const todos = JSON.parse(json);

const todoManager = {
    todos: todos,
    showCompleted : false,
    deleteLast() {
        this.todos.pop();
        this.saveToLocalStorage();
    },
    deleteAll() {
        this.todos = [];
        this.saveToLocalStorage();
    },
    add(label, completed) {
        const date = new Date();
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");

        let todo = {
            id: this.todos.length + 1,
            label: label,
            completed: completed,
            date: `${day}.${month}.${date.getFullYear()}`,
        };

        this.todos.push(todo);
        this.saveToLocalStorage();
    },
    saveToLocalStorage() {
        const json = JSON.stringify(this.todos);
        localStorage.setItem("todos", json);
    },
    delete(todo) {
        this.todos = this.todos.filter((currentTodo) => currentTodo !== todo);
        this.saveToLocalStorage();
    },
    getCompletedLength() {
        return this.todos.filter(({completed}) => completed).length;
    },
    toggleCompleted(todo, completed) {
        todo.completed = completed;
        this.saveToLocalStorage();
    }
};

export {
    todoManager
};