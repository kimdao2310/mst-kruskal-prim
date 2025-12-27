function startPrim() {
    statsShown = false; // Đánh dấu chưa hiển thị thống kê
    // Ghi thông tin thuật toán ra log
    log("<b>▶ Thuật toán Prim</b>");
    log("Ý tưởng: Bắt đầu từ một đỉnh, mỗi bước chọn cạnh nhỏ nhất nối cây ra ngoài.");

    // Reset thông số thống kê
    runningAlgo = "Prim";     // Thuật toán đang chạy
    totalWeight = 0;          // Tổng trọng số MST
    edgeChecked = 0;          // Số cạnh đã xét
    startTime = performance.now(); // Thời điểm bắt đầu

    const n = nodes.length;
    if (n === 0) return;      // Nếu không có đỉnh thì dừng

    // Mảng đánh dấu các đỉnh đã thuộc cây
    primVisited = Array(n).fill(false);
    primVisited[0] = true;    // Bắt đầu từ đỉnh 0

    primSteps = [];           // Danh sách các bước của thuật toán
    stepPtr = 0;

    // Mỗi vòng lặp chọn 1 cạnh để mở rộng cây (tổng n-1 cạnh)
    for (let step = 0; step < n - 1; step++) {
        primSteps.push(() => {
            let bestEdge = null;

            // Duyệt tất cả các cạnh để tìm cạnh nhỏ nhất nối cây ra ngoài
            edges.forEach(e => {
                if (primVisited[e.u] && !primVisited[e.v]) {
                    edgeChecked++;
                    if (!bestEdge || e.w < bestEdge.w) bestEdge = e;
                }
                else if (primVisited[e.v] && !primVisited[e.u]) {
                    edgeChecked++;
                    if (!bestEdge || e.w < bestEdge.w) bestEdge = e;
                }
            });

            if (!bestEdge) return;

            // Chọn cạnh nhỏ nhất
            bestEdge.color = "green";
            totalWeight += bestEdge.w;

            // Đánh dấu hai đỉnh của cạnh đã thuộc cây
            primVisited[bestEdge.u] = true;
            primVisited[bestEdge.v] = true;

            log(`✔ Chọn cạnh nhỏ nhất nối cây: (${bestEdge.u}, ${bestEdge.v}) = ${bestEdge.w}`);
            draw(); // Vẽ lại đồ thị
        });
    }

    // Bước cuối: kết thúc và hiển thị thống kê
    primSteps.push(() => {
        log("<b>✔ Prim hoàn tất</b>");
        showStats();
    });

    // Tự động chạy từng bước của thuật toán
    autoRun(primSteps);
}
