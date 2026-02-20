// ------------------ Dark Mode ------------------
function toggleDark() {
    document.body.classList.toggle("dark");
}

// ------------------ Page Navigation ------------------
function show(id) {
    document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");

    if (id === "dashboard") {
        fetchOfficials();
        fetchAnnouncements();
        fetchStats();
    }
}

// ------------------ Admin Login ------------------
function openLogin() {
    loginModal.classList.add("show");
}

function login() {
    const username = email.value;
    const password = pass.value;

    fetch("backend/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                loginModal.classList.remove("show");
                document.body.classList.add("admin-mode");
                show("admin");
                fetchAll();
                toast("success", "Welcome Admin!");
            } else {
                toast("error", "Invalid username or password");
            }
        });
}

function logout() {
    fetch("backend/logout.php")
        .finally(() => {
            document.body.classList.remove("admin-mode");
            show("dashboard");
        });
}

// ------------------ Announcements ------------------
function postAnn() {
    const title = atitle.value;
    const content = acontent.value;

    fetch("backend/add_announcement.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                atitle.value = "";
                acontent.value = "";
                fetchAnnouncements();
                toast("success", "Announcement posted!");
            }
        });
}

function deleteAnn(id) {
    if (!confirm("Delete this announcement?")) return;
    fetch("backend/delete_announcement.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }).then(() => fetchAnnouncements());
}

function fetchAnnouncements() {
    fetch("backend/fetch_announcements.php")
        .then(res => res.json())
        .then(data => {
            // Dashboard
            annList.innerHTML = "";
            data.forEach(a => {
                annList.innerHTML += `
                    <div class="card">
                        <b>${a.title}</b><br>
                        <small>${a.date}</small>
                        <p>${a.content}</p>
                    </div>`;
            });

            // Admin
            annAdminList.innerHTML = "";
            data.forEach(a => {
                annAdminList.innerHTML += `
                    <div class="card">
                        <b>${a.title}</b><br>
                        <small>${a.date}</small>
                        <p>${a.content}</p>
                        <button class="danger" onclick="deleteAnn(${a.id})">Delete</button>
                    </div>`;
            });
        });
}

// ------------------ Residents ------------------
function addResident(e) {
    e.preventDefault();
    const resident = {
        lname: r_lname.value,
        fname: r_fname.value,
        mname: r_mname.value,
        bd: r_bd.value,
        gender: r_gender.value,
        status: r_status.value,
        addr: r_addr.value,
        contact: r_contact.value
    };

    fetch("backend/add_resident.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resident)
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                fetchResidents();
                e.target.reset();
                toast("success", "Resident added successfully!");
            }
        });
}

function deleteResident(id) {
    if (!confirm("Delete this resident?")) return;

    fetch("backend/delete_resident.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }).then(() => fetchResidents());
}

function fetchResidents(query = "") {
    fetch("backend/fetch_residents.php?q=" + encodeURIComponent(query))
        .then(res => res.json())
        .then(data => {
            resTable.innerHTML = "";
            data.forEach(r => {
                resTable.innerHTML += `
                    <tr>
                        <td>${r.name}</td>
                        <td>${r.bd}</td>
                        <td>${r.gender}</td>
                        <td>${r.status}</td>
                        <td>${r.addr}</td>
                        <td>${r.contact}</td>
                        <td>
                            <button class="danger" onclick="deleteResident(${r.id})">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    </tr>`;
            });
            updateStats();
        });
}

function searchResidents(q) {
    fetchResidents(q);
}

// ------------------ Service Requests ------------------
function genControl() {
    return "BRGY-" + Math.floor(100000 + Math.random() * 900000);
}

function submitService(e) {
    e.preventDefault();
    const request = {
        name: `${ln.value} ${fn.value} ${mn.value}`,
        type: stype.value,
        purpose: purpose.value,
        addr: saddr.value,
        control: genControl()
    };

    fetch("backend/add_service_request.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request)
    }).then(() => {
        e.target.reset();
        fetchRequests();
        toast("success", "Service request submitted!");
    });
}

