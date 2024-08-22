import { toast } from "react-toastify";

export default function lucatch(err) {
    console.log(err);
    const text = err?.response?.data || err?.message || "An error occurred";
    toast.error(text);
}
