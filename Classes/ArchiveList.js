class ArchiveList extends List {
    constructor() {
        super("Archive");
    }


    show(x) {
        // box
        rect(x, 10, 400, 1000, 15);


        // title
        textAlign(CENTER, CENTER);
        textSize(24);
        fill(0);
        text(this.name, x + 200, 35);
        fill(255);
        textSize(12);




        // show all tasks in this list
        let y = 70;
        for (const each of this.listStorage) {
            each.show(x + 10, y, true);
            y += 130
        }
    }
}
