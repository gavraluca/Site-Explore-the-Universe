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
