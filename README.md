# Một số loại mật mã cổ điển
## Mật mã dịch chuyển (Shift cipher)
### Caesar
#### Giới thiệu
Là một trong những mật mã đơn giản và được biết đến nhiều nhất. Tên *Caesar* được đặt theo tên của một vị hoàng đế La Mã. Nguyên tắc của mã hóa Caesar là thay thế mỗi chữ cái trong chuỗi cần mã hóa với một chữ cái cách nó một đoạn **k** cho trước trong bảng chữ cái.

Ví dụ, ta có bảng chữ cái: **ABCDEFGHIJKLMNOPQRSTUVWXYZ**

Với k=3 thì A sẽ được thay thế bằng D. Để phá mã thì ta dịch chuyển ngược lại là D sẽ thay bằng A.

Mã hóa chuỗi **"MAT MA CAESAR"** với k=3 ta sẽ có chuỗi **"PDW PD FDHVDU"**

![caesar_cipher](https://github.com/arituan/classical-cipher/raw/master/caesar_circle.gif)

Tổng quát hóa bằng toán học, với mỗi kí tự từ A->Z ta sẽ tổng quát nó thành số từ 0->25:

| A  | B  | C  | D  | E  | F  | G  | H  | I  | J  | K  | L  | M  | N  | O  | P  | Q  | R  | S  | T  | U  | V  | W  | X  | Y  | Z  |
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| 0  | 1  | 2  | 3  | 4  | 5  | 6  | 7  | 8  | 9  | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 |


Vậy ta có công thức mã hóa sau:

> C = E(P, k) = (P + k) modulo 26

Giải mã sẽ ngược lại:

> P = E(C, k) = (C - k) modulo 26

với **C** = cipher text, **P** = plain text và **k** là mã dịch chuyển *1 <= k <= 25*
#### Hiện thực bằng JavaScript
Xem mã nguồn trong file **caesar.html** và **caesar.js**
### Vigenère
#### Giới thiệu
Là loại mã hóa kết hợp cách mã hóa Caesar, ở Vigenere sử dụng một chuỗi khóa K, mỗi kí tự trong khóa K sẽ tương ứng mã hóa một kí tự trong nguyên bản (Plain text) theo cách mã hóa Caesar, trường hợp độ dài khóa K nhỏ hơn plain text thì sẽ lặp lại khóa K sao cho bằng plain text.

Ví dụ:

Ta có chuỗi plain text là: **LeHoangTuan** với khóa K là **VIGENERE**.

Khóa K sẽ được lặp lại cho bằng với plain text => **VIGENEREVIG**

Mỗi kí tự trong plain text sẽ được mã hóa Caesar với khóa k tương ứng theo thứ tự trong chuỗi khóa K. Ta sẽ được chuỗi sau khi mã hóa là: **GmNsnrxXpit**

Tổng quát hóa thành công thức để mã hóa kí tự thứ i:

> C<sub>i</sub> = (P<sub>i</sub> + k<sub>i mod m</sub>) mod 26

Công thức giải mã kí tự thứ i:

> P<sub>i</sub> = (C<sub>i</sub> - k<sub>i mod m</sub>) mod 26

với **C** = cipher text, **P** = plain text và **k** là mã dịch chuyển *1 <= k <= 25*. **m** là độ dài của chuỗi khóa k
#### Hiện thực bằng JavaScript
Xem mã nguồn trong file **vigenere.html** và **vigenere.js**
## Playfair
### Giới thiệu
Là một hệ mã hóa nhiều chữ, giảm bớt tương quan giữa văn bản mã hóa và nguyên bản bằng cách mã hóa đồng thời nhiều chữ cái (mã hóa lần lượt 2 kí tự liên tiếp nhau) của nguyên bản.

Giải thuật được thực hiện dựa trên một ma trận các chữ cái n x n(n=5 hoặc n=6) được xây dựng từ một một khóa (chuỗi các ký tự). Cách xây dựng ma trận như sau:
- Điền các chữ cái của từ khóa (bỏ các kí tự trùng)
- Nếu ma trận chưa đầy thì điền những vị trí còn lại của ma trận với các chữ cái khác của bảng chữ cái theo thứ tự A -> Z (kí tự nào có trong khóa thì không điền lại, bỏ sự trùng lặp). Kí tự I và J là tương đương nhau (nằm chung một ô)
- Đối với ma trận 6 x 6 thì I và J là hai kí tự riêng biệt và bổ sung thêm các số từ 0 -> 9.

Ví dụ: 

Với từ khóa là **HOANGTUAN** ta có ma trận sau

|   H   |	  O   |	  A   |	  N   |	  G   |
|:-----:|:-----:|:-----:|:-----:|:-----:|
| **T** |	**U** |	**B** |	**C** |	**D** |
| **E** |	**F** |	**I/J** |	**K** |	**L** |
| **M** |	**P** |	**Q** |	**R** |	**S** |
| **V** |	**W** |	**X** |	**Y** |	**Z** |

Nguyên tắc mã hóa Playfair như sau:
- Mã hóa từng cặp 2 ký tự liên tiếp nhau. Nếu dư 1 ký tự, thêm ký tự **"x"** vào cuối.
- Nếu 2 ký tự nằm cùng dòng, thay thế bằng 2 ký tự tương ứng bên phải. Ký tự ở cột cuối
cùng được thay bằng ký tự ở cột đầu tiên.
- Nếu 2 ký tự nằm cùng cột được thay bằng 2 ký tự bên dưới. Ký tự ở hàng cuối cùng
được thay bằng ký tự ở hàng trên cùng.
- Nếu 2 ký tự lập thành hình chữ nhật đươc thay bằng 2 ký tự tương ứng trên cùng dòng
ở hai góc còn lại.

![playfair](https://github.com/arituan/classical-cipher/raw/master/playfair.PNG)

Với từ khóa **HOANGTUAN**, dùng giải thuật playfair để mã hóa chuỗi **"TP HO CHI MINH"** ta được chuỗi **"UM OA TNE QKAAV"**
### Hiện thực bằng JavaScript
Xem mã nguồn trong file **playfair.html** và **playfair.js**
