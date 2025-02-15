
const urlParams = new URLSearchParams(window.location.search);
const serviceId = urlParams.get("serviceId");
const serviceDescription = urlParams.get("serviceDescription");
const serviceTitle = urlParams.get("serviceTitle");
const serviceImage = urlParams.get("serviceImage");

// Ensure required parameters exist before proceeding
if (serviceId && serviceDescription && serviceTitle && serviceImage) {
    console.log("📌 بيانات الخدمة المستلمة:", { serviceId, serviceDescription, serviceTitle, serviceImage });
    displayServiceDetails();
} else {
    console.error("⚠️ لا توجد بيانات في الرابط!");
}

// Function to display service details
function displayServiceDetails() {
    const rowData = document.getElementById("rowData");

    if (!rowData) {
        console.error("⚠️ عنصر 'rowData' غير موجود في الصفحة.");
        return;
    }

    rowData.innerHTML = `
        <div class="row g-0">
            <div class="col-md-2 text-center d-flex justify-content-center align-items-center">
                <img src="${serviceImage}" class="w-50 img-fluid rounded-start" alt="Service Image">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${serviceTitle}</h5>
                    <p class="card-text mt-5">member</p>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div>
            <p class="m-5 lead">${serviceDescription}</p>
        </div>
    `;
}

// API Endpoints
const API_BASE_URL = "https://build-up.site/backend/public/reviews";
const API_ADD_COMMENT = `${API_BASE_URL}/add_review.php`;
const API_GET_COMMENTS = `${API_BASE_URL}/show_reviews.php`;

console.log("🔹 Service ID from URL:", serviceId);

// Function to submit a comment
async function submitComment() {
    const commentAuthor = document.getElementById("commentAuthor").value.trim();
    const commentRating = document.getElementById("commentRating").value;
    const commentBody = document.getElementById("commentBody").value.trim();

    if (!commentAuthor || !commentBody) {
        alert("❌ يرجى ملء جميع الحقول!");
        return;
    }

    const commentData = new FormData();
    commentData.append("review_author", commentAuthor);
    commentData.append("review_rating", commentRating);
    commentData.append("review_body", commentBody);
    commentData.append("service_id", serviceId);

    console.log("📩 إرسال البيانات إلى API:", Object.fromEntries(commentData));

    try {
        const response = await fetch(API_ADD_COMMENT, {
            method: "POST",
            body: commentData,
        });

        const result = await response.json();
        console.log("📩 استجابة API:", result);

        if (result.success) {
            alert("✅ تم إرسال التعليق بنجاح!");
            document.getElementById("commentAuthor").value = "";
            document.getElementById("commentBody").value = "";
            fetchComments();
        } else {
            alert(`❌ فشل في إرسال التعليق: ${result.message}`);
        }
    } catch (error) {
        console.error("⚠️ خطأ أثناء إرسال التعليق:", error);
        alert("❌ حدث خطأ أثناء إرسال التعليق. تحقق من الاتصال بالإنترنت وحاول مرة أخرى.");
    }
}

window.onload = function () {
    fetchComments();
};

async function fetchComments() {
    const commentsList = document.getElementById("commentsList");

    if (!commentsList) {
        console.error("⚠️ عنصر 'commentsList' غير موجود في الصفحة.");
        return;
    }

    commentsList.innerHTML = "<p>⏳ جارٍ تحميل التعليقات...</p>";

    const commentData = new FormData();
    commentData.append("service_id", serviceId);

    try {
        const response = await fetch(API_GET_COMMENTS, {
            method: "POST",
            body: commentData
        });

        const text = await response.text();
        console.log("📩 Response Text:", text);

        if (!text.trim()) throw new Error("⚠️ استجابة فارغة من السيرفر!");

        const commentsData = JSON.parse(text);

        if (!commentsData.success || !Array.isArray(commentsData.reviews) || commentsData.reviews.length === 0) {
            commentsList.innerHTML = "<p>❌ لا توجد تعليقات حتى الآن.</p>";
            return;
        }

        commentsList.innerHTML = commentsData.reviews.map(comment => `
            <div class="comment-box">
                <strong>${comment.review_author}</strong> - <span class="stars">${generateStars(comment.review_rating)}</span>
                <p>${comment.review_body}</p>
            </div>
        `).join("");

    } catch (error) {
        console.error("⚠️ خطأ أثناء جلب التعليقات:", error);
        commentsList.innerHTML = "<p>❌ فشل في تحميل التعليقات. حاول مرة أخرى لاحقًا.</p>";
    }
}


// Function to generate star ratings
function generateStars(rating) {
    return "⭐".repeat(rating);
}













// const urlParams = new URLSearchParams(window.location.search);
// const serviceId = urlParams.get("serviceId");
// const serviceDescription = urlParams.get("serviceDescription");
// const serviceTitle = urlParams.get("serviceTitle");
// const serviceImage = urlParams.get("serviceImage");

