// DOM Elements

const jobList = document.getElementById("jobList");
const jobDetails = document.getElementById("jobDetails");
const placeholder = document.getElementById("placeholder");

const searchInput = document.getElementById("searchInput");

const categoryFilter = document.getElementById("categoryFilter");
const locationFilter = document.getElementById("locationFilter");
const experienceFilter = document.getElementById("experienceFilter");

const pagination = document.getElementById("pagination");

const jobCount = document.getElementById("jobCount");

const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

const applyModal = document.getElementById("applyModal");
const closeModal = document.querySelector(".close-modal");

// Global Variables

const jobsPerPage = 5;

let currentPage = 1;

let filteredJobs = [];


// Jobs Database

const jobs = [

    {
        id: 1,
        title: "Frontend Developer",
        company: "Infosys",
        location: "Hyderabad",
        category: "Software Development",
        experience: "1-3 Years",
        salary: "₹5 LPA - ₹8 LPA",

        description: "We are looking for a Frontend Developer with experience in HTML, CSS, JavaScript and React.",

        responsibilities: [
            "Develop responsive web pages",
            "Integrate REST APIs",
            "Collaborate with UI/UX team",
            "Write reusable components"
        ],

        requirements: [
            "B.Tech or MCA",
            "Experience in React",
            "Knowledge of JavaScript",
            "Good communication skills"
        ]
    },

    {
        id: 2,
        title: "Backend Developer",
        company: "TCS",
        location: "Bangalore",
        category: "Software Development",
        experience: "3-5 Years",
        salary: "₹8 LPA - ₹12 LPA",

        description: "Build scalable backend applications using Node.js and Express.",

        responsibilities: [
            "Develop REST APIs",
            "Database Design",
            "Authentication",
            "Performance Optimization"
        ],

        requirements: [
            "Node.js",
            "Express",
            "MySQL",
            "MongoDB"
        ]
    },

    {
        id: 3,
        title: "Java Developer",
        company: "Wipro",
        location: "Chennai",
        category: "Software Development",
        experience: "3-5 Years",
        salary: "₹6 LPA - ₹10 LPA",

        description: "Design and develop enterprise Java applications.",

        responsibilities: [
            "Spring Boot Development",
            "API Integration",
            "Debug Applications",
            "Code Reviews"
        ],

        requirements: [
            "Java",
            "Spring Boot",
            "MySQL",
            "Git"
        ]
    },

    {
        id: 4,
        title: "UI/UX Designer",
        company: "Accenture",
        location: "Remote",
        category: "Software Development",
        experience: "1-3 Years",
        salary: "₹5 LPA - ₹7 LPA",

        description: "Create user friendly interfaces for web and mobile applications.",

        responsibilities: [
            "Wireframing",
            "Prototyping",
            "User Research",
            "Design Systems"
        ],

        requirements: [
            "Figma",
            "Adobe XD",
            "Photoshop",
            "Creativity"
        ]
    },

    {
        id: 5,
        title: "Digital Marketing Executive",
        company: "HCL",
        location: "Delhi",
        category: "Marketing",
        experience: "Fresher",
        salary: "₹3 LPA - ₹5 LPA",

        description: "Manage digital marketing campaigns and SEO activities.",

        responsibilities: [
            "SEO",
            "Google Ads",
            "Social Media",
            "Content Marketing"
        ],

        requirements: [
            "SEO",
            "Google Analytics",
            "Communication",
            "MS Office"
        ]
    },

    {
        id: 6,
        title: "HR Executive",
        company: "Tech Mahindra",
        location: "Pune",
        category: "Human Resources",
        experience: "1-3 Years",
        salary: "₹4 LPA - ₹6 LPA",

        description: "Manage recruitment and employee engagement.",

        responsibilities: [
            "Recruitment",
            "Employee Records",
            "Payroll Support",
            "Onboarding"
        ],

        requirements: [
            "MBA HR",
            "Communication",
            "MS Excel",
            "Recruitment Experience"
        ]
    },

    {
        id: 7,
        title: "Data Analyst",
        company: "EY",
        location: "Hyderabad",
        category: "Finance",
        experience: "1-3 Years",
        salary: "₹5 LPA - ₹9 LPA",

        description:
            "Analyze business data and provide meaningful insights.",

        responsibilities: [
            "Data cleaning",
            "Dashboard creation",
            "Report generation",
            "Business analysis"
        ],

        requirements: [
            "Excel",
            "SQL",
            "Power BI",
            "Statistics"
        ]

    },

    {
        id: 8,
        title: "Cloud Engineer",
        company: "Amazon",
        location: "Remote",
        category: "Software Development",
        experience: "3-5 Years",
        salary: "₹10 LPA - ₹16 LPA",

        description:
            "Design and maintain cloud infrastructure solutions.",

        responsibilities: [
            "AWS management",
            "Cloud monitoring",
            "Security implementation",
            "Automation"
        ],

        requirements: [
            "AWS",
            "Linux",
            "Docker",
            "Networking"
        ]

    },

    {
        id: 9,
        title: "Finance Analyst",
        company: "Deloitte",
        location: "Hyderabad",
        category: "Finance",
        experience: "3-5 Years",
        salary: "₹8 LPA - ₹11 LPA",

        description: "Prepare financial reports and perform business analysis.",

        responsibilities: [
            "Financial Planning",
            "Reporting",
            "Forecasting",
            "Risk Analysis"
        ],

        requirements: [
            "CA/MBA Finance",
            "Excel",
            "Power BI",
            "Accounting"
        ]
    },

    {
        id: 10,
        title: "Python Developer",
        company: "Cognizant",
        location: "Bangalore",
        category: "Software Development",
        experience: "3-5 Years",
        salary: "₹7 LPA - ₹12 LPA",

        description:
            "Develop scalable Python applications and backend solutions.",

        responsibilities: [
            "Develop Python applications",
            "Build APIs",
            "Write clean code",
            "Database integration"
        ],

        requirements: [
            "Python",
            "Django/Flask",
            "REST API",
            "SQL Knowledge"
        ]

    },

];

