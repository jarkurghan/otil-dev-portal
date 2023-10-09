import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";
import hmacSHA512 from "crypto-js/hmac-sha512";

export default function stringToColor(string, index = 0.5) {
    let hash = 0;
    let i;
    const hashDigest = sha256(string);
    string = Base64.stringify(hmacSHA512(hashDigest, "mkalit"));
    for (i = 0; i < string.length; i += 1) hash = string.charCodeAt(i) + ((hash << 5) - hash);
    let color = "rgba(";
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `${value},`;
    }
    color += `${index})`;
    return color;
}