// if (serviceId && serviceDescription && serviceTitle && serviceImage ) {
//     console.log("📌 بيانات الخدمة المستلمة:", { serviceId, serviceDescription , serviceTitle , serviceImage });

// } else {
//     console.error("⚠️ لا توجد بيانات في الرابط!");
// }

// display();  

// function display()
// {
//     let cartona="";

//     cartona +=
//     `
//                     <div class="row g-0">
//                         <div class="col-md-2 text-center d-flex justify-content-center align-items-center ">
//                           <img src="${serviceImage}" class="w-50 img-fluid rounded-start" alt="...">
//                         </div>
//                         <div class="col-md-8 ">
//                           <div class="row">
//                               <div class="col-md-8 m-0">
//                                   <div class="card-body">
//                                       <h5 class="card-title">${serviceTitle}</h5>
//                                       <p class="card-text mt-5">member</p>
//                                     </div>
//                               </div>
//                           </div>
//                         </div>
//                       </div>


//                       <div class="line"></div>

//                       <div>
//                         <p class="m-5 lead">${serviceDescription}</p>
//                       </div>
    
//     `
//     document.getElementById("rowData").innerHTML=cartona;
// }



// const API_ADD_COMMENT = "build-up.site/backend/public/reviews/add_review.php";
// const API_GET_COMMENTS = "build-up.site/backend/public/reviews/show_reviews.php";

// console.log("🔹 Service ID from URL:", serviceId);

// async function submitComment() {
//   const commentAuthor = document.getElementById("commentAuthor").value.trim();
//   const commentRating = document.getElementById("commentRating").value;
//   const commentBody = document.getElementById("commentBody").value.trim();

//   if (!commentAuthor || !commentBody) {
//       alert("❌ يرجى ملء جميع الحقول!");
//       return;
//   }

//   const commentData = new FormData();
//   commentData.append("review_author", commentAuthor);
//   commentData.append("review_rating", commentRating);
//   commentData.append("review_body", commentBody);
//   commentData.append("service_id", serviceId);

//   console.log("📩 بيانات سيتم إرسالها إلى API:", Object.fromEntries(commentData));

//   try {
//       const response = await fetch(API_ADD_COMMENT, {
//           method: "POST",
//           body: commentData 
//       });

//       const result = await response.json();
//       console.log("📩 استجابة من API:", result);

//       if (result.success) {
//           alert("✅ تم إرسال التعليق بنجاح!");
//           document.getElementById("commentAuthor").value = "";
//           document.getElementById("commentBody").value = "";
//           fetchComments();
//       } else {
//           alert(`❌ فشل في إرسال التعليق: ${result.message}`);
//       }
//   } catch (error) {
//       console.error("⚠️ خطأ أثناء إرسال التعليق:", error);
//       alert("❌ حدث خطأ أثناء إرسال التعليق. تحقق من الاتصال بالإنترنت وحاول مرة أخرى.");
//   }
// }


// window.onload = function () {
//     fetchComments();
// };


// async function fetchComments() {
//   const commentsList = document.getElementById("commentsList");
//   commentsList.innerHTML = "<p>⏳ جارٍ تحميل التعليقات...</p>";

//   const commentData = new FormData();
//   commentData.append("service_id", serviceId); 

//   try {
//       const response = await fetch(API_GET_COMMENTS, {
//           method: "POST",
//           body: commentData  
//       });

//       if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

//       const text = await response.text();
//       console.log("📩 Response Text:", text);

//       if (!text.trim()) throw new Error("⚠️ استجابة فارغة من السيرفر!");

//       let commentsData;
//       try {
//           commentsData = JSON.parse(text);
//       } catch (parseError) {
//           throw new Error("⚠️ فشل تحليل JSON: تأكد من أن السيرفر يُرجع بيانات صحيحة.");
//       }

//       commentsList.innerHTML = "";

//       if (!commentsData.success || !Array.isArray(commentsData.reviews) || commentsData.reviews.length === 0) {
//           commentsList.innerHTML = "<p>❌ لا توجد تعليقات حتى الآن.</p>";
//           return;
//       }

//       commentsData.reviews.forEach(comment => {
//           const commentDiv = document.createElement("div");
//           commentDiv.classList.add("comment-box");
//           commentDiv.innerHTML = `
//               <strong>${comment.review_author}</strong> - <span class="stars">${generateStars(comment.review_rating)}</span>
//               <p>${comment.review_body}</p>
//           `;
//           commentsList.appendChild(commentDiv);
//       });

//   } catch (error) {
//       console.error("⚠️ خطأ أثناء جلب التعليقات:", error);
//       commentsList.innerHTML = "<p>❌ فشل في تحميل التعليقات. حاول مرة أخرى لاحقًا.</p>";
//   }
// }

// function generateStars(rating) {
//     return "⭐".repeat(rating);
// }





