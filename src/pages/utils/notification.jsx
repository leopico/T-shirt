import Toastify from "toastify-js";

const successNotify = (msg) => {
  Toastify({
    text: msg,
    gravity: "top",
    position: "center",
    duration: 1000,
    style: {
      background: "#E2DBD1",
      color: "black",
    },
  }).showToast();
};

const errorNotify = (msg) => {
  Toastify({
    text: msg,
    gravity: "top",
    position: "center",
    duration: 1000,
    style: {
      background: "#ff4f30",
      color: "white",
    },
  }).showToast();
};

export { successNotify, errorNotify };
