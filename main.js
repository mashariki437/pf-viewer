class State {
    row;
    col;
    constructor() {
        this.row = 0
        this.col = 1
    }

    row_selector() {
        return "[data-row=" + state.row + "]"
    }

    col_selector() {
        return "[data-col=" + state.col + "]"        
    }

    move_right() {
        this.col += 1;
        if(this.col > 5) {
            this.col = this.row + 1
        }
    }

    move_left() {
        this.col -= 1;
        if(this.col <= this.row) {
            this.col = 5
        }
    }

    move_down() {
        this.row += 1;
        if(this.row >= this.col) {
            this.row = 0
        }
    }

    move_up() {
        this.row -= 1;
        if(this.row < 0) {
            this.row = this.col - 1
        }
    }
}

function refresh(state) {
    $("div.range").hide()
    selector = "[data-row=" + state.row + "][data-col=" + state.col + "]"
    $("div.range" + selector).show()

    $("td").removeClass("active")
    $("tr[data-row=" + state.row + "] " + "td[data-col=" + state.col + "]").addClass("active")
    console.log("Show row, col = " + state.row + ", " + state.col)
}

$(document).ready(() => {
    state = new State;

    refresh(state);

    ["right", "d"].forEach((key) => {
        $(document).bind("keydown", key, () => {
            state.move_right();
            refresh(state);
            return false;
        })
    });
    ["left", "a"].forEach((key) => {
        $(document).bind("keydown", key, () => {
            state.move_left();
            refresh(state);
            return false;
        })
    });
    ["down", "s"].forEach((key) => {
        $(document).bind("keydown", key, () => {
            state.move_down();
            refresh(state);
            return false;
        })
    });
    ["up", "w"].forEach((key) => {
        $(document).bind("keydown", key, () => {
            state.move_up();
            refresh(state);
            return false;
        })
    });

    // click table
    $("tr[data-row] td[data-col]").click((e) => {
        console.log("click");
        const td = $(e.target);
        const tr = td.parent();
        if(td.hasClass("void")) {
            return false;
        }
        state.row = tr.attr("data-row");
        state.col = td.attr("data-col");
        refresh(state);
        return false;
    })
});

  