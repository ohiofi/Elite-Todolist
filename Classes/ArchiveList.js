class ArchiveList extends List {
    constructor() {
        super("Archive");
    }


    show() {
        // box
        rect(this.x, this.y, 400, 1000);


        // title
        textAlign(CENTER, CENTER);
        fill(0);
        text(this.name, this.x + 200, 30);
        fill(255);




        // show all tasks in this list

        for (const each of this.listStorage) {
            each.show();
            
        }
    }
}
