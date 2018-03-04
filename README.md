# Một số loại mật mã cổ điển
## Mật mã dịch chuyển (Shift cipher)
### Caesar
#### Giới thiệu
Là một trong những mật mã đơn giản và được biết đến nhiều nhất. Tên *Caesar* được đặt theo tên của một vị hoàng đế La Mã. Nguyên tắc của mã hóa Caesar là thay thế mỗi chữ cái trong chuỗi cần mã hóa với một chữ cái cách nó một đoạn **k** cho trước trong bảng chữ cái.

Ví dụ, ta có bảng chữ cái: **ABCDEFGHIJKLMNOPQRSTUVWXYZ**

Với k=3 thì A sẽ được thay thế bằng D. Để phá mã thì ta dịch chuyển ngược lại là D sẽ thay bằng A.

Mã hóa chuỗi **"MAT MA CAESAR"** với k=3 ta sẽ có chuỗi **"PDW PD FDHVDU"**

![caesar_cipher](https://github.com/arituan/classical-cipher/raw/master/caesar_circle.gif)

Tổng quát hóa bằng toán học, với mỗi kí tự từ A->Z ta sẽ tổng quát nó thành số từ 0->25, vậy ta có công thức mã hóa sau:

> C = E(P, k) = (P + k) modulo 26


Giải mã sẽ ngược lại:

> P = E(C, k) = (C - k) modulo 26

với **C** = cipher text, **P** = plain text và **k** là mã dịch chuyển *1 <= k <= 25*
#### Hiện thực bằng JavaScript
Xem mã nguồn trong file **caesar.html** và **caesar.js**
### Vigenère
#### Giới thiệu
Là loại mã hóa kết hợp cách mã hóa Caesar, ở Vigenere sử dụng một chuỗi khóa K, mỗi kí tự trong khóa K sẽ tương ứng mã hóa một kí tự trong văn bản ban đầu (Plain text) theo cách mã hóa Caesar, trường hợp độ dài khóa K nhỏ hơn plain text thì sẽ lặp lại khóa K sao cho bằng plain text.

Ví dụ:

Ta có chuỗi plain text là: **LeHoangTuan** với khóa K là **VIGENERE**.

Khóa K sẽ được lặp lại cho bằng với plain text => **VIGENEREVIG**

Mỗi kí tự trong plain text sẽ được mã hóa Caesar với khóa k tương ứng theo thứ tự trong chuỗi khóa K. Ta sẽ được chuỗi sau khi mã hóa là: **GmNsnrxXpit**

Tổng quát hóa thành công thức để mã hóa kí tự thứ i:

C<sub>i</sub> = (P<sub>i</sub> + k<sub>i mod m</sub>) mod 26

Công thức giải mã kí tự thứ i:

P<sub>i</sub> = (C<sub>i</sub> - k<sub>i mod m</sub>) mod 26

với **C** = cipher text, **P** = plain text và **k** là mã dịch chuyển *1 <= k <= 25*. **m** là độ dài của chuỗi khóa k
#### Hiện thực bằng JavaScript
Xem mã nguồn trong file **vigenere.html** và **vigenere.js**
## Playfair
### Giới thiệu

### Hiện thực bằng JavaScript
Xem mã nguồn trong file **playfair.html** và **playfair.js**
