function draw() {
    // Xóa toàn bộ nội dung cũ trên canvas để vẽ lại từ đầu
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Vẽ các cạnh của đồ thị
    edges.forEach(e => {
        ctx.strokeStyle = e.color || "#999"; // Màu cạnh (mặc định là xám)
        ctx.beginPath();
        ctx.moveTo(nodes[e.u].x, nodes[e.u].y); // Điểm bắt đầu của cạnh
        ctx.lineTo(nodes[e.v].x, nodes[e.v].y); // Điểm kết thúc của cạnh
        ctx.stroke();

        // Hiển thị trọng số của cạnh ở vị trí trung điểm
        ctx.fillText(
            e.w,
            (nodes[e.u].x + nodes[e.v].x) / 2,
            (nodes[e.u].y + nodes[e.v].y) / 2
        );
    });

    // Vẽ các đỉnh của đồ thị
    nodes.forEach((n, i) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 18, 0, Math.PI * 2); // Vẽ hình tròn biểu diễn đỉnh
        ctx.fillStyle = "#f9e79f";             // Màu nền của đỉnh
        ctx.fill();
        ctx.stroke();

        // Hiển thị nhãn (id) của đỉnh
        ctx.fillStyle = "#000";
        ctx.fillText(n.id, n.x - 6, n.y + 4);
    });
}
