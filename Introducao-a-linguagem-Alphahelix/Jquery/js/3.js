$(() => {

    $("#add").on("click", () => {

        $("body").addClass("body");
        $("section").addClass("container");
        $("#buttoncontainer").addClass("button-container");
        $("button").addClass("button");
        $("#title").addClass("title");

    });

    $("#rmv").on("click", () => {

        $("body").removeClass("body");
        $("section").removeClass("container");
        $("#buttoncontainer").removeClass("button-container");
        $("button").removeClass("button");
        $("#title").removeClass("title");

    });

});