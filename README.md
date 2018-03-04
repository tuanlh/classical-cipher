# Một số loại mật mã cổ điển
## Mã dịch chuyển (Shift cipher)
## Caesar
### Giới thiệu
Là một trong những mật mã đơn giản và được biết đến nhiều nhất. Tên *Caesar* được đặt theo tên của một vị hoàng đế La Mã. Nguyên tắc của mã hóa Caesar là thay thế mỗi chữ cái trong chuỗi cần mã hóa với một chữ cái cách nó một đoạn **k** cho trước trong bảng chữ cái.

Ví dụ, ta có bảng chữ cái: **ABCDEFGHIJKLMNOPQRSTUVWXYZ**

Với k=3 thì A sẽ được thay thế bằng D. Để phá mã thì ta dịch chuyển ngược lại là D sẽ thay bằng A.

Mã hóa chuỗi **"MAT MA CAESAR"** với k=6 ta sẽ có chuỗi **"SGZ SG IGKYGX"**

Tổng quát hóa bằng toán học, với mỗi kí tự từ A->Z ta sẽ tổng quát nó thành số từ 0->25, vậy ta có công thức mã hóa sau:

````
c = E(p, k) = (p + k) modulo 26
````

Giải mã sẽ ngược lại:

```
p = E(c, k) = (c - k) modulo 26
```

với **c** = cipher text, **p** = plain text và **k** là mã dịch chuyển *1 <= k <= 25*
### Hiện thực bằng JavaScript
Xem mã nguồn trong file **caesar.html** và **caesar.js**
## Vigenère
