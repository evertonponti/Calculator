class CalculatorController{
    
    constructor(){
        this._locale = 'pt-BR';
        this._operation = [];
        this._initialDisplayCalculator = document.querySelector('#display');
        this._initialDate = document.querySelector('#data');
        this._initialTime = document.querySelector('#hora');
        this._currentDate;

        this.initialize();
        this.initButtonsEvents();
    }

    initialize(){
        this.setDisplayDateTime();

        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);
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
                this.sum();
                break;
            case 'subtracao':
                this.sum();
                break;
            case 'divisao':
                this.sum();
                break;
            case 'multiplicacao':
                this.sum();
                break;
            case 'porcento':
                this.sum();
                break;
            case 'igual':
                this.sum();
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
    }

    clearEntry(){
        this._operation.pop();
    }

    addOperation(value){
        this._operation.push(value);
        console.log(this._operation);
    }

    setError(){
        this.displayCalculator = 'Error';
    }
}