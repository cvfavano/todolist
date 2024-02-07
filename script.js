//const { parseJSON } = require("date-fns");

let storageModel = (() => {
    let data = localStorage;
    
    let createToDo = (name, desc, date, priorityLevel, isDone, note) => { 
        saveItem({
            title: name,
            description: desc,
            dueDate: date,         
            priority: priorityLevel,
            completed: isDone,
            notes: note
        }) ;
    }
    
    function saveItem(item) {
        let id = crypto.randomUUID();
        
        data.setItem(`'${id}'`, JSON.stringify(
            item
        ));
       // console.log(JSON.parse(data))
    }
 
    let allToDos = () => {
   
        let data = {};
        let allData = [];
        for(let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let item = JSON.parse( localStorage.getItem(key) );
         
            allData.push(data[key] = item)
            
        }
        
        
    
        return allData;
    }

    //filtered todos

    let activeToDo = () => {
        let data = allToDos();
        
       console.log(data)

        
        function filterByActiveStatus(item) {
           // console.log(item.completed)
            if (!item.completed )
                return true

            else return false
        }

        const allActiveArray =  data.filter(filterByActiveStatus);

        console.log(allActiveArray);
        return allActiveArray;
    }
 
    return {
    //    toDoList,
       // saveItem,
        createToDo,
        allToDos,
        activeToDo
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

   
    function clearAllInputValues(){

        const title = document.getElementById('title').value = '';
        const desc = document.getElementById('description').value = '';
        const date = document.getElementById('dueDate').value = '';
        const note = document.getElementById('notes').value = '';
        const priority = document.getElementById('high').checked = true;
    }
    function getFormValues() {
       
        const title = document.getElementById('title').value;
        const desc = document.getElementById('description').value;
        const date = document.getElementById('dueDate').value;
        const note = document.getElementById('notes').value;
        const priority = document.querySelector('input[name=priority]:checked').value;
        storageModel.createToDo(title,desc,date,priority,false,note); 
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
           // return false;
        }
        if(!descCheck ) {
            displayError('description');
           // return false;
        }
        if(!dateCheck ) {
            displayError('dueDate');
           // return false;
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
            return true;
        }
        return false;
    }
   
   let displayAllActiveToDos = () => {
        let activeItems = storageModel.activeToDo();
   

        activeItems.forEach((item) => {
            const mainDiv = document.querySelector('.main');
            const newDiv = document.createElement('div');
           newDiv.className = 'todo-item';
            mainDiv.append(newDiv);

            const newtext = document.createTextNode(`${item.title}`);
            const header = document.createElement("h1");
            header.append(newtext);
            newDiv.append(header)

            const desc = document.createTextNode(`${item.description}`);
            const descElement = document.createElement("p");

            descElement.append(desc);
            newDiv.append(descElement);

            const dueDate = document.createTextNode(`Due: ${item.dueDate}`);
            const dateElement = document.createElement("p");
            
            dateElement.append(dueDate);
            newDiv.append(dateElement);

            let priorityText ;
            switch(item.priority) {
            case '1': priorityText = 'High'; break;
            case '2': priorityText = 'Medium'; break;
            default: priorityText = 'Low'; break;
            }
            const priority = document.createTextNode(`Priority: ${priorityText}`);
            const priorityElement = document.createElement("p");
            
            priorityElement.append(priority);
            newDiv.append(priorityElement);

            let flagText;
            if(item.completed) {
                flagText = "Done!"
                
            }
            else flagText = 'WIP';


            const completionStatus = document.createTextNode(`${flagText}`);
            const completedElement = document.createElement("p");
            const completedDiv = document.createElement('div');
            completedElement.append(completionStatus);
            newDiv.append(completedDiv);
            completedDiv.append(completedElement);
            completedDiv.className = 'flag';
        //    paragraph.className = 'child-item'
        })
   }

    toggleButton.forEach((button) => button.addEventListener('click', () => {
        formContainer = document.getElementById('add-item');
        let isDisplayType = window.getComputedStyle(formContainer).display;
        toggle(formContainer, isDisplayType);
   
    }));
    
    submit.addEventListener('click', () => {
       
        let isValid = validateForm(); 
        //is subimtting with errors
        if(isValid) {
            getFormValues();

            clearAllInputValues();
            document.querySelectorAll(".todo-item").forEach(el => el.remove());
            displayAllActiveToDos();
        }
    });
      
    return {
        displayAllActiveToDos
    }
})(); //displayController() => 


let helperFunctions = () => ({


})()
   displayController.displayAllActiveToDos();