// Default List

filteredJobs = [...jobs];

// RENDER JOB LIST

function renderJobs() {

    jobList.innerHTML = "";

    let startIndex = (currentPage - 1) * jobsPerPage;

    let endIndex = startIndex + jobsPerPage;

    let pageJobs = filteredJobs.slice(startIndex, endIndex);


    if (pageJobs.length === 0) {

        jobList.innerHTML = `
            <div class="no-results">
                <h3>No Jobs Found</h3>
                <p>Try changing your search filters.</p>
            </div>
        `;

        jobCount.innerText = "0 Jobs Found";

        return;

    }


    jobCount.innerText = `${filteredJobs.length} Jobs Found`;


    pageJobs.forEach(job => {


        let card = document.createElement("div");

        card.className = "job-card";


        card.innerHTML = `

            <h3 class="job-title">
                ${job.title}
            </h3>


            <p class="company">
                <i class="fa-solid fa-building"></i>
                ${job.company}
            </p>


            <div class="job-meta">

                <span>
                    <i class="fa-solid fa-location-dot"></i>
                    ${job.location}
                </span>


                <span>
                    <i class="fa-solid fa-layer-group"></i>
                    ${job.category}
                </span>


                <span>
                    ${job.experience}
                </span>


            </div>


            <p class="salary">
                ${job.salary}
            </p>


        `;


        card.addEventListener("click", () => {

            showJobDetails(job);

            document
                .querySelectorAll(".job-card")
                .forEach(item => item.classList.remove("active"));


            card.classList.add("active");

        });


        jobList.appendChild(card);


    });


}



// PAGINATION

function renderPagination() {


    pagination.innerHTML = "";


    let totalPages = Math.ceil(
        filteredJobs.length / jobsPerPage
    );


    for (let i = 1; i <= totalPages; i++) {


        let button = document.createElement("button");


        button.innerText = i;


        if (i === currentPage) {

            button.classList.add("active");

        }


        button.addEventListener("click", () => {


            currentPage = i;


            renderJobs();

            renderPagination();


            window.scrollTo({

                top: 300,

                behavior: "smooth"

            });


        });


        pagination.appendChild(button);


    }


}



// SEARCH FUNCTION

function searchJobs() {


    let searchText =
        searchInput.value.toLowerCase();



    filteredJobs = jobs.filter(job => {


        return (

            job.title
                .toLowerCase()
                .includes(searchText)


            ||

            job.company
                .toLowerCase()
                .includes(searchText)


            ||

            job.category
                .toLowerCase()
                .includes(searchText)


            ||

            job.location
                .toLowerCase()
                .includes(searchText)

        );


    });


    applyFilters(false);


}



