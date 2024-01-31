const storageModel = (() => {

    let toDoList = () => {
        if(typeof(Storage) !== 'undefined') {
            //run program
            //console.log('let\'s go');
        }
        else {
            console.log('something went wrong');
        }
    
        var data = localStorage;
    
        data.setItem('greeting', 'hello');
        //console.log(data.greeting);
    }

    return {
        toDoList
    }

})() // storageModel() => toDoList



//map
//const obj = {'x': 1, 'y': 2, 'z':3};
//const result = Object.entries(obj).map(entry => `${entry[0]} ${entry[1]}`);
//(3) ["x 1", "y 2", "z 3"]

//


//gui object --> stringify KVP --> toJSON and make in to and object

//unstringofy directly back to object

//create an onclick event for add item

var displayController =  (() => {

    let formContainer;
    let toggleButton = document.querySelectorAll('.toggle');
    let submitButton = document.querySelector('.submit');

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

    let allFormInput = ['title','description', 'dueDate', 'notes'];
    function clearAllInputValues(formElements){

        formElements.forEach(element => {
            document.getElementById(element).value = '';
        })
    }
    function checkValue(element) {
       
        let currentElement = document.querySelector(`#${element}`);

        if(currentElement.value == "") {
            //display validation
            return false;
        }

        else {
            return true;
            
            
        }
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

            clearAllInputValues(allFormInput);

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
       
        // get item and sent to storage
    });
      
    return {
     
    }
})(); //displayController() => 


storageModel.toDoList();
