
function crypt(text, key, isDecrypt = false) {
    var result = "";
    for (var i = 0; i < text.length; i++) {
        var codeTxt = text.charCodeAt(i);
        var codeKey = key.charCodeAt(i % key.length) - 65;
        if (isDecrypt == true) {
            codeKey = 26 - codeKey;
        }
        if (codeTxt >= 65 && codeTxt <= 90) { 
            let resultCode = ((codeTxt - 65) + codeKey) % 26;
            result += String.fromCharCode(resultCode + 65);
        } else if (codeTxt >= 97 && codeTxt <= 122) {
            let resultCode = ((codeTxt - 97) + codeKey) % 26;
            result += String.fromCharCode(resultCode + 97);
        } else {
            result += text.charAt();
        }
    }
    return result;
}

function isKeyValid(key) {
    for (var i = 0; i < key.length; i++) {
        codeKey = key.charCodeAt(i);
        if (codeKey < 65 || codeKey > 90) {
            return false;
        }
    }
    return true;
}

function btnEncrypt() {
    var plainText = document.getElementById("plainText").value;
    if (plainText.length == 0) {
        document.getElementById("errorMsg").innerHTML = 'Chưa nhập Plain text kìa! :D';
        return;
    }
    var key = document.getElementById("key").value.toUpperCase();
    if (key.length == 0) {
        document.getElementById("errorMsg").innerHTML = 'Khóa K không được để trống';
        return;
    } else if (isKeyValid(key) == false) {
        document.getElementById("errorMsg").innerHTML = 'Khóa K chứa kí tự không hợp lệ';
        return;
    }
    document.getElementById("key").value = key;
    var cipherText = crypt(plainText, key);
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
    var key = document.getElementById("key").value.toUpperCase();
    if (key.length == 0) {
        document.getElementById("errorMsg").innerHTML = 'Khóa K không được để trống nhé!';
        return;
    } else if (isKeyValid(key) == false) {
        document.getElementById("errorMsg").innerHTML = 'Khóa K chứa kí tự không hợp lệ';
        return;
    }
    document.getElementById("key").value = key;
    var plainText = crypt(cipherText, key, true);
    document.getElementById("plainText").value = plainText;

    document.getElementById("errorMsg").innerHTML = "";
}
