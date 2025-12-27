let stepPtr = 0;     // Con trỏ điều phối từng bước của thuật toán (Kruskal / Prim)
let totalWeight = 0;// Tổng trọng số của cây khung nhỏ nhất (MST)
let edgeChecked = 0;// Số cạnh đã được kiểm tra trong quá trình chạy
let startTime = 0;  // Thời điểm bắt đầu chạy thuật toán (để đo thời gian)
let runningAlgo = "";// Tên thuật toán đang chạy (Kruskal hoặc Prim)


// Thực hiện từng bước của thuật toán (chạy từng step)
function nextStep() {
    // Nếu đang chạy Kruskal thì thực hiện step của Kruskal
    if (kruskalSteps.length && stepPtr < kruskalSteps.length)
        kruskalSteps[stepPtr++]();
    // Nếu không thì chuyển sang Prim
    else if (primSteps && stepPtr < primSteps.length)
        primSteps[stepPtr++]();
}


// Reset toàn bộ dữ liệu đồ thị và giao diện
function resetAll() {
    nodes = [];   // Xóa danh sách đỉnh
    edges = [];   // Xóa danh sách cạnh
    document.getElementById("log").innerHTML = ""; // Xóa log hiển thị
    draw();       // Vẽ lại màn hình trống
}


// Ghi nội dung log ra màn hình (mô tả từng bước thuật toán)
function log(t) {
    document.getElementById("log").innerHTML += t + "<br>";
}


// Thêm một cạnh mới vào đồ thị
function addEdge() {
    const uId = +uInput.value; // Đỉnh đầu
    const vId = +vInput.value; // Đỉnh cuối
    const w = +wInput.value;   // Trọng số cạnh

    // Kiểm tra dữ liệu nhập có hợp lệ không
    if (isNaN(uId) || isNaN(vId) || isNaN(w)) return;

    // Nếu đỉnh u chưa tồn tại thì tạo mới
    let u = nodes.findIndex(n => n.id === uId);
    if (u === -1) {
        u = nodes.length;
        nodes.push({
            id: uId,
            x: Math.random() * 800 + 50, // Tọa độ x ngẫu nhiên
            y: Math.random() * 350 + 50  // Tọa độ y ngẫu nhiên
        });
    }

    // Nếu đỉnh v chưa tồn tại thì tạo mới
    let v = nodes.findIndex(n => n.id === vId);
    if (v === -1) {
        v = nodes.length;
        nodes.push({
            id: vId,
            x: Math.random() * 800 + 50,
            y: Math.random() * 350 + 50
        });
    }

    // Thêm cạnh vào danh sách cạnh của đồ thị
    edges.push({ u, v, w, color: "#999" });
    draw(); // Vẽ lại đồ thị
}


// Tự động chạy thuật toán theo từng bước (có delay)
function autoRun(steps, delay = 1200) {
    let i = 0;

    function run() {
        if (i < steps.length) {
            steps[i++]();           // Thực hiện từng bước
            setTimeout(run, delay);// Tạo hiệu ứng chạy từng bước
        }
    }
    run();
}


// Hiển thị thống kê sau khi thuật toán kết thúc
function showStats() {
    // Tính thời gian chạy thuật toán
    const time = (performance.now() - startTime).toFixed(2);

    // Thêm kết quả vào bảng thống kê
    document.getElementById("stats").innerHTML += `
        <tr>
            <td>${runningAlgo}</td>  <!-- Tên thuật toán -->
            <td>${totalWeight}</td>  <!-- Tổng trọng số MST -->
            <td>${edgeChecked}</td>  <!-- Số cạnh đã xét -->
            <td>${time}</td>         <!-- Thời gian chạy -->
        </tr>
    `;
}
