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

    let button = document.querySelectorAll('.toggle');
    let isDisplayType;
    let formContainer;

    function getModalState(element) {
            if (element == 'block') 
                return true
            
            else return false
    }

    function toggle() {
        let isDisplay = getModalState(isDisplayType);
    
        if(!isDisplay ) 
            formContainer.style.display = 'block';    
    
        else 
            formContainer.style.display = 'none'; 
    }

    button.forEach((element) => element.addEventListener('click', () => {

        formContainer = document.getElementById('add-item');
        isDisplayType = window.getComputedStyle(formContainer).display;
        toggle();
   
    }));
    
      
    return {
     
    }
})(); //displayController() => 


storageModel.toDoList();
