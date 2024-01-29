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
    console.log(button);
    button.forEach((element) => element.addEventListener('click', function() {
       
        let formContainer = document.getElementById('add-item');
         isDisplayType = window.getComputedStyle(formContainer).display;
        console.log(isDisplayType)
        
        function getModalState(element) {
            if (element == 'block') 
                return true
            
            else return false
        }
    
        
      //  console.log(isDisplay)
       function toggle() {

            var isDisplay = getModalState(isDisplayType);
        if(!isDisplay ) {
            formContainer.style.display = 'block'; 
            console.log({'1': isDisplay});
        }
        else {
            
            formContainer.style.display = 'none'; 
            console.log({2:isDisplay});
        }   
    }
     
    toggle();
    }));
    
      
    return {
      //  toggle
    }
})(); //displayController() => toggle for now


storageModel.toDoList();
