import React from "react";

const CollageSelection = ({ onSelectTemplate }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "60px",
        left: "10px",
        background: "#fff",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        display: "flex",
        gap: "10px",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {/* ✅ 网格拼贴 */}
      <div
        onClick={() => onSelectTemplate("grid")}
        style={{
          width: "100px",
          height: "140px",
          display: "grid",
          gridTemplateRows: "1fr 1fr",
          gridTemplateColumns: "1fr 1fr",
          gap: "4px",
          backgroundColor: "#fff",
          border: "2px solid white",
          padding: "4px",
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)")}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
      >
        <div style={{ backgroundColor: "#ccc", gridColumn: "1 / span 2", height: "40px" }}></div>
        <div style={{ backgroundColor: "#ccc", height: "40px" }}></div>
        <div style={{ backgroundColor: "#ccc", height: "40px" }}></div>
      </div>

      {/* ✅ 线性拼贴 */}
      <div
        onClick={() => onSelectTemplate("linear")}
        style={{
          width: "100px",
          height: "140px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          backgroundColor: "#fff",
          border: "2px solid white",
          padding: "4px",
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)")}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
      >
        <div style={{ backgroundColor: "#ccc", height: "40px" }}></div>
        <div style={{ backgroundColor: "#ccc", height: "40px" }}></div>
        <div style={{ backgroundColor: "#ccc", height: "40px" }}></div>
      </div>

      {/* ✅ 添加按钮 (加号) */}
      <div
        style={{
          position: "relative",
          height: "140px",
          width: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ccc",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)")}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
        onClick={() => onSelectTemplate("add")}
      >
        <div
          style={{
            position: "absolute",
            width: "50%",
            height: "10px",
            backgroundColor: "white",
            borderRadius: "5px",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            height: "50%",
            width: "10px",
            backgroundColor: "white",
            borderRadius: "5px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default CollageSelection;
