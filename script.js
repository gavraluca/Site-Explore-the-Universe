const slider = document.getElementById('interest_slider');
const interest_value = document.getElementById('interest_value');
const show_value_slider = document.getElementById("interest_value");
const saved_value_slider = localStorage.getItem("interest_slider");
if(saved_value_slider !== null)
{
    slider.value = saved_value_slider;
    show_value_slider.textContent = saved_value_slider + "%";
}

slider.addEventListener("input" , function()
{
    localStorage.setItem("interest_slider" , slider.value);
    show_value_slider.textContent.textContent = slider.value + "%";
});


slider.addEventListener('input' , () =>
{
    interest_value.textContent = `${slider.value}%`;
});

function save_favplanet(event) {
    event.preventDefault(); 
    let selectedPlanet = document.getElementById("planet").value;
    if (!selectedPlanet) return;
    localStorage.setItem("spaceResponses", JSON.stringify([selectedPlanet]));
    display_favplanet();
    document.getElementById("confirmation").style.display = "block";
    document.getElementById("planet_form").reset();
    
}

function display_favplanet() {
    let response = JSON.parse(localStorage.getItem("spaceResponses")) || [];
    let list = document.getElementById("responsesList");
    list.innerHTML = "";

    if (response.length > 0) {
        let li = document.createElement("li");
        li.textContent = response[0];

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = delete_favplanet;
        
        li.appendChild(deleteButton);
        list.appendChild(li);
    }
}

function delete_favplanet() {
    localStorage.removeItem("spaceResponses");
    display_favplanet();
}

display_favplanet();
window.onload = display_favplanet;


const checkboxes = document.querySelectorAll(".mission_check");
const message = document.getElementById("selected_mission");
function update_selection(event)
{
    checkboxes.forEach(checkbox => {
        if(checkbox !== event.target)
        {
            checkbox.checked = false;
        }
    });
    if(event.target.checked)
    {
        localStorage.setItem("selected_mission" , event.target.value);
        message.textContent = "You have chosen " + event.target.value + ". Good choice!";
    }
    else
    {
        localStorage.removeItem("selected_mission");
        message.textContent = "No mission selected... You better move fast!"
    }
}

checkboxes.forEach(checkbox =>
{
    checkbox.addEventListener("change" , update_selection);
}
);


const saved_mission = localStorage.getItem("selected_mission");
if(saved_mission)
{
    checkboxes.forEach(checkbox =>
    {
        if(checkbox.value == saved_mission)
        {
            checkbox.checked = true;
            message.textContent = "You have chosen " + saved_mission + ". Good choice!";
        }
    }
    );
}

const rating_slider = document.getElementById("rating");
const rating_value = document.getElementById("rating_value");
function update_rating()
{
    rating_value.textContent = rating_slider.value;
    localStorage.setItem("userRating" , rating_slider.value);
}
document.addEventListener("DOMContentLoaded" , () =>
{
    const saved_rating = localStorage.getItem("userRating");
    if(saved_rating !== null)
    {
        rating_slider.value = saved_rating;
        rating_value.textContent = saved_rating;
    }
    
});

rating_slider.addEventListener("input" , update_rating);




