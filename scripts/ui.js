import {
    todoManager
} from "./todoManager.js";
import {
    make
} from "./utils.js";
import {
    createInputWithClearButton
} from "./utils.js";


const UI = {
    
    generationHeader() {
        const todoApp = make("section", "todo-app");
        const header = make("header", "header");
        const todoList = make("main", "todo-list");

        todoApp.append(header);
        todoApp.append(todoList);

        const firstRow = make("div", "todo__row");
        header.append(firstRow);

        const headerDeleteButton = make("button", ["header__delete-all", "button"]);
        headerDeleteButton.innerText = "Delete all";
        headerDeleteButton.addEventListener("click", () => {
            todoManager.deleteAll();
            this.renderTodos();
        });

        const headerDeleteButtonLast = make("button", ["header__delete-last", "button"]);
        headerDeleteButtonLast.innerText = "Delete last";
        headerDeleteButtonLast.addEventListener("click", () => {
            todoManager.deleteLast();
            this.renderTodos();
        });


        const headerAddButton = make("button", ["header__add-todo", "button"]);
        headerAddButton.innerText = "Add";
        headerAddButton.addEventListener("click", () => {
            const headerInput = document.querySelector(".header__input");
            if (headerInput.value === "") return;

            todoManager.add(headerInput.value, false);
            this.renderTodos();

            headerInput.value = "";
        });

        const secondRow = make("div", "header__row");
        header.append(secondRow);

        const completedText = make("p", "completed__text");
        secondRow.append(completedText);

        const allTodosText = make("p", "all__text");
        secondRow.append(allTodosText);

        const buttonShowAllElement = make("button", ["header__show-all", "button"]);
        buttonShowAllElement.innerText = "Show All";
        buttonShowAllElement.addEventListener("click", () => {
            todoManager.showCompleted = false;
            this.renderTodos();
        });

        secondRow.append(buttonShowAllElement);

        const buttonShowCompletedElement = make("button", [
            "header__show-completed",
            "button",
        ]);
        buttonShowCompletedElement.innerText = "Show Completed";
        buttonShowCompletedElement.addEventListener("click", () => {
            todoManager.showCompleted = true;
            this.renderTodos();
        });

        secondRow.append(buttonShowCompletedElement);

        const searchInput = createInputWithClearButton("header__input-search", "Search...");
        secondRow.append(searchInput);

        searchInput.addEventListener("input", () => {
            this.renderTodos();
        });

        firstRow.append(headerDeleteButton);
        firstRow.append(headerDeleteButtonLast);
        firstRow.append(createInputWithClearButton("header__input", "Enter todo..."));

        firstRow.append(headerAddButton);

        return todoApp;
    },

    generateTodoElement(todo) {
        const todoElement = make("div", "todo");

        if (todo.completed) {
            todoElement.classList.add('todo--completed')
        }

        const todoRowElement = make("div", "todo__row");
        const todoDateElement = make("div", "todo__date");
        todoDateElement.innerText = todo.date;
        todoElement.append(todoRowElement, todoDateElement);

        const todoLabelElement = make("label", "todo__label");
        const buttonElement = make("button", [
            "todo__delete",
            "button--red",
        ]);
        todoRowElement.append(todoLabelElement, buttonElement);

        buttonElement.addEventListener("click", () => {
            todoManager.delete(todo);
            this.renderTodos();
        });

        const edit = make("button", "edit-button");
        todoRowElement.append(edit);

        edit.addEventListener("click", () => {
            todoRowElement.setAttribute("style", "display:none");
            edit.setAttribute("style", "display:none");

            const editInput = make("input", "edit__input");
            editInput.value = todo.label;
            const editButton = make("button", "button-ok");

            todoElement.prepend(editButton);
            todoElement.prepend(editInput);

            editButton.addEventListener("click", () => {
                if (editInput.value === "") return;
                todo.label = editInput.value;
                todoManager.saveToLocalStorage();
                this.renderTodos();

            });
        });

        const checkboxElement = make("input", ["todo__checkbox", "custom-checkbox"], {
            checked: todo.completed,
        });
        checkboxElement.setAttribute("type", "checkbox");
        checkboxElement.addEventListener("change", (event) => {
            todoManager.toggleCompleted(todo, event.target.checked);
            this.renderTodos();
        });

        todoLabelElement.append(checkboxElement);

        const labelText = document.createTextNode(todo.label);
        todoLabelElement.append(labelText);

        return todoElement;
    },

    renderTodos() {

        const completedText = document.querySelector(".completed__text");
        const AllText = document.querySelector(".all__text");
        const secondRow = document.querySelector(".header__row");


        completedText.innerText =
            "Completed: " + todoManager.getCompletedLength();
        secondRow.prepend(completedText);

        AllText.innerText = "All: " + todoManager.todos.length;
        secondRow.appendAllText;

        const todoList = document.querySelector(".todo-list");
        const searchInput = document.querySelector(".header__input-search");

        todoList.innerHTML = "";

        let count = 0;

        for (let todo of todoManager.todos) {
            if (todo.label.toLowerCase().includes(searchInput.value.toLowerCase())) {
                if (!todoManager.showCompleted || todo.completed) {
                    count += 1;
                    todoList.append(this.generateTodoElement(todo));
                };
            };
        };
        if (!count) {
            const noReults = make("div", "noresults");
            noReults.innerText = "No results :(";
            todoList.append(noReults)
        }
    }
};

export {
    UI
};
const root = document.querySelector('#root');
root.append(UI.generationHeader());
UI.renderTodos();