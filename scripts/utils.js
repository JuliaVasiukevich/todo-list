const createInputWithClearButton = (classNameInput, placeholderName) => {
    const commonInput = make("div", "input__common");
    const input = make("input", classNameInput);
    const clearButton = make("button", "button__clear");
    input.placeholder = placeholderName;

    clearButton.addEventListener('click', () => {
        input.value = "";
    });

    commonInput.append(input);
    commonInput.append(clearButton);

    return commonInput;
};

const make = (tagName, classNames, attributes) => {
    const element = document.createElement(tagName);

    if (typeof classNames === "string") {
        element.classList.add(classNames);
    } else {
        element.classList.add(...classNames);
    }

    for (let attributeName in attributes) {
        element[attributeName] = attributes[attributeName];
    }

    return element;
};

export {make, createInputWithClearButton};