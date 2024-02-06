

let storageModel = (() => {
    let data = localStorage;
    
   // let toDoList = () => {
     //   if(typeof(Storage) !== 'undefined') {
            //run program
            //console.log('let\'s go');
       //     data = localStorage;
       // }
       // else {
         //   console.log('something went wrong');
       // }
   // }
   let createToDo = (name, desc, date, priorityLevel, isDone, note) => { 
        saveItem({
            title: name,
            description: desc,
            dueDate: date,
            notes: note,
            priority: priorityLevel,
            completed: isDone
        }) ;
    }
    
    function saveItem(item) {
        let id = crypto.randomUUID();
        
        data.setItem(`'${id}'`, JSON.stringify(
            item
        ));
       // console.log(JSON.parse(data))
    }
    //data.setItem('greeting', 'hello');
        //console.log(data.greeting);
    //        removeItem() : Remove an item from localStorage. clear() : Clear all data from localStorage.

        // Object example

    let allToDos = () => {
        console.log(localStorage)
        return localStorage;
    }
 


    console.log(localStorage.getItem(localStorage.key('6161fac8-37e3-4e45-b01c-3eba7bba9802')));

    return {
    //    toDoList,
       // saveItem,
        createToDo,
        allToDos
    }

})() // storageModel() => toDoList, saveItem, createToDo



//map
//const obj = {'x': 1, 'y': 2, 'z':3};
//const result = Object.entries(obj).map(entry => `${entry[0]} ${entry[1]}`);
//(3) ["x 1", "y 2", "z 3"]

//


//gui object --> stringify KVP --> toJSON and make in to and object

//unstringofy directly back to object

//create an onclick event for add item

let displayController =  (() => {

    let formContainer;
    let toggleButton = document.querySelectorAll('.toggle');
    let submit = document.querySelector('.submit');
   //let todoForm = document.
//maybe a factory function here 
/*    function createToDoItem (name) {
        const name = name;
        let showError = false;
        return {name, showError}
    }
*/

    function getModalState(element) {
            if (element == 'block') 
                return true
            
            else return false
    }

    function toggle(element, displayType) {
        let isDisplay = getModalState(displayType);
    
        if(!isDisplay ) 
            element.style.display = 'block';    
    
        else 
            element.style.display = 'none'; 
    }

    function displayError(element){
        document.getElementById(`validation-error-${element}`).style.display = 'block';
    }

    function hideError(element){
        document.getElementById(`validation-error-${element}`).style.display = 'none';
    }

    function hideAllErrorValidation() {
          //maybe foreach through the array
        document.getElementById('validation-error-title').style.display = 'none';
        document.getElementById('validation-error-description').style.display = 'none';
        document.getElementById('validation-error-dueDate').style.display = 'none';
    }

    let allFormInput = ['title','description', 'dueDate',  'notes', 'priority'];
    
    function clearAllInputValues(){

        allFormInput.forEach(element => {
            if(element != 'priority')
            document.getElementById(element).value = '';

            else {
               document.getElementsByName('priority')[0].value = 'checked';
            }
        })
    }
    function getFormValues() {
       
        const title = document.getElementById('title').value;
        const desc = document.getElementById('description').value;
        const date = document.getElementById('dueDate').value;
        const note = document.getElementById('notes').value;
        const priority = document.getElementsByName('priority').checked.value;
       
        storageModel.createToDo(title,desc,date,priority,note,false); 
    }
    
    function checkValue(element) {
       
        let currentElement = document.querySelector(`#${element}`);

        if(currentElement.value == "") 
            //display validation
            return false;

        else 
            return true;
    }

    function validateForm() {

        //maybe foreach through the array
        let titleCheck = checkValue('title');
        let descCheck = checkValue('description');
        let dateCheck = checkValue('dueDate');

        if(!titleCheck ) {
            displayError('title');
        }
        if(!descCheck ) {
            displayError('description');
        }
        if(!dateCheck ) {
            displayError('dueDate');
        }
        if(titleCheck)
            hideError('title');

        if(descCheck)
            hideError('description')
        if(dateCheck)
            hideError('dueDate')

        if (titleCheck && descCheck && dateCheck) {
            hideAllErrorValidation();

            let isDisplayType = window.getComputedStyle(formContainer).display;
            toggle(formContainer, isDisplayType);
        }
    }
   
   function displayAllToDos() {
    let data = storageModel.allToDos();
    console.log(data)
    let container = document.getElementById('container');
   }

    toggleButton.forEach((button) => button.addEventListener('click', () => {

        formContainer = document.getElementById('add-item');
        let isDisplayType = window.getComputedStyle(formContainer).display;
        toggle(formContainer, isDisplayType);
   
    }));
    
    submit.addEventListener('click', () => {
       
        validateForm();
        getFormValues()

        clearAllInputValues();
        displayAllToDos();
        // get item and sent to storage
    });
      
    return {

    }
})(); //displayController() => 


//storageModel.toDoList();
