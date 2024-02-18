//const { parseJSON } = require("date-fns");

let storageModel = (() => {
    let data = localStorage;
    
    console.log(data)
    
    //to create item in local storage, needs to be a string (stringify)
    //use parse to retrieve from storage and store as obj
    function createToDo(item) {
        let id = crypto.randomUUID();
        console.log(item)
        data.setItem(`'${id}'`, JSON.stringify({
            title: item.title,
            description: item.description,
            dueDate: item.dueDate,         
            priority: item.priority,
            completed: item.completed,
            notes: item.note
        }
        ));
       
    }
 
    function updateToDo(item){
      //  let existingItem = data.parse.getItem(item.key);
       console.log(item)
        let existingItem = JSON.parse(data.getItem(JSON.stringify(item.key)));
        
        existingItem = {
            title:item.title,
            description:item.description,
            dueDate: item.dueDate,         
            priority: item.priority,
            completed: item.completed,
            notes: item.note
        };

      
        
        data.setItem(JSON.stringify(item.key), JSON.stringify(existingItem));
    }

    //     key: item.key,
    // title: item.name,
    // desscription: item.desc,
    // dueDate: item.date,         
    // priority:item.priorityLevel,
    // completed: item.isDone,
    //  note: item.note


    //}

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
        
        function filterByActiveStatus(item) {
            if (!item.completed )
                return true

            else return false
        }

        const allActiveArray =  data.filter(filterByActiveStatus);

        return allActiveArray;
    }
 
    return {
        createToDo,
        updateToDo,
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
       
        let title = document.getElementById('title')
        title.value = item.title;
        title.setAttribute('key',item.key);
        document.getElementById('description').value = item.description;
        document.getElementById('dueDate').value = item.dueDate;
        document.getElementById('notes').value = item.notes;
        let identifier;
        switch (item.priority) {
            case '1':
                identifier = 'high';
                break
            case '2':
                identifier = 'medium';
                break
            default:
                identifier = 'low';
                break
        }
        document.getElementById(identifier).checked = true;
        
    }

    function getFormValues() {
        let key;
        
       const title = document.getElementById('title');
       if (title.getAttribute != null) {
             key = title.getAttribute('key');
       }
       else {key = ''}

        const titleVal = document.getElementById('title').value;
        const desc = document.getElementById('description').value;
        const date = document.getElementById('dueDate').value;
        const note = document.getElementById('notes').value;
        const priority = document.querySelector('input[name=priority]:checked').value;
        return {
            key:key,
            title:titleVal,
            description:desc, 
            dueDate: date,
            priority:priority,
            completed:false,
            note:note
        }; 
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
            
            updateTodo(item);
         })
    }

    function updateTodo(item){
        let formContainer = document.querySelector('#to-do.form-modal');
        formContainer.style.display = 'none';

        let editContainer = document.getElementById('add-item');
        editContainer.style.display = 'block';
        appendFormTitle('Edit To Do')
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

   
    function appendFormTitle(titleName){
        let formContainer = document.querySelector('#add-item.form-modal');
        
        let text = document.querySelector('.form-title');
        text.innerHTML = '';
        let title = document.createTextNode(titleName);
        text.append(title);
    }

    let addButton = document.querySelector('.add-item');
        addButton.addEventListener('click', () => {
            let formContainer = document.querySelector('#add-item.form-modal');
             
            formContainer.style.display = 'block';

            appendFormTitle('Create New To Do');
             
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
            let item = getFormValues();

console.log(item)
            if (item.key =='' || item.key == null) { 
              

              storageModel.createToDo(
                {title: item.title,
                    description: item.description,
                    dueDate: item.dueDate,         
                    priority:item.priority,
                    completed: item.completed,
                    note: item.note
                });
               
            }
            else{
                storageModel.updateToDo({ 
                    key: item.key,
                    title: item.title,
                    description: item.description,
                    dueDate: item.dueDate,         
                    priority:item.priority,
                    completed: item.completed,
                    note: item.note
                 });
            }
            
            

            let formContainer = document.querySelector('#add-item.form-modal');
        
            formContainer.style.display = 'none';
            clearAllInputValues();

            //removes all to dos on main screen
            document.querySelectorAll(".todo-item").forEach(el => el.remove());
            
            displayAllActiveToDos();
        }
    });
    
    return {
        displayAllActiveToDos
    }
})(); //displayController() => 


let helperFunctions = () => {

    
}

displayController.displayAllActiveToDos();
