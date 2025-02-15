async function getData() {
    document.getElementById("loading").style.display = "flex"; // إظهار اللودينج
    document.getElementById("rowData").style.display = "none"; // إخفاء المحتوى

    try {
        let response = await fetch("https://build-up.site/backend/public/services/companies.php");

        if (response.ok) {
            let responseData = await response.json();
            console.log(responseData.products);

            display(responseData.products);
            
            setTimeout(() => { 
                document.getElementById("loading").style.display = "none"; // إخفاء اللودينج
                document.getElementById("rowData").style.display = "flex"; // إظهار المحتوى
            }, 2000); // تأخير 2 ثانية لمحاكاة التحميل
        }
    } catch (error) {
        console.error("❌ خطأ في تحميل البيانات:", error);
        document.getElementById("loading").innerHTML = "<p>⚠️ فشل في تحميل البيانات. حاول لاحقًا.</p>";
    }
}

getData();


function display(arr) {
    let cartona = "";
    for (let i = 0; i < arr.length; i++) {
        let rating = arr[i].service_rating;

        cartona += `
        <div class="col-md-6">
            <div class="card box">
                <div class="row g-0">
                    <div class="col-md-4 text-center d-flex justify-content-center align-items-center">
                        <img src="${arr[i].service_image}" class="w-50 img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-8 m-0">
                                <div class="card-body">
                                    <h5 class="card-title">${arr[i].service_title}</h5>
                                    <p class="card-text">member</p>
                                    <div class="text-center star-rating" id="starRating-${i}"></div> <!-- نجوم لكل عنصر -->
                                </div>
                            </div>
                            <div class="col-md-4 d-flex align-items-center">
                                <div class="card-button">
                                    <button class="border-0 bg-transparent text-center btn-read" 
                                        data-id="${arr[i].service_id}" 
                                        data-title="${arr[i].service_title}" 
                                        data-description="${arr[i].service_description}" 
                                        data-image="${arr[i].service_image}">
                                        Read Now <i class="fa-solid fa-play"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    }
    document.getElementById("rowData").innerHTML = cartona;

    // عرض التقييم بعد توليد العناصر
    for (let i = 0; i < arr.length; i++) {
        displayStars(arr[i].service_rating, `starRating-${i}`);
    }

    // إضافة حدث النقر لكل زر
    document.querySelectorAll(".btn-read").forEach((btn) => {
        btn.addEventListener("click", function () {
            const serviceId = this.dataset.id;
            const serviceTitle = this.dataset.title;
            const serviceDescription = this.dataset.description;
            const serviceImage = this.dataset.image;

            location.href = `./../pages/details-c.html?serviceId=${serviceId}&serviceDescription=${serviceDescription}&serviceTitle=${serviceTitle}&serviceImage=${serviceImage}`;
        });
    });
}


function displayStars(rating, elementId) {
    const starContainer = document.getElementById(elementId);
    starContainer.innerHTML = ""; // تفريغ النجوم السابقة إن وجدت
    const maxStars = 5;
    let starsHTML = "";

    for (let i = 1; i <= maxStars; i++) {
        if (i <= rating) {
            starsHTML += '<i class="fas fa-star text-warning mx-1"></i>'; // نجمة ممتلئة
        } else {
            starsHTML += '<i class="far fa-star text-warning mx-1"></i>'; // نجمة فارغة
        }
    }

    starContainer.innerHTML = starsHTML;
}
