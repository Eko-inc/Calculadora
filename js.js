//Constants ill use to identify my main scripts of the project, for the button and the calc
const startButton = document.getElementById('startButton');
    const calculator = document.getElementById('calculator');

    //so i can hide the button when its pressed, with a delay to it blends with calc
    startButton.addEventListener('click', function() {
        startButton.classList.add('hidden');
        setTimeout(() => {
            calculator.classList.add('active');
            startButton.style.display = 'none';
        }, 500); 
    });

    let currentInput = "";
    let operator = "";
    let firstOperand = "";
    let resultDisplayed = false;
    let history = [];


    //code for operations + errors if there are any and history
    function appendNumber(number) {
        if (resultDisplayed) {
            currentInput = number;
            resultDisplayed = false;
        } else {
            currentInput += number;
        }
        updateDisplay(currentInput);
    }

    function appendOperator(op) {
        if (currentInput === "" && op === "-") {
            currentInput = "-";
            updateDisplay(currentInput);
            return;
        }
        if (firstOperand === "") {
            firstOperand = currentInput;
            currentInput += " " + op + " "; 
        } else {
            currentInput += " " + op + " ";
        }
        operator = op;
        updateDisplay(currentInput);
    }

    function calculate() {
        if (firstOperand === "" || currentInput === "" || operator === "") {
            return;
        }

        let expression = currentInput.trim();
        let result;

        try {
            result = eval(expression); 
        } catch (error) {
            updateDisplay("Error");
            return;
        }

        if (operator === "/" && expression.includes("/ 0")) {
            updateDisplay("Error: Division by 0");
            return;
        }

        addToHistory(expression + " = " + result);
        firstOperand = result.toString();
        operator = "";
        currentInput = result.toString();
        resultDisplayed = true;
        updateDisplay(currentInput);
    }

    function addToHistory(entry) {
        history.push(entry);
        updateHistoryPanel();
    }

    function updateHistoryPanel() {
        const historyPanel = document.getElementById("history");
        historyPanel.innerHTML = "<strong>History:</strong><br>" + history.slice(-5).join("<br>");
    }

    function clearDisplay() {
        currentInput = "";
        firstOperand = "";
        operator = "";
        updateDisplay("0");
    }

    function updateDisplay(value) {
        document.getElementById("display").innerText = value;
    }