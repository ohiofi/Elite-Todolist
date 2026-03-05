class Modal{
    constructor(modalId){
        this.modal = document.getElementById(modalId);
        this.saveButton = this.modal.querySelector(".save-button");
        this.closeButton = this.modal.querySelector(".close-button"); //selects modal from index.html
    }
    open(){
        if(this.modal.showModal){
            this.modal.showModal();
        }
    }
    close(){
        if(this.modal.close){
            this.modal.close();
        }
    }
    waitForInput(){
        return new Promise((resolve) => {//modal doesnt wait for user to input before running rest of code, makes function pause for input
            this.saveButton.addEventListener("click", () => {
            this.close();
            resolve(true);
        }, {once: true});
        this.closeButton.addEventListener("click", () => {
            this.close();
            resolve(false);
        }, {once: true});
    });
    }
    static async getNewTask(){  
        //let name = prompt("Input the task name:");
        //let desc = prompt("Input the task's description:");
        let modal = new Modal("myModal")//selects modal ID
        modal.open();
        const inputReceived = await modal.waitForInput();//pauses for input
        if(inputReceived){//if recieved, create new task
            return new Task(modal.getInputValues("taskName"), modal.getInputValues("taskDesc"));
        }else{
          return null;
        }
   }
   static async getNewList(){
        //let name = prompt("Input the task name:");
        //let desc = prompt("Input the task's description:");
        let modal = new Modal("myModal2")
        modal.open();
        const inputReceived = await modal.waitForInput();
        if(inputReceived){
            return new List(modal.getInputValues("listName"));
        }else{
          return null;
        }
   }
   static async getConfirmation(){
       let modal = new Modal("confirm


   }
   getInputValues(input){
        const inputElement = this.modal.querySelector(`#${input}`); //returns value of listname,taskname, taskdesc to create list and task
        if(inputElement){
            return inputElement.value;
        }
        else{
            return null;
        }
    }
}
