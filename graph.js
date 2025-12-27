const canvas = document.getElementById("graphCanvas");
// Lấy thẻ canvas dùng để vẽ đồ thị

const ctx = canvas.getContext("2d");
// Lấy ngữ cảnh 2D để vẽ (đỉnh, cạnh, chữ, màu sắc...)

let nodes = [];
// Mảng lưu danh sách các đỉnh của đồ thị

let edges = [];
// Mảng lưu danh sách các cạnh của đồ thị

let draggingNode = null;
// Biến lưu đỉnh đang được kéo bằng chuột (nếu có)

canvas.addEventListener("mousedown", e => {
    const {x, y} = getMouse(e);
    // Lấy tọa độ chuột tương đối so với canvas

    draggingNode = getNodeAt(x, y);
    // Kiểm tra xem chuột có bấm trúng đỉnh nào không
    // Nếu có thì gán đỉnh đó để bắt đầu kéo
});

canvas.addEventListener("mousemove", e => {
    if (!draggingNode) return;
    // Nếu không có đỉnh nào đang được kéo thì thoát

    const {x, y} = getMouse(e);
    // Lấy tọa độ chuột hiện tại

    draggingNode.x = x;
    // Cập nhật tọa độ X của đỉnh đang kéo

    draggingNode.y = y;
    // Cập nhật tọa độ Y của đỉnh đang kéo

    draw();
    // Vẽ lại đồ thị để thấy đỉnh di chuyển theo chuột
});

canvas.addEventListener("mouseup", () => draggingNode = null);
// Khi thả chuột, kết thúc việc kéo đỉnh

function getMouse(e) {
    const r = canvas.getBoundingClientRect();
    // Lấy vị trí và kích thước của canvas trên màn hình

    return { 
        x: e.clientX - r.left, 
        // Tọa độ X của chuột trong canvas

        y: e.clientY - r.top 
        // Tọa độ Y của chuột trong canvas
    };
}

function getNodeAt(x, y) {
    return nodes.find(n => Math.hypot(n.x - x, n.y - y) < 18);
    // Tìm đỉnh có khoảng cách tới vị trí chuột < 18px
    // Nếu có thì trả về đỉnh đó, dùng để chọn và kéo đỉnh
}
