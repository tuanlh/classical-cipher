function btnEncrypt() {
    document.getElementById("resultBruteforce").innerHTML = "";
    var plainText = document.getElementById("plainText").value;
    if (plainText.length == 0) {
        document.getElementById("errorMsg").innerHTML = 'Chưa nhập Plain text kìa! :D';
        return;
    }
    var key = document.getElementById("key").value.toUpperCase();
    if ((isNaN(key) && key.length > 1) || (!isNaN(key) && key.length > 2)) {
        document.getElementById("errorMsg").innerHTML = 'Khóa K bị rỗng hoặc sai!';
        return;
    }
    if (!isKeyValid(key)) {
        document.getElementById("errorMsg").innerHTML = 'Khóa K không hợp lệ.';
        return;
    }
    if (!isNaN(key)) {
        if ((parseInt(key) < 0) || (parseInt(key) > 26)) {
            document.getElementById("errorMsg").innerHTML = 'Khóa K chỉ từ 0 đến 26';
            return;
        }
        key = String.fromCharCode(parseInt(key) + 65);
    }
    //document.getElementById("key").value = key;
    var cipherText = crypt(plainText, key);
    document.getElementById("cipherText").value = cipherText;
    document.getElementById("errorMsg").innerHTML = "";
}

function crypt(text, key, isDecrypt = false) {
    var codeKey = key.charCodeAt() - 65;
    if (isDecrypt == true) {
        codeKey = 26 - codeKey;
    }
    var result = "";
    for (let i = 0; i < text.length; i++) {
        var codeTxt = text.charCodeAt(i);
        if (codeTxt >= 65 && codeTxt <= 90) {
            let resultCode = ((codeTxt - 65) + codeKey) % 26;
            result += String.fromCharCode(resultCode + 65);
        } else if (codeTxt >= 97 && codeTxt <= 122) {
            let resultCode = ((codeTxt - 97) + codeKey) % 26;
            result += String.fromCharCode(resultCode + 97);
        } else {
            result += text.charAt(i);
        }
    }
    return result;
}

function btnDecrypt() {
    document.getElementById("resultBruteforce").innerHTML = "";
    var cipherText = document.getElementById("cipherText").value;
    if (cipherText.length == 0) {
        document.getElementById("errorMsg").innerHTML = 'Chưa nhập Cipher text kìa!';
        return;
    }
    document.getElementById("cipherText").value = cipherText;
    var key = document.getElementById("key").value.toUpperCase();
    if (key.length > 1) {
        document.getElementById("errorMsg").innerHTML = 'Khóa K chỉ một ký tự thôi nhé';
        return;
    } else if (key.length == 0) {
        document.getElementById("plainText").value = "";
        var result = "<b>Tổng hợp các trường hợp phá mã:</b><br/><table><tr><th><b>Key K</b></th><th><b>PlainText</b></th></tr>";
        for (let i = 65; i <= 90; i++) {
            result += "<tr><td>" + String.fromCharCode(i) + "</td><td>" + crypt(cipherText, String.fromCharCode(i), true) + "</td></tr>";
        }
        result += "</table>";
        document.getElementById("resultBruteforce").innerHTML = result;
    } else {
        document.getElementById("key").value = key;
        var plainText = crypt(cipherText, key, true);
        document.getElementById("plainText").value = plainText;
    }

    document.getElementById("errorMsg").innerHTML = "";
}

function isKeyValid(key) {
    for (let i=0; i < key.length; i++) {
        codeKey = key.charCodeAt(i);
        if (!((codeKey >= 65 && codeKey <= 90) || (codeKey >= 48 && codeKey <= 57))) {
            return false;
        }
    }
    return true;
}
