exo 4 $(document).ready(function() {
    $("a:not([target='blank'])").css("opacity", "0.5");
});

$(document).ready(function() {
    $("ul:first li:first").hide();
});
exo 7
$(document).ready(function() {
    $("p").on({
        mouseenter: function() {
            $(this).css("background-color", "lightgray");
        },
        mouseleave: function() {
            $(this).css("background-color", "white");
        },
        click: function() {
            $(this).hide();
        }
    });
});

$(document).ready(function() {
    $("button").click(function() {
        $("#menu").toggle();
    });
});

$(document).ready(function() {
    $(".platypus").click(function() {
        $(this).animate({
            left: "+=150px",
            top: "+=200px",
            backgroundColor: "green"
        }, 1000); // durée 1 seconde
    });
});

$(document).ready(function() {
    $(".test").hide(500, function() {
        alert("The paragraph is now hidden.");
    });
});


$(document).ready(function() {
    $("button").click(function() {
        let value = $("#listItem").val(); // récupérer la valeur
        if (value.trim() !== "") { // éviter vide
            $("#listItem").after(`<div>${value}</div>`);
            $("#listItem").val(""); // vider le champ
        }
    });
});

$(document).ready(function() {
    $("img:first").before("<p>Wow, I precede the image!</p>");
    $("img:first").after("<p>Hey, I come in last</p>");
});


$(document).ready(function() {
    $("p.test, p.platypus").remove();
});


$(document).ready(function() {
    $("p").hover(
        function() {
            $(this).addClass("blue");
        },
        function() {
            $(this).removeClass("blue");
        }
    );

    $("p").click(function() {
        $(this).toggleClass("highlighted");
    });
});


// Fonction fléchée ES6
const makeBlue = () => {
    const element = document.querySelector(".platypus"); // premier élément
    if (element) {
        element.style.backgroundColor = "blue";
    }
};

makeBlue();


// Fonction fléchée ES6 avec valeur par défaut
const setPlatypusColor = (hexColor = "#FFC0CB") => { // rose par défaut
    const element = document.querySelector(".platypus");
    if (element) {
        element.style.backgroundColor = hexColor;
    }
};

// Exemple d'appel avec couleur personnalisée
setPlatypusColor("#00FF00"); // vert


class Glop {
    constructor(color) {
        console.log("Bwello");
        this.color = color;
    }

    applyColor(element) {
        element.style.color = this.color;
    }

    destroy() {
        console.log("Boodnight");
    }
}

// Création d'un Glop avec couleur rouge
const myGlop = new Glop("#FF0000");

document.querySelectorAll("p").forEach(paragraph => {
    paragraph.addEventListener("click", () => {
        myGlop.applyColor(paragraph);
    });
});

