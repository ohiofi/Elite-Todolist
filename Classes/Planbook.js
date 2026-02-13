class Planbook {
    constructor(){
        // using a dictionary-like structure so that duplicate lists won't happen
        this.directory = {
            "Groceries": new List("Groceries"),
            "Movies To Watch": new List("Movies To Watch"),
            "Archive": new ArchiveList()
        }
 
        // add some example tasks
        this.directory["Groceries"].addTask(new Task("Apples", "Get 2 Honeycrisp apples"));
        this.directory["Groceries"].addTask(new Task("Bananas", "3 or 4 green bananas"));
        this.directory["Movies To Watch"].addTask(new Task("Marty Supreme", "About table tennis?"));
        this.directory["Movies To Watch"].addTask(new Task("The Muppet Show", "Seth Rogan is in it"));
        this.directory["Movies To Watch"].addTask(new Task("F1", "Cars go vroom"));

    }

    update(){

    }

    show(){
        let x = 10;
        for (const [key, value] of Object.entries(this.directory)) {
            value.show(x);
            x += 410
        }
    }

    archiveTask(startListObject, currentIndex){
        // TODO
    }

    deleteList(listObjectToDelete){
        // TODO
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
    }

    renameList(listObjectToRename, newNameString){
        // TODO
    }

    

}