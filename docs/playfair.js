function updateMatrixKey() {
    var a = "abc";
    var alph = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    var key = document.getElementById("key").value.toUpperCase().replace(/[^A-Z_]+/g, "");
    key = key.replace('J', 'I');
    document.getElementById("key").value = key;
    key = removeDuplicate(key + alph);
    for (let i=0; i < 26; i++) {
        document.getElementById(getRow(i).toString() + getCol(i).toString()).innerHTML = key.charAt(i);
    }
}


function crypt(message, matrixKey, isDecrypt = false) {
    var text = message.replace("J", "I");
    text = text.replace("j", "i");
    var result = "";
    var map = [];
    var k = 1; //1 => encrypt, -1 => decrypt
    if (isDecrypt == true) {
        k = -1;
    }
    for (let i=0; i < text.length; i++) {
        let codeTxt = text.charCodeAt(i);
        if ((codeTxt >= 65 && codeTxt <= 90) || (codeTxt >= 97 && codeTxt <= 122)) {
            map.push(i);
        }
    }
    if ((map.length % 2) == 1) {
        text += "X";
        map.push(text.length - 1);
    }

    for (let i=0; i < map.length; i+=2) {
        let txtA = text.charAt(map[i]);
        let codeTxtA = txtA.charCodeAt();
        let txtB = text.charAt(map[i+1]);
        let codeTxtB = txtB.charCodeAt();

        if (txtA == txtB) {
            txtB = "X";
        }

        let posA = matrixKey.indexOf(txtA.toUpperCase());
        let posB = matrixKey.indexOf(txtB.toUpperCase());
        let chrCphA = "";
        let chrChpB = "";

        if(getRow(posA) == getRow(posB)) {
            chrCphA = matrixKey.charAt((getRow(posA) * 5) + ((getCol(posA) + k) % 5));
            chrCphB = matrixKey.charAt((getRow(posB) * 5) + ((getCol(posB) + k) % 5));
        } else if(getCol(posA) == getCol(posB)) {
            chrCphA = matrixKey.charAt((((getRow(posA) + k) % 5) * 5) + (getCol(posA) % 5));
            chrCphB = matrixKey.charAt((((getRow(posB) + k) % 5) * 5) + (getCol(posB) % 5));
        } else {
            chrCphA = matrixKey.charAt((getRow(posA) * 5) + getCol(posB));
            chrCphB = matrixKey.charAt((getRow(posB) * 5) + getCol(posA));
        }

        if(isLowerCase(codeTxtA)) {
            chrCphA = chrCphA.toLowerCase();
        }
        if(isLowerCase(codeTxtB)) {
            chrCphB = chrCphB.toLowerCase();
        }
        text = text.setCharAt(map[i], chrCphA);
        text = text.setCharAt(map[i+1], chrCphB);
    }
    return text;
}

function btnEncrypt() {
    var plainText = document.getElementById("plainText").value;
    if (plainText.length == 0) {
        document.getElementById("errorMsg").innerHTML = 'Chưa nhập Plain text kìa! :D';
        return;
    }
    var matrixKey = getMatrixKey();
    if (matrixKey.length == 0) {
        document.getElementById("errorMsg").innerHTML = 'Khóa K không được để trống';
        return;
    }
    
    var cipherText = crypt(plainText, matrixKey);
    document.getElementById("cipherText").value = cipherText;
    document.getElementById("errorMsg").innerHTML = "";
}

function btnDecrypt() {
    var cipherText = document.getElementById("cipherText").value;
    if (cipherText.length == 0) {
        document.getElementById("errorMsg").innerHTML = 'Chưa nhập Cipher text kìa!';
        return;
    }
    document.getElementById("cipherText").value = cipherText;
    var matrixKey = getMatrixKey();
    if (matrixKey.length == 0) {
        document.getElementById("errorMsg").innerHTML = 'Khóa K không được để trống nhé!';
        return;
    } else if (isKeyValid(matrixKey) == false) {
        document.getElementById("errorMsg").innerHTML = 'Khóa K chứa kí tự không hợp lệ';
        return;
    }
    
    var plainText = crypt(cipherText, matrixKey, true);
    document.getElementById("plainText").value = plainText;

    document.getElementById("errorMsg").innerHTML = "";
}

function getCol(i) {
    return i % 5;
}

function getRow(i) {
    return parseInt(i/5);
}

function getMatrixKey() {
    var result = "";
    for (let i=0; i < 5; i++) {
        for (let j=0; j < 5; j++) {
            result += document.getElementById(i.toString() + j.toString()).innerHTML;
        }
    }
    return result;
}

function removeDuplicate(text) {
    var result = "";
    for (var i = 0; i < text.length; i++) {
        if (result.indexOf(text.charAt(i)) == -1) {
            result += text.charAt(i);
        }
    }
    return result;
}

function isLowerCase(code) {
    if (code >= 97 && code <= 122) {
        return true;
    }
    return false;
}

String.prototype.setCharAt = function (index, chr) {
    if(index < this.length) {
        return this.substr(0, index) + chr + this.substr(index + 1);
    }
    return this;
}