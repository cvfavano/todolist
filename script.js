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
   let createToDo = (arr) => { 
        saveItem({
            title: arr[0],
            description: arr[1],
            dueDate: arr[2],
            notes: arr[3],
            priority: arr[4],
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

    
 


    console.log(localStorage.getItem(localStorage.key('6161fac8-37e3-4e45-b01c-3eba7bba9802')));

    return {
    //    toDoList,
       // saveItem,
        createToDo
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
    let submitButton = document.querySelector('.submit');
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
         values = [];
       
        allFormInput.forEach((element) => {
            if(element != 'priority')
                values.push(document.getElementById(element).value);
            

            else {
                let priority =  document.getElementsByName('priority'); //nodelist
                for(var i = 0; i < priority.length; i ++) {
                    if(priority[i].checked) 
                        values.push(priority[i].value); 
                }
            }
       
            return values;
        })
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
   
   
    toggleButton.forEach((button) => button.addEventListener('click', () => {

        formContainer = document.getElementById('add-item');
        let isDisplayType = window.getComputedStyle(formContainer).display;
        toggle(formContainer, isDisplayType);
   
    }));
    
    submitButton.addEventListener('click', () => {
        //check values for empties

        validateForm();
        getFormValues()
        storageModel.createToDo(values);
        


        clearAllInputValues();
        values = [];
        // get item and sent to storage
    });
      
    return {

    }
})(); //displayController() => 


//storageModel.toDoList();
