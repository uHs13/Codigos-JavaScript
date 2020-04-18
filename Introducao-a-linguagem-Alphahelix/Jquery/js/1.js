$(() => {

    console.log("document ready...");

    $("#btn").on("click", () => {

        $("h1").css({

            color: `rgb(${sortNumber()}, ${sortNumber()}, ${sortNumber()})`

        });

        $("body").css({

            backgroundColor: `rgb(${sortNumber()}, ${sortNumber()}, ${sortNumber()})`

        });

        $("#btn").css({

            borderColor: `rgb(${sortNumber()}, ${sortNumber()}, ${sortNumber()})`,
            color: `rgb(${sortNumber()}, ${sortNumber()}, ${sortNumber()})`,
            boxShadow: ` 3px 3px 8px 3px rgb(${sortNumber()}, ${sortNumber()}, ${sortNumber()})`,
            backgroundColor: `rgb(${sortNumber()}, ${sortNumber()}, ${sortNumber()})`

        });

    });

});

function sortNumber(){

    return Math.floor(Math.random() * 250 + 1);

};