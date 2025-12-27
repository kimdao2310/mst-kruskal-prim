function generateGraph() {
    resetAll(); 
    // Xóa toàn bộ dữ liệu đồ thị cũ (đỉnh, cạnh, log, trạng thái thuật toán)

    const n = 6; 
    // Số lượng đỉnh của đồ thị là 6

    for (let i = 0; i < n; i++) {
        nodes.push({
            id: i, 
            // ID của đỉnh

            x: 80 + Math.random() * 700, 
            // Tọa độ X ngẫu nhiên để vẽ đỉnh trên canvas

            y: 60 + Math.random() * 300 
            // Tọa độ Y ngẫu nhiên để vẽ đỉnh trên canvas
        });
    }

    for (let i = 1; i < n; i++) {
        edges.push({ 
            u: i - 1, 
            // Đỉnh đầu của cạnh

            v: i,     
            // Đỉnh cuối của cạnh

            w: rand(), 
            // Trọng số cạnh (ngẫu nhiên từ 1 đến 20)

            color: "#999" 
            // Màu cạnh mặc định
        });
    }
    // Tạo chuỗi cạnh liên tiếp để đảm bảo đồ thị luôn liên thông

    for (let i = 0; i < n; i++)
        for (let j = i + 1; j < n; j++)
            if (Math.random() < 0.4)
                edges.push({ 
                    u: i, 
                    // Đỉnh đầu

                    v: j, 
                    // Đỉnh cuối

                    w: rand(), 
                    // Trọng số cạnh ngẫu nhiên

                    color: "#999" 
                    // Màu cạnh
                });
    // Thêm các cạnh ngẫu nhiên với xác suất 40% để đồ thị phong phú hơn

    log("✔ Đã sinh đồ thị liên thông"); 
    // Ghi thông báo vào khu vực log

    draw(); 
    // Vẽ đồ thị lên canvas
}

function rand() {
    return Math.floor(Math.random() * 20) + 1;
    // Sinh số ngẫu nhiên từ 1 đến 20 dùng làm trọng số cạnh
}
