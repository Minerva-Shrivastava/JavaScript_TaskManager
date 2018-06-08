var tasksList = {
    tasks : [] ,
    addTasks : function(taskTitle,taskDate){
        this.tasks.push({
            name: taskTitle.value,
            date: taskDate.value,
            status: false
        });
        view.displayTasks(tasksList.tasks);
    },
    
    deleteByIndex : function (index){
        tasksList.tasks.splice(index,1);
        console.log(tasksList.tasks[index]);
    },
     
    changeStatusByIndex : function (index){
        tasksList.tasks[index].status = !tasksList.tasks[index].status;
        console.log(tasksList.tasks[index]);
    
    }
    
    
}

var controller = {
    
    add : function (){
        var taskTitle = document.getElementById("taskTitle");
        var taskDate = document.getElementById("taskDate");
        if(taskTitle.value === "" || taskDate.value === ""){
            alert("please give complete task details")
        }
        else{
            tasksList.addTasks(taskTitle,taskDate);
        }
    },
    
    delete : function () {
     var checkboxes = document.getElementsByName("checkbox");
     for (index = checkboxes.length-1 ; index >= 0 ; index--){
         if(checkboxes[index].checked){
            tasksList.deleteByIndex(index);
         }}
        view.displayTasks(tasksList.tasks);
    },
    
    filterTasks : function (){
        var filterCriteria = document.getElementById("filterOption");
        console.log(filterCriteria.value);
        if(filterCriteria.value === "IN-PROGRESS"){
           var tasks = tasksList.tasks.filter(checkTasksInProgress);
            view.displayTasks(tasks);
        }
        if(filterCriteria.value === "COMPLETED"){
           var tasks = tasksList.tasks.filter(checkTasksCompleted);
            view.displayTasks(tasks);
        }
        if(filterCriteria.value === "ALL"){
            view.displayTasks(tasksList.tasks);
        }
        function checkTasksCompleted(task) {
            return task.status==true ;
        }
        function checkTasksInProgress(task) {
            return task.status==false ;
        }
    },
    
    
    changeStatus : function (){
    var checkboxes = document.getElementsByName("checkbox");
     for (index = 0 ; index<checkboxes.length ; index ++){
         if(checkboxes[index].checked){
            tasksList.changeStatusByIndex(index);
         }}
        view.displayTasks(tasksList.tasks);
    },
    
    
    multiSelect: function (){
        var checkboxes = document.getElementsByName("checkbox");
        var multiselectCheck = document.getElementById("multipleSelect");
       if(multiselectCheck.checked){
        for (index = checkboxes.length-1 ; index >= 0 ; index--){
                checkboxes[index].checked = true;
            }
       }
        else{
            for (index = checkboxes.length-1 ; index >= 0 ; index--){
                checkboxes[index].checked = false;
            }
        }
            
    }  
}

var view = {
    displayTasks : function (tasks){
        var viewElement =  document.getElementById("tasksview");
        viewElement.innerHTML="";
        viewElement = this.createTableHeader(viewElement);
        var index=0;
        var taskArray = tasks;
      
        for(index=0;index<taskArray.length;index++){

            var tr = document.createElement("tr");

            var checkbox = view.createCheckBox();
            checkbox.setAttribute("id",index);
            checkbox.setAttribute("name","checkbox");

            var checkBoxElement = document.createElement("td");
            checkBoxElement.appendChild(checkbox);

            var titleElement = document.createElement("td");
            titleElement.append(taskArray[index].name);

            var dateElement = document.createElement("td");
            var taskDueStatus = this.findTaskStatus(taskArray[index].date);
            dateElement.append(taskDueStatus);

            var statusElement = document.createElement("td");
            var taskStatus = this.completeStatus(taskArray[index].status);
            statusElement.append(taskStatus);

            tr.appendChild(checkBoxElement);
            tr.appendChild(titleElement);
            tr.appendChild(dateElement);
            tr.appendChild(statusElement);

            viewElement.appendChild(tr);
        }      
    },
    
    
    findTaskStatus : function (input) {
        var inputDate = new Date(input);
        var today = new Date();
        var message ="";
        console.log("Today's date : "+today.getTime()+" input date :  "+inputDate.getTime());

        if(inputDate.getDate() === today.getDate()){
            message = "Due Today";
        }else if(inputDate.getTime() > today.getTime()){
            var daysLeft = inputDate.getDate() - today.getDate();
            message = daysLeft+" Days Due";
        }else{
            message = "OverDue";
        }
    return message;

    },
    
    completeStatus : function(status){
        var message = "";
        if(status == false){
            message = "In Progress";
        }
        else{
            message = "Completed";
        }
        return message ;
    },
    
    createTableHeader : function (viewElement){

        var tableHeader = document.createElement("tr");

        var checkbox = view.createCheckBox();
        checkbox.setAttribute("id","multipleSelect");
        checkbox.setAttribute("onclick","controller.multiSelect()");

        var checkBoxElement = document.createElement("td");
        checkBoxElement.appendChild(checkbox);

        var titleElement = document.createElement("td");
        titleElement.append("TITLE");

        var dateElement = document.createElement("td");
        dateElement.append("DUE DATE");

        var statusElement = document.createElement("td");
        statusElement.append("STATUS");

        tableHeader.appendChild(checkBoxElement);
        tableHeader.appendChild(titleElement);
        tableHeader.appendChild(dateElement);
        tableHeader.appendChild(statusElement);        
        viewElement.appendChild(tableHeader);

        return viewElement;
    },
    
    createCheckBox : function (){
    var checkBoxElement = document.createElement("input");
    checkBoxElement.type="checkbox";
    return checkBoxElement;
    }
}
