document.addEventListener("DOMContentLoaded", () => {
    const planet_select = document.getElementById("planet");
    const planet_info = document.getElementById("planet_info");
    let planets_data = [];
    function fetch_planets() {
        fetch("https://api.le-systeme-solaire.net/rest/bodies/")
            .then(response => response.json())
            .then(data => 
            {
                planets_data = data.bodies.filter(body => body.isPlanet);
                populate_planets(planets_data);
            }).catch(error => console.error("Error fetching planets:", error));
    }

    function populate_planets(planets) {
        planets.forEach(planet => 
        {
            const option = document.createElement("option");
            option.value = planet.id;
            option.textContent = `${planet.englishName} (Gravity: ${planet.gravity} m/s²)`;
            planet_select.appendChild(option);
        });
    }

    planet_select.addEventListener("change", () => 
    {
        const selected_planet_id = planet_select.value;
        if (selected_planet_id) 
            {
                 fetch(`https://api.le-systeme-solaire.net/rest/bodies/${selected_planet_id}`)
                .then(response => response.json())
                .then(data => display_planet_info(data))
                .catch(error => console.error("Error fetching planet details: ", error));
            }
    });


    function display_planet_info(planet) 
    {
        planet_info.innerHTML = `<h2>${planet.englishName}</h2>
        <p><strong>Mass:</strong> ${planet.mass?.massValue} × 10^${planet.mass?.massExponent} kg</p>
        <p><strong>Radius:</strong> ${planet.meanRadius} km</p>
        <p><strong>Gravity:</strong> ${planet.gravity} m/s²</p>
        <p><strong>Day duration:</strong> ${planet.sideralRotation} hours</p>`;
    }

    fetch_planets();


});
