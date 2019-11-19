class CalculatorController{
    
    constructor(){
        this._locale = 'pt-BR';
        this._operation = [];
        this._initialDisplayCalculator = document.querySelector('#display');
        this._initialDate = document.querySelector('#data');
        this._initialTime = document.querySelector('#hora');
        this._lastOperator = '';
        this._lastNumber = '';
        this._currentDate;

        this.initialize();
        this.initButtonsEvents();
        this.initKeyboardEvents();
    }

    initialize(){
        this.setDisplayDateTime();

        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);

        this.setLastNumberToDisplay();
    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: '2-digit',
            month: 'long', //short
            year: 'numeric'
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime(){
        return this._initialTime.innerHTML;
    }

    set displayTime(value){
        this._initialTime.innerHTML = value;
    }

    get displayDate(){
        return this._initialDate.innerHTML;
    }

    set displayDate(value){
        this._initialDate.innerHTML = value;
    }

    get displayCalculator(){
        return this._initialDisplayCalculator.innerHTML;
    }

    set displayCalculator(value){
        this._initialDisplayCalculator.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }

    initButtonsEvents(){
        let buttons = document.querySelectorAll('#buttons > g, #parts > g');

        buttons.forEach((button, index) => {
            this.addEventListenerAll(button, 'click drag', e => {
                let textButton = button.className.animVal.replace('btn-', '');

                this.executeButton(textButton);
            });
            
            this.addEventListenerAll(button, 'mouseover mouseup mousedown', e => {
                button.style.cursor = 'pointer';
            });
        });

    }

    initKeyboardEvents(){
        document.addEventListener('keyup', event => {
            switch (event.key) {
                case 'Escape':
                    this.clearAll();
                    break;
                case 'Backspace':
                    this.clearEntry();
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    this.addOperation(event.key);
                    break;
                case 'Enter':
                case '=':
                    this.calc();
                    break;
                case '.':
                case ',':
                    this.addDot();
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperation(parseInt(event.key));
                    break;
            }
        });
    }

    addEventListenerAll(element, events, fn){
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    executeButton(value){
        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                this.calc();
                break;
            case 'ponto':
                this.addDot();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break;
        }
    }

    clearAll(){
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';

        this.setLastNumberToDisplay();
    }

    clearEntry(){
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    addOperation(value){
        if (isNaN(this.getLastOperation())){
            if(this.isOperator(value)){
                this.setLastOperation(value);
            }else{
                this.pushOperation(value);
                this.setLastNumberToDisplay();
            }
        }else{
            if(this.isOperator(value)){
                this.pushOperation(value);
            }else{
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue);

                this.setLastNumberToDisplay();
            }
        }
        console.log(this._operation);
    }

    addDot(){
        let lastOperation = this.getLastOperation();

        if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

        if(this.isOperator(lastOperation) || !lastOperation){
            this.pushOperation('0.');
        }else{
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();
    }

    getLastOperation(){
        return this._operation[this._operation.length - 1];
    }

    setLastOperation(value){
        this._operation[this._operation.length - 1] = value;
    }

    pushOperation(value){
        this._operation.push(value);

        if(this._operation.length > 3){
            this.calc();
        }else{
            
        }
    }

    isOperator(value){
        return (['+','-','/','*','%'].indexOf(value) > -1);
    }

    setError(){
        this.displayCalculator = 'Error';
    }

    getResult(){
        return eval(this._operation.join(''));
    }

    calc(){
        let last;

        this._lastOperator = this.getLastItem();

        if(this._operation.length < 3){
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }else if(this._operation.length > 3){
            last = this._operation.pop();
            this._lastNumber = this.getResult();
        }else if(this._operation.length == 3){
            this._lastNumber = this.getLastItem(false);
        }

        let result = this.getResult();

        if(last == '%'){
            result /= 100;
            this._operation = [result];
        }else{
            this._operation = [result];

            if(last) this._operation.push(last);
        }

        this.setLastNumberToDisplay();
    }

    setLastNumberToDisplay(){
        let lastNumber = this.getLastItem(false);

        if(!lastNumber) lastNumber = 0;

        this.displayCalculator = lastNumber;
    }

    getLastItem(isOperator = true){
        let lastItem;

        for(let i = this._operation.length -1; i >= 0; i--){
            if(this.isOperator(this._operation[i]) == isOperator) {
                lastItem = this._operation[i];
                break;
            }
        }

        if(!lastItem) lastItem = (isOperator) ? this._lastOperator : this._lastNumber;

        return lastItem;
    }
}