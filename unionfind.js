class UnionFind {
    constructor(n) {
        this.p = Array.from({length: n}, (_, i) => i);
        // Mảng p dùng để lưu "cha" của mỗi đỉnh
        // Ban đầu mỗi đỉnh là cha của chính nó (tạo n tập hợp rời nhau)
    }

    find(x) {
        return this.p[x] === x 
            ? x 
            : this.p[x] = this.find(this.p[x]);
        // Tìm gốc (đại diện) của đỉnh x
        // Áp dụng nén đường đi (path compression) để tối ưu tốc độ
    }

    union(a, b) {
        a = this.find(a);
        // Tìm gốc của đỉnh a

        b = this.find(b);
        // Tìm gốc của đỉnh b

        if (a === b) return false;
        // Nếu a và b đã thuộc cùng một tập hợp
        // → nối cạnh này sẽ tạo chu trình → không hợp lệ

        this.p[b] = a;
        // Gộp hai tập hợp lại bằng cách cho b trỏ về a

        return true;
        // Trả về true nếu gộp thành công (không tạo chu trình)
    }
}
