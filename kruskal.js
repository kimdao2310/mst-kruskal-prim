function startKruskal() {

    // Ghi tiêu đề thuật toán ra log
    log("<b>▶ Thuật toán Kruskal</b>");
    log("Ý tưởng: Luôn chọn cạnh có trọng số nhỏ nhất nhưng KHÔNG tạo chu trình.");

    // Reset các thông số thống kê
    runningAlgo = "Kruskal";   // Đánh dấu thuật toán đang chạy
    totalWeight = 0;          // Tổng trọng số cây khung
    edgeChecked = 0;          // Số cạnh đã xét
    startTime = performance.now(); // Thời điểm bắt đầu chạy

    kruskalSteps = []; // Danh sách các bước chạy thuật toán
    stepPtr = 0;       // Con trỏ điều khiển từng bước

    // Khởi tạo cấu trúc Union-Find để kiểm tra chu trình
    const uf = new UnionFind(nodes.length);

    // Sắp xếp các cạnh theo trọng số tăng dần
    const sorted = [...edges].sort((a, b) => a.w - b.w);

    // Duyệt từng cạnh theo thứ tự trọng số
    sorted.forEach(e => {
        kruskalSteps.push(() => {

            edgeChecked++; // Đếm số cạnh đã được xét
            log(`Xét cạnh (${e.u}, ${e.v}) = ${e.w}`);

            // Kiểm tra nếu thêm cạnh này có tạo chu trình không
            if (uf.union(e.u, e.v)) {
                e.color = "green";   // Cạnh được chọn
                totalWeight += e.w;  // Cộng trọng số vào MST
                log("✔ Chọn cạnh này vì KHÔNG tạo chu trình");
            } else {
                e.color = "red";     // Cạnh bị loại
                log("✘ Loại cạnh này vì tạo CHU TRÌNH");
            }

            draw(); // Vẽ lại đồ thị sau mỗi bước
        });
    });

    // Bước cuối: kết thúc thuật toán và hiển thị thống kê
    kruskalSteps.push(() => {
        log("<b>✔ Kruskal hoàn tất</b>");
        showStats();
    });

    // Tự động chạy từng bước của thuật toán
    autoRun(kruskalSteps);
}
