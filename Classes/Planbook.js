class Planbook {
    constructor(){
        // using a dictionary-like structure so that duplicate lists won't happen
        // this.dictionary = {
        //     "Groceries": new List("Groceries"),
        //     "Movies To Watch": new List("Movies To Watch"),
        //     "Archive": new ArchiveList()
        // }
        this.dictionary = {};

        this.xLocationForNextList = 10;

        this.addList("Groceries");
        this.addList("Movies To Watch");
        this.addArchiveList();
 
        // add some example tasks
        this.dictionary["Groceries"].addTask(new Task("Apples", "Get 2 Honeycrisp apples"));
        this.dictionary["Groceries"].addTask(new Task("Bananas", "3 or 4 green bananas"));
        this.dictionary["Movies To Watch"].addTask(new Task("Marty Supreme", "About table tennis?"));
        this.dictionary["Movies To Watch"].addTask(new Task("The Muppet Show", "Seth Rogan is in it"));
        this.dictionary["Movies To Watch"].addTask(new Task("F1", "Cars go vroom"));

    }

    update(){

    }

    show(){
        for (const [key, value] of Object.entries(this.dictionary)) {
            value.show();
        }
    }

    addArchiveList(){
        // if list name already exists in dictionary, then do nothing
        if(this.doesListExist("Archive")){ return }

        this.dictionary["Archive"] = new ArchiveList();
        this.dictionary["Archive"].setX(this.xLocationForNextList)
        this.xLocationForNextList += 410;

        // connect add of the handler callbacks
        this.bindCallbackFunctions(this.dictionary["Archive"]);
    }

    addList(listNameString){
        // if list name already exists in dictionary, then do nothing
        if(this.doesListExist(listNameString)){ return }

        this.dictionary[listNameString] = new List(listNameString);
        this.dictionary[listNameString].setX(this.xLocationForNextList)
        this.xLocationForNextList += 410;

        // connect add of the handler callbacks
        this.bindCallbackFunctions(this.dictionary[listNameString]);
    }

    archiveTask(startListObject, taskObject){
        console.log("hello from archive task")
        // copy to archive
        if(!this.doesListExist("Archive")){
            this.addArchiveList();
        }
        this.dictionary["Archive"].addTask(taskObject);
        this.dictionary[startListObject.getName()].removeTask(taskObject);
        taskObject.setArchived()
    }

    bindCallbackFunctions(listObject){
        listObject.handleDeleteListPress = () => {
            this.deleteList(listObject);
        }
        listObject.handleMoveTaskToArchive = (taskObject) => {
            this.archiveTask(listObject, taskObject);
        }
    }

    deleteList(listObjectToDelete){
        // TODO
        console.log("planbook receive request to delete list")

        let xLocationOfDeletedList = listObjectToDelete.x;

        listObjectToDelete.deleteListButtons();

        delete this.dictionary[listObjectToDelete.getName()];

        // loop thru the existing lists and move if needed
        for (const [key, value] of Object.entries(this.dictionary)) {
            if(value.x > xLocationOfDeletedList){
                value.setX(value.x - 410);
            }
        }
    }

    doesListExist(listNameString){
        return this.dictionary.hasOwnProperty(listNameString)
    }

    findTask(taskNameString){
        // TODO 
    }

    moveList(){
        // TODO 
        // lists have x and y coords
    }

    moveListLeft(){
        // TODO 
        // lists have x and y coords
    }

    moveListRight(){
        // TODO 
        // lists have x and y coords
    }

    moveTask(startListObject, currentIndex, endingListObject){
        // TODO
        task.setCompleted();
        list.moveTask(listArray[0], this);
    }

    renameList(listObjectToRename, newNameString){
        // TODO
    }

    

}