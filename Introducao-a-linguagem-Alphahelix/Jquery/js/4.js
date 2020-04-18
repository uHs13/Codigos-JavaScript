$(() => {

    $("#next").on("click", () => {

       setImg("+");

    });

    $("#previous").on("click", () => {

        setImg("-");

    });

});

function setImg(operator) {

    let image = $("img").attr("src");

        let array = image.split("/");

        let imgnumber = array[2].split(".")[0];

        switch (operator) {

            case "+":

                $("img").attr("src", (eval(imgnumber) === 5) ? "../res/1.jpg" : `../res/${eval(imgnumber) + 1}.jpg`);

                break;

            case "-":

                $("img").attr("src", (eval(imgnumber) === 1) ? "../res/5.jpg" : `../res/${eval(imgnumber) - 1}.jpg`);

                break;

        }


}