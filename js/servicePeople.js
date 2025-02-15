
async function getData() {
  document.getElementById("loading").style.display = "flex"; // إظهار اللودينج
  document.getElementById("rowData").style.display = "none"; // إخفاء المحتوى

  try {
      let response = await fetch("https://build-up.site/backend/public/services/individuals.php");

      if (response.ok) {
          let responseData = await response.json();
          console.log(responseData.products);
          
          display(responseData.products);
          displayStars(responseData.products);
          
          setTimeout(() => { 
              document.getElementById("loading").style.display = "none"; 
              document.getElementById("rowData").style.display = "flex";  
          }, 2000); 
      }
  } catch (error) {
      console.error("❌ خطأ في تحميل البيانات:", error);
      document.getElementById("loading").innerHTML = "<p>⚠️ فشل في تحميل البيانات. حاول لاحقًا.</p>";
  }
}

getData();



 

function display(arr){
    let cartona="";
    for (let i = 0; i <arr.length ; i++) {

      ratting=arr[i].service_rating;
        cartona +=`
         <div class="col-md-6 ">
                <div class="card box" >
                  <div class="row g-0">
                    <div class="col-md-4 text-center d-flex justify-content-center align-items-center ">
                      <img src="${arr[i].service_image}" class="w-50 img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8 ">
                      <div class="row">
                        <div class="col-md-8 m-0">
                          <div class="card-body">
                            <h5 class="card-title">${arr[i].service_title}</h5>
                            <p class="card-text">member</p>
                            <div class="text-center" id="starRating"></div>
                          </div>
                        </div>
                        <div class="col-md-4 d-flex  align-items-center">
                          <div class="card-button">
                            <button class="border-0 bg-transparent text-center" id="btn-read" >Read Now <i class="fa-solid fa-play"></i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

        `
    }
    document.getElementById("rowData").innerHTML=cartona;

    
}



function displayStars(array) {

  const starContainer = document.getElementById("starRating");
  starContainer.innerHTML = ""; 
  const maxStars = 5;
  let starsHTML = "";

  for (let i = 0; i <array.length ; i++) {
    const rating = array[i].service_rating;

    for (let i = 1; i <= maxStars; i++) {
        if (i <= rating) {
            starsHTML += '<i class="fas fa-star"></i>'; 
        } else {
            starsHTML += '<i class="far fa-star"></i>';  
        }
    }






    document.getElementById("btn-read").addEventListener("click", function () {
      const serviceId = array[i].service_id;
      const serviceDescription = array[i].service_description;
      const serviceTitle = array[i].service_title;
      const serviceImage=array[i].service_image;
      location.href = `./../pages/details-p.html?serviceId=${serviceId}&serviceDescription=${serviceDescription}&serviceTitle=${serviceTitle}&serviceImage=${serviceImage}`;
      console.log("hello");
      });


    
    

  }

  starContainer.innerHTML = starsHTML;
}