// FILTER FUNCTION

function applyFilters(resetPage = true) {


    let category =
        categoryFilter.value;


    let location =
        locationFilter.value;


    let experience =
        experienceFilter.value;



    filteredJobs = jobs.filter(job => {


        let categoryMatch =
            category === "" ||
            job.category === category;


        let locationMatch =
            location === "" ||
            job.location === location;


        let experienceMatch =
            experience === "" ||
            job.experience === experience;



        return (

            categoryMatch &&
            locationMatch &&
            experienceMatch

        );


    });



    if (searchInput.value !== "") {


        let search =
            searchInput.value.toLowerCase();


        filteredJobs =
            filteredJobs.filter(job => {


                return (

                    job.title
                        .toLowerCase()
                        .includes(search)


                    ||

                    job.company
                        .toLowerCase()
                        .includes(search)


                );


            });


    }



    if (resetPage) {

        currentPage = 1;

    }


    renderJobs();

    renderPagination();


}



// CLEAR FILTERS

document
    .getElementById("clearFilters")
    .addEventListener("click", () => {


        categoryFilter.value = "";

        locationFilter.value = "";

        experienceFilter.value = "";

        searchInput.value = "";


        filteredJobs = [...jobs];


        currentPage = 1;


        renderJobs();

        renderPagination();


    });



// SEARCH EVENT

searchInput
    .addEventListener(
        "input",
        () => {

            applyFilters();

        });



// FILTER EVENTS

categoryFilter
    .addEventListener(
        "change",
        () => {

            applyFilters();

        });


locationFilter
    .addEventListener(
        "change",
        () => {

            applyFilters();

        });


experienceFilter
    .addEventListener(
        "change",
        () => {

            applyFilters();

        });



// MOBILE MENU

menuBtn.addEventListener("click", () => {


    navbar.classList.toggle("active");


});



// Close mobile menu after clicking link

document
    .querySelectorAll(".navbar a")
    .forEach(link => {


        link.addEventListener("click", () => {


            navbar.classList.remove("active");


        });


    });





// SHOW JOB DETAILS

function showJobDetails(job) {


    placeholder.style.display = "none";


    jobDetails.classList.add("active");


    jobDetails.innerHTML = `


        <h2>${job.title}</h2>


        <p class="job-company">

            <i class="fa-solid fa-building"></i>

            ${job.company}

        </p>


        <div class="details-meta">


            <span>
            <i class="fa-solid fa-location-dot"></i>
            ${job.location}
            </span>


            <span>
            ${job.category}
            </span>


            <span>
            ${job.experience}
            </span>


            <span>
            ${job.salary}
            </span>


        </div>



        <div class="job-section">

            <h3>Job Description</h3>

            <p class="job-description">

                ${job.description}

            </p>

        </div>



        <div class="job-section">

            <h3>Responsibilities</h3>

            <ul>

                ${job.responsibilities
            .map(item => `
                    <li>${item}</li>
                    `)
            .join("")
        }

            </ul>

        </div>




        <div class="job-section">

            <h3>Requirements</h3>

            <ul>

                ${job.requirements
            .map(item => `
                    <li>${item}</li>
                    `)
            .join("")
        }

            </ul>

        </div>



        <button class="apply-btn" id="applyBtn">

            <i class="fa-solid fa-paper-plane"></i>

            Apply Now

        </button>


    `;



    document
        .getElementById("applyBtn")
        .addEventListener("click", () => {


            applyModal.classList.add("active");


        });


}



// APPLY MODAL


closeModal.addEventListener("click", () => {


    applyModal.classList.remove("active");


});



// Close modal when clicking outside

window.addEventListener("click", (event) => {


    if (event.target === applyModal) {

        applyModal.classList.remove("active");

    }


});



// APPLICATION FORM


document
    .querySelector(".modal form")
    .addEventListener("submit", (e) => {


        e.preventDefault();


        alert(
            "Application submitted successfully!"
        );


        applyModal.classList.remove("active");


        e.target.reset();


    });



// FINAL INITIALIZATION


filteredJobs = [...jobs];


currentPage = 1;


renderJobs();


renderPagination();

