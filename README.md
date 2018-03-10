# Một số loại mật mã cổ điển
## Mật mã dịch chuyển (Shift cipher)
Hai đại diện tiêu biểu của mật mã dịch chuyển là **Caesar** và **Vigenère**
### Mật mã Caesar
#### Tổng quan về caesar
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
#### Hiện thực caesar bằng JavaScript
Chúng ta sẽ sử dụng công thức mã hóa và giải mã ở trên để thực hiện trên HTML/Javascript.

Nguyên liệu sẽ dùng trong Javascript:
- **[document.getElementById()](https://www.w3schools.com/jsref/met_document_getelementbyid.asp)**: sử dụng DOM để tương tác với HTML, lấy input và trả về output.
- **[String.prototype.charAt(index)](https://www.w3schools.com/jsref/jsref_charat.asp)**: lấy ra kí tự thứ i trong chuỗi. (sử dụng ``charAt()`` an toàn hơn việc get index trực tiếp bằng toán tử ``[]``)
- **[String.prototype.charCodeAt(ihdex)](https://www.w3schools.com/jsref/jsref_charCodeAt.asp)**: lấy mã ASCII của kí tự thứ i.
- **[String.fromCharCode(ascii_number)](https://www.w3schools.com/jsref/jsref_fromCharCode.asp)**: in ra kí tự từ mã ASCII.
- **[String.prototype.toUpperCase()](https://www.w3schools.com/jsref/jsref_touppercase.asp)**: chuyển đổi chuỗi sang in hoa.
- **%**: phép tính modulo.

Để thực hiện được công thức trên thì ta cần quy đổi mỗi kí tự trong nguyên bản (plaintext) ra mã ASCII, ta sử dụng    ``charCodeAt()`` trong class String để đổi một kí tự trong chuỗi sang mã ASCII. Ví dụ:

````Javascript
var str = "ABC";
document.write(str.charCodeAt(0));
//output: 65
````

Ta đã biết kí tự từ A->Z có mã là 65->90 trong bảng mã ASCII, sau đó lấy mã ASCII của kí tự đó trừ đi 65 để lấy thứ tự của kí tự (phạm vi từ 0->25), đối với các kí tự thường a->z thì trừ đi 97. Các khoảng trắng và kí tự khác thì bỏ qua (nằm ngoại phạm vi 65->90 và 97->122) Sau đó thực hiện công thức như đã dẫn ở trên để mã hóa. Đối với key thì đầu tiên ta cần chuyển các kí tự của key sang in hoa hết (sử dụng ``toUpperCase()``) cho bước xử lí đơn giản, sau đó quy đổi như nguyên bản.

Sau khi áp dụng công thức và ra được kết quả thì cộng lại với 65 (đối với kí tự in hoa) hoặc 97 (đối với kí tự thường), và dùng hàm ``fromCharCode()`` để thực chuyển đổi từ ASCII ra kí tự.

Giải mã thì cũng tương tự nhưng ta cần biến đổi key một chút, ta thực hiện lấy 26 trừ đi **k** được key mới, và lấy key mới này áp dụng vào công thức mã hóa sẽ giải mã được.
Xem mã nguồn trong file **caesar.html** và **caesar.js**

### Mật mã Vigenère
#### Tổng quan về Vigenère
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
#### Hiện thực Vigenère bằng JavaScript
Tương tự như ở Caesar nhưng lúc này key không còn là một kí tự nữa mà là một chuỗi kí tự, việc mã hóa và giải như caesar.
Xem mã nguồn trong file **vigenere.html** và **vigenere.js**
## Playfair
### Tổng quan về Playfair
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
### Hiện thực Playfair bằng JavaScript
Các công đoạn mà ta cần thực hiện:
- Tạo bảng khóa K.
- Tách chuỗi nguyên bản thành từng cặp 2 kí tự liên tiếp nhau.
- Đối chiếu bảng khóa và tìm ra các cặp 2 kí tự thay thế.

**Bước 1: tạo bảng khóa K.** 

Trên HTML tạo một bảng gồm 5 dòng và 5 cột (dùng thẻ ``<table>``) và gán Id cho các thẻ ``<td>`` từ **00** đến **44**. Sau đó gán cho các ô giá trị từ A->Z. Việc cần làm tiếp theo gắn khóa Key mà người dùng nhập vào bảng khóa.

Tạo một chuỗi Alphabet gồm 25 kí tự từ A->Z (bỏ **J** đi, xem **I** và **J** là tương đương nhau).

````Javascript
var alph = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
````

Thực hiện nối chuỗi key mà người dùng nhập vào và ``alph``, sau đó thực hiện loại bỏ kí tự trùng lặp bằng hàm sau:

````Javascript
function removeDuplicate(text) {
    var result = "";
    for (var i = 0; i < text.length; i++) {
        if (result.indexOf(text.charAt(i)) == -1) {
            result += text.charAt(i);
        }
    }
    return result;
}
````

Sau đó cập nhật chuỗi khóa vào bảng khóa bằng ``document.getElementById(#Id).innerHTML``

**Bước 2: tách chuỗi nguyên bản thành từng cặp 2 kí tự liên tiếp nhau.**

Việc tách này phải thỏa mãn: chỉ lấy các kí tự từ A->Z, a->z. Còn lại bỏ qua.

Chúng ta không thể sử dụng phương pháp loại bỏ các khoảng trắng và kí tự đặc biệt ra khỏi chuỗi rồi tách ra từng cặp xử lí được, vì như thế khi xuất ra kết quả giải mã sẽ làm mất đi hết các khoảng trắng và các kí tự khác. Tức là mình chỉ mã hóa các kí tự Alphabet, còn lại vẫn giữ nguyên để xuất kết quả.

Vậy thì làm cách nào? Chúng ta sẽ dùng một mảng có chức năng để map dictionary **vị trí** các kí tự Alphabetic trong chuỗi nguyên bản lại, rồi bắt từng cặp phần tử trong map đó đem xử lí. Lưu ý là chúng ta chỉ map vị trí lại từng cặp thôi.

**Bước 3: Đối chiếu bảng khóa và tìm ra các cặp 2 kí tự thay thế.**


Xem mã nguồn trong file **playfair.html** và **playfair.js**
