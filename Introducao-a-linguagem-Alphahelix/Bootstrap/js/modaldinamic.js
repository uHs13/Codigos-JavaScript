$(() => {

    $("button").on("click", () => {

        let title = $("#title").val();

        if (checkValue(title)) {

            changeInput("#title", true);

            return false;

        } else {

            changeInput("#title", false);

        }

        let content = $("#content").val();

        if (checkValue(content)) {

            changeInput("#content", true);

            return false;

        } else {

            changeInput("#content", false);

        }

        $(".modal-title").text(title);

        $(".modal-body").text(content);

        document.querySelector("#trigger").click();

    });

});

function checkValue(text) {

    return (text.length === 0);

}
// .checkValue

function changeInput(id, mode) {

    if (mode) {

        $(id).addClass("is-invalid");

    } else {

        $(id).removeClass("is-invalid");

    }

}
// .changeInput