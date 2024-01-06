import { toast } from "react-toastify";

export default function lucatch(err) {
    console.log(err);
    toast.error(err?.message || err?.response?.data || "An error occurred");
}
