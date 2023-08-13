class Calculator{
    constructor(poTextElement,coTextElement){
        this.poTextElement=poTextElement
        this.coTextElement=coTextElement
        this.clear()
    }


clear() {
    this.currOp = ''
    this.prevOp=''
    this.operation=undefined

    this.coTextElement.innerText = this.currOp
    this.poTextElement.innerText=this.prevOp
}

delete(){
    if(this.currOp === '')this.prevOp=this.prevOp.toString().slice(0,-1)
    this.currOp=this.currOp.toString().slice(0,-1)
}

appendNum(number){
    if(number === '.' && this.currOp.includes('.')) return
    this.currOp = this.currOp.toString() + number.toString()
}

chooseOperation(operation){
    if(this.currOp === '')return
    if(this.prevOp !== '') {this.compute()}
    this.operation=operation
    this.prevOp=this.currOp
    this.currOp=''
}

compute(){
    let result
    const pOp=parseFloat(this.prevOp)
    const cOp=parseFloat(this.currOp)

    switch (this.operation){
        case '+' :
            result=pOp+cOp
            break;
        case '-' :
            result=pOp-cOp
            break;
        case '*' :
            result=pOp*cOp
            break;
        case '/' :
            result=pOp/cOp
            break;
        case 'default' :
            return
    }
this.currOp=result
this.operation=undefined
this.prevOp=''

}

updateDisplay(){
    this.coTextElement.innerText = this.currOp
    if(this.operation != null)
    this.poTextElement.innerText = `${this.prevOp} ${this.operation}`
    
}
}

const numBtn=document.querySelectorAll('[data-val]')
const opBtn=document.querySelectorAll('[data-op]')
const eqBtn=document.querySelector('[data-eq]');
const delBtn=document.querySelector('[data-del]');
const acBtn=document.querySelector('[data-ac]');

const poTextElement=document.querySelector('[data-prev-op]');
const coTextElement=document.querySelector('[data-curr-op]');

const calculator = new Calculator(poTextElement,coTextElement)

delBtn.addEventListener('click',button =>{
    calculator.delete()
    calculator.updateDisplay()
})

numBtn.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })
})

acBtn.addEventListener('click',button=>{
    calculator.clear()
})

opBtn.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

eqBtn.addEventListener('click',button=>{
    calculator.compute()
    calculator.updateDisplay()
})