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
       console.log(data)
    }
 
    let allToDos = () => {
   
        let dataObj = {};
        let allData = [];
        for(let i = 0; i < data.length; i++) {
            let key = data.key(i);
           
            let item = JSON.parse( data.getItem(key) );
            item['key'] = key.replace(/["']/g, "");
         
            allData.push(dataObj[key] = item)
            
        }
        
        console.log(dataObj)
        console.log(allData)
    
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



let displayController =  (() => {

    // function getModalState(element) {
    //         if (element == 'block') 
    //             return true
            
    //         else return false
    // }

    // function toggle(element, displayType) {
    //     let isDisplay = getModalState(displayType);
    
    //     if(!isDisplay ) 
    //         element.style.display = 'block';    
    
    //     else 
    //         element.style.display = 'none'; 
    // }

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

    function appendValues(item){

        const title = document.getElementById('title').value = item.title;
        const desc = document.getElementById('description').value = item.description;
        const date = document.getElementById('dueDate').value = item.dueDate;
        const note = document.getElementById('notes').value = item.notes;
        const priority = document.getElementById('high').checked = item.priority;
    }

    function isNewObject() {

        let h1Key = document.getElementsByTagName('#todo-item > h1')[0];
         console.log(h1Key)
        h1Key.getAttribute('key');
       
        console.log(h1Key.getAttribute('key'));
        if(h1Key.getAttribute('key')){
            return true
        }
    
        else return false

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
    function createToDoExpandedView(item){
        const todoModalContainer = document.querySelector("#to-do.form-modal .container");

        //clears modal
        while(todoModalContainer.firstChild) {
            todoModalContainer.removeChild(todoModalContainer.firstChild);
        }
       
        const modalTextTitle = document.createTextNode(item.title);
        const ModalH1 = document.createElement('h1');
        todoModalContainer.append(ModalH1);
        ModalH1.append(modalTextTitle)

        const modalDescription = document.createElement('p');
        modalDescription.append(document.createTextNode(item.description));

        const modalDate = document.createElement('p');
        modalDate.append(document.createTextNode(item.dueDate));

        const modalPriority = document.createElement('p');
        modalPriority.append(document.createTextNode(item.priority));

        const modalStatus = document.createElement('p');
        modalStatus.append(document.createTextNode(item.completed));

        const modalNotes = document.createElement('p');
        modalNotes.append(document.createTextNode(item.notes));

        todoModalContainer.append(modalDescription,modalDate, modalPriority, modalStatus, modalNotes);

        const modalExit = document.createElement('button');
        modalExit.className = 'exit push toggle close-button';


        const modalEdit = document.createElement('button');
        modalEdit.className = 'edit push toggle';
        const modalDelete = document.createElement('button');
        modalDelete.className = 'delete push toggle';
        todoModalContainer.append(modalEdit,modalExit,modalDelete)

       const exitText = document.createTextNode('x');
       const editText = document.createTextNode('edit');
       const deleteText = document.createTextNode('delete');
       modalDelete.append(deleteText);
       modalExit.append(exitText);
       modalEdit.append(editText);

       modalExit.addEventListener('click', () => {
        let formContainer = document.querySelector('#to-do.form-modal');
        
        formContainer.style.display = 'none';
        });

        modalEdit.addEventListener('click', () => {
            
            editTodo(item);
         })
    }

    function editTodo(item){
        let formContainer = document.querySelector('#to-do.form-modal');
        formContainer.style.display = 'none';

        let editContainer = document.getElementById('add-item');
        editContainer.style.display = 'block';

        appendValues(item);

        //grab key values
        //on submit, create new object

    }

    function createToDoSummary(item) {
            
        const mainDiv = document.querySelector('.main');
        const newDiv = document.createElement('div');
        newDiv.className = 'todo-item';
        mainDiv.append(newDiv);
        
        const newLink = document.createElement('button');
        const expandIcon = document.createElement('i');
        expandIcon.className = "fa-solid fa-expand";
     //   expandIcon.append(document.createTextNode('x'))

        const container = document.createElement('div');
        container.className = 'container';
        newDiv.append(container);
        container.append(newLink);
        newLink.append(expandIcon);
        newLink.className = 'expand';

        newLink.addEventListener('click', () => {
            console.log(item.key);
            console.log(item);
            createToDoExpandedView(item);
            
            const todoModal = document.querySelector("#to-do.form-modal");
            todoModal.style.display = 'block';
            

            
        });

        const sidebar = document.createElement('div');
        sidebar.className = 'side';
        newDiv.append(sidebar);

        const newtext = document.createTextNode(`${item.title}`);
        const header = document.createElement("h1");
        header.append(newtext);
        header.setAttribute('key', item.key);
        container.append(header)

        const desc = document.createTextNode(`${item.description}`);
        const descElement = document.createElement("p");

        descElement.append(desc);
        container.append(descElement);

        const dueDate = document.createTextNode(`${item.dueDate}`);
        const dueIcon = document.createElement('i');
        dueIcon.className = "fa-solid fa-calendar-days";
        const dateElement = document.createElement("p");
        
        dateElement.append(dueIcon);
        dateElement.append(dueDate);
        sidebar.append(dateElement);

        let priorityText;
        let iconImage;

        switch(item.priority) {
            case '1': 
                priorityText = 'High'; 
                iconImage = "fa-solid fa-angles-up"
                break;
            
                case '2': 
                priorityText = 'Medium'; 
                iconImage = "fa-solid fa-angle-up"
                break;
            
            default: 
                priorityText = 'Low'; 
                iconImage = "fa-solid fa-angle-down"
                break;
        }

        const priority = document.createTextNode(`${priorityText}`);
        const priorityIcon = document.createElement('i');
        priorityIcon.className = iconImage;
        const priorityElement = document.createElement("p");
        
        priorityElement.append(priorityIcon);
        priorityElement.append(priority);
        sidebar.append(priorityElement);

        let flagText;
        let iconStatus;

        if(item.completed) {
            flagText = "Completed";
            iconStatus = "fa-regular fa-check";
        }
        else {
            flagText = 'WIP';
            iconStatus = "fa-solid fa-clock";
        }

        const completedIcon = document.createElement('i');
        completedIcon.className = iconStatus;


        const completionStatus = document.createTextNode(`${flagText}`);
        const completedElement = document.createElement("p");
        completedElement.append(completedIcon);
        completedElement.append(completionStatus);
        
        sidebar.append(completedElement);

    }
   
   let displayAllActiveToDos = () => {
        let activeItems = storageModel.activeToDo();


        activeItems.forEach((item) => {
            createToDoSummary(item);
        })
    }

   
  

    let addButton = document.querySelector('.add-item');
        addButton.addEventListener('click', () => {
             let formContainer = document.querySelector('#add-item.form-modal');
             
             formContainer.style.display = 'block';
             
        })
    

    let exitButton = document.querySelector('.close-button');
        exitButton.addEventListener('click', () => {
             let formContainer = document.querySelector('#add-item.form-modal');
             formContainer.style.display = 'none';
             clearAllInputValues();
             hideAllErrorValidation();
             
        })
   
    
    
   
   let submit = document.querySelector('.submit');
    submit.addEventListener('click', () => {
       
        let isValid = validateForm(); 
        //is subimtting with errors
        if(isValid) {
            getFormValues();

            clearAllInputValues();

            //removes all ti=o dos on main screen
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