//Funciones an{onimas autoejecutables  - DRY

/********************* Menu **************/
((d) => {
    const $btnMenu = d.querySelector(".menu-btn");
    const $menu = d.querySelector(".menu");

    $btnMenu.addEventListener("click",(e) => {
        $btnMenu.firstElementChild.classList.toggle("none");
        $btnMenu.lastElementChild.classList.toggle("none");
        $menu.classList.toggle("is-active");
    });

    d.addEventListener("click", (e) => {
        if(!e.target.matches(".menu a")) return false;
        $btnMenu.firstElementChild.classList.remove("none");
        $btnMenu.lastElementChild.classList.add("none");
        $menu.classList.remove("is-active");
    })

})(document);

/********************* ContactForm **************/
((d) => {
    //El simbolo $ lo usamos para las variables que hacen parte de elementos del DOM, buena pr{actica}
    const $form = d.querySelector(".contact-form"),
          $loader = d.querySelector(".contact-form-loader"),
          $response = d.querySelector(".contact-form-response");

    $form.addEventListener("submit", (e) => {
        e.preventDefault();
        $loader.classList.remove("none");
        //Una vez se vea el loader, mandamos la petición a formSubmit
        fetch("https://formsubmit.co/ajax/dalejandro10@hotmail.com", {
            method: "POST",
            body: new FormData(e.target),
        })
            .then((res) => (res.ok? res.json():Promise.reject(res)))
            .then((json) => {
                console.log(json);
                location.hash = "#gracias";
                $form.reset();
            })
            .catch((err) => {
                console.log(err);
                let message = err.statusText || "Ocurrio un error al enviar, intenta nuevamente.";
                $response.querySelector("h3").innerHTML = `error ${err.status}:${message}`;
            }).finally(() => {
                $loader.classList.add("none");
                setTimeout(() => {
                    location.hash = "#close";
                }, 3000);
            });
    });

})(document);