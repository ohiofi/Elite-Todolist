const DEFAULT_TASK_NAME =   "New Task"
const DEFAULT_DESCRIPTION = ""
const DEFAULT_STATUS =      "Todo"
const DEFAULT_POSITION =    1
const DEFAULT_FINISHED =    false

class Task {
    constructor(name, desc, status, position) { //es6 classes are the WORST :(
        this.Name =        name     || DEFAULT_TASK_NAME
        this.Description = desc     || DEFAULT_DESCRIPTION
        this.Status =      status   || DEFAULT_STATUS
        this.Position =    position || DEFAULT_POSITION
        this.Finished =                DEFAULT_FINISHED
    }

    //getters and setters
    GetName()     { return this.Name }
    GetDesc()     { return this.Description }
    GetStatus()   { return this.Status }
    GetPosition() { return this.Position}
    IsFinished()  { return this.Finished }

    SetName(newName)       { this.Name =        newName   || DEFAULT_TASK_NAME }
    SetDesc(newDesc)       { this.Description = newDesc   || DEFAULT_DESCRIPTION }
    SetStatus(newStatus)   { this.Status =      newStatus || DEFAULT_STATUS }
    SetPosition(newPos)    { this.Position =    newPos    || DEFAULT_POSITION }
    SetFinished(condition) { this.Finished =    condition || DEFAULT_FINISHED }

    //methods
    toString() {
        let output = ""

        let name =      this.GetName()
        let desc =      this.GetDesc()
        let status =    this.GetStatus()
        let position =  this.GetPosition()
        let completed = this.IsFinished()

        output += name + ": \n"
        output += desc + "\n"
        output += "Priority: " + position + "\n"
        output += "Status: " + status + "\n"
        output += "Finished? " + completed
    }

    //kinda barebones but hopefully the list class can carry
    Complete() {
        this.SetStatus("Done")
        this.SetFinished(true)
    }

    //im not saying that this method should be in the list but it should definitely be in the list
    Archive() {
        this.SetStatus("Archived")
    }

    //basically slides the position of the task up or down 1 spot (world record for fastest annihilation of the webapp)
    SlidePosition(direction) {
        if (direction == 0) { //do not.
            return
        }
        let normDirection = direction / Math.abs(direction) //wizard spell to normalize the direction to either 1 or -1 (in theory)
        this.SetPosition(normDirection)
    }
}