function approveRequest(id) {
    fetch("backend/approve_request.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }).then(() => fetchRequests());
}

function fetchRequests() {
    fetch("backend/fetch_requests.php")
        .then(res => res.json())
        .then(data => {
            reqTable.innerHTML = "";
            approvedTable.innerHTML = "";
            myReqTable.innerHTML = "";

            data.pending.forEach(r => {
                reqTable.innerHTML += `
                    <tr>
                        <td>${r.name}</td>
                        <td>${r.type}</td>
                        <td>${r.purpose}</td>
                        <td>${r.addr}</td>
                        <td>
                            <button class="primary" onclick="approveRequest(${r.id})">Approve</button>
                            <button class="danger" onclick="rejectRequest(${r.id})">Reject</button>
                        </td>
                    </tr>`;
                myReqTable.innerHTML += `
                    <tr>
                        <td>${r.type}</td>
                        <td>PENDING</td>
                        <td>${r.control}</td>
                    </tr>`;
            });

            data.approved.forEach(r => {
                approvedTable.innerHTML += `
                    <tr>
                        <td>${r.name}</td>
                        <td>${r.type}</td>
                        <td>${r.control}</td>
                        <td>APPROVED</td>
                    </tr>`;
                myReqTable.innerHTML += `
                    <tr>
                        <td>${r.type}</td>
                        <td>APPROVED</td>
                        <td>${r.control}</td>
                    </tr>`;
            });

            updateStats();
        });
}

function rejectRequest(id) {
    fetch("backend/reject_request.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }).then(() => fetchRequests());
}

// ------------------ Reports ------------------
function sendConcern(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("addr", caddr.value);
    formData.append("msg", cmsg.value);
    if (cimg.files[0]) formData.append("img", cimg.files[0]);

    fetch("backend/add_report.php", {
        method: "POST",
        body: formData
    }).then(() => {
        e.target.reset();
        fetchReports();
        toast("success", "Report submitted!");
    });
}

function resolveReport(id) {
    fetch("backend/resolve_report.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }).then(() => fetchReports());
}

function fetchReports() {
    fetch("backend/fetch_reports.php")
        .then(res => res.json())
        .then(data => {
            reportTable.innerHTML = "";
            myReportTable.innerHTML = "";

            data.forEach(r => {
                reportTable.innerHTML += `
                    <tr>
                        <td>${r.addr}</td>
                        <td>${r.msg}</td>
                        <td>${r.img ? `<img src="${r.img}" width="50">` : ""}</td>
                        <td>${r.status}</td>
                        <td>
                            ${r.status === "pending" ? `<button class="primary" onclick="resolveReport(${r.id})">Resolve</button>` : ""}
                            <button class="danger" onclick="deleteReport(${r.id})">Delete</button>
                        </td>
                    </tr>`;
                myReportTable.innerHTML += `
                    <tr>
                        <td>${r.addr}</td>
                        <td>${r.msg}</td>
                        <td>${r.status}</td>
                    </tr>`;
            });

            updateStats();
        });
}

function deleteReport(id) {
    if (!confirm("Delete this report?")) return;
    fetch("backend/delete_report.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }).then(() => fetchReports());
}

// ------------------ Officials ------------------
function fetchOfficials() {
    fetch("backend/fetch_officials.php")
        .then(res => res.json())
        .then(data => {
            officialsTable.innerHTML = "";
            data.forEach(o => {
                officialsTable.innerHTML += `
                    <tr>
                        <td>${o.name}</td>
                        <td>${o.pos}</td>
                        <td>${o.bd}</td>
                        <td>${calcAge(o.bd)}</td>
                        <td>${o.term}</td>
                    </tr>`;
            });
        });
}

function calcAge(bd) {
    const birth = new Date(bd), now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    if (now < new Date(now.getFullYear(), birth.getMonth(), birth.getDate())) age--;
    return age;
}

// ------------------ Stats ------------------
function fetchStats() {
    fetch("backend/fetch_stats.php")
        .then(res => res.json())
        .then(data => {
            resCount.innerText = data.residents;
            reqCount.innerText = data.pending_requests;
            appCount.innerText = data.approved_requests;
            repCount.innerText = data.reports_total;
            repPending.innerText = data.reports_pending;
            repResolved.innerText = data.reports_resolved;
        });
}

// ------------------ Fetch all for admin ------------------
function fetchAll() {
    fetchResidents();
    fetchAnnouncements();
    fetchRequests();
    fetchReports();
    fetchOfficials();
}

// Initial load
show("dashboard");
fetchAll();
