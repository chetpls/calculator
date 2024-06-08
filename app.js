// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get reference to the display elements
    const mainDisplay = document.querySelector('.main-display');
    const secondaryDisplay = document.querySelector('.secondary-display');

    let firstNumber = '';
    let secondNumber = '';
    let operator = '';
    let resultDisplayed = false;

    // Get references to all buttons
    const buttons = document.querySelectorAll('button');

    // Add event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the clicked button's value
            const buttonValue = button.textContent;

            // Check the button's id to determine its functionality
            switch (button.id) {
                case 'clear':
                    clearDisplay();
                    break;
                case 'sqroot': // Change paranthese to sqrt
                    handleSquareRoot();
                    break;
                case 'percent':
                    handlePercentage();
                    break;
                case 'divide':
                case 'multiply':
                case 'subtract':
                case 'add':
                    handleOperator(button.id);
                    break;
                case 'equal':
                    secondNumber = mainDisplay.value;
                    calculate();
                    break;
                case 'sign':
                    toggleSign();
                    break;
                default:
                    if (resultDisplayed) {
                        mainDisplay.value = buttonValue;
                        resultDisplayed = false;
                    } else {
                        updateMainDisplay(buttonValue);
                    }
            }
        });
    });

    // Function to update the main display
    function updateMainDisplay(value) {
        // Update the main display with the value
        mainDisplay.value += value;
    }

    // Function to update the secondary display
    function updateSecondaryDisplay() {
        // Update the secondary display with the first number and operator
        secondaryDisplay.value = firstNumber + ' ' + operatorToSymbol(operator);
        mainDisplay.value = '';
    }

    // Function to clear both displays
    function clearDisplay() {
        // Clear both displays
        mainDisplay.value = '';
        secondaryDisplay.value = '';
        firstNumber = '';
        secondNumber = '';
        operator = '';
        resultDisplayed = false;
    }

    // Function to handle the square root
    function handleSquareRoot() {
        firstNumber = mainDisplay.value;
        let result = Math.sqrt(Number(firstNumber));
        mainDisplay.value = result;
        secondaryDisplay.value = `√${firstNumber}`;
        resultDisplayed = true;
    }

    // Function to handle the percentage
    function handlePercentage() {
        firstNumber = mainDisplay.value;
        let result = Number(firstNumber) / 100;
        mainDisplay.value = result;
        secondaryDisplay.value = `${firstNumber}%`;
        resultDisplayed = true;
    }

    // Function to handle operators
    function handleOperator(op) {
        firstNumber = mainDisplay.value;
        operator = op;
        updateSecondaryDisplay();
    }

    // Function to calculate the result
    function calculate() {
        let result = evaluateExpression();
        mainDisplay.value = result;
        secondaryDisplay.value = '';
        firstNumber = '';
        secondNumber = '';
        operator = '';
        resultDisplayed = true;
    }

    // Function to toggle the sign of the number
    function toggleSign() {
        // Get the current value of the main display
        let currentValue = mainDisplay.value;

        // Toggle the sign of the number
        if (currentValue.startsWith('-')) {
            mainDisplay.value = currentValue.substring(1);
        } else {
            mainDisplay.value = '-' + currentValue;
        }
    }

    // Function to evaluate mathematical expression without using eval
    function evaluateExpression() {
        const num1 = Number(firstNumber);
        const num2 = Number(secondNumber);
        switch (operator) {
            case 'divide':
                return num1 / num2;
            case 'multiply':
                return num1 * num2;
            case 'subtract':
                return num1 - num2;
            case 'add':
                return num1 + num2;
            default:
                return 0;
        }
    }

    // Function to convert operator to symbol
    function operatorToSymbol(operator) {
        switch (operator) {
            case 'divide':
                return '÷';
            case 'multiply':
                return '×';
            case 'subtract':
                return '-';
            case 'add':
                return '+';
            default:
                return '';
        }
    }
});
