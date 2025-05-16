import React from "react";
import ReactDom from "react-dom";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  backgroundColor: "rgb(225 214 214)",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
  height: "90%",
  width: "90%",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

export default function Modal({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button
          className="mybtn bg-danger fs-3"
          style={{ 
            padding: "0px 10px", 
            marginLeft: "90%", 
            marginTop: "-20px" 
          }}
          onClick={onClose}
        >
          {" "}
          X{" "}
        </button>
        <div style={{ color: "#c34040" }}>{children}</div>
      </div>
    </>,
    document.getElementById("cart-root")
  );
}