function WriteAssertMsg(expected, actual) {
    let assertMsg = "Assertion failed, expected " + expected + " but got " + actual + "!"
    
    return assertMsg
}

class TaskTest {
    TestBlank() {
        let newTask = new Task()
        console.assert(newTask.GetName(), WriteAssertMsg("New Task", newTask.GetName())) //i feel like the dj toenail of JS istg
        console.assert(newTask.GetDesc(), WriteAssertMsg("", newTask.GetDesc()))
        console.assert(newTask.GetStatus(), WriteAssertMsg("Todo", newTask.GetStatus()))
    }

    TestALot() {
        let newTask = new Task("Code Tests", "Code tests for the Task class", "Doing", 9999999999)
        console.assert(newTask.GetName(), WriteAssertMsg("Code Tests", newTask.GetName()))
        console.assert(newTask.GetDesc(), WriteAssertMsg("Code tests for the Task class", newTask.GetDesc()))
        console.assert(newTask.GetStatus(), WriteAssertMsg("Doing", newTask.GetStatus()))
        console.assert(newTask.GetPosition(), WriteAssertMsg(9999999999, newTask.GetPosition()))
    }
}