export default function DevBadge() {
  return (
    <div
      style={{
        position: "fixed",
        top: "12px",
        right: "16px",
        background: "rgba(0,0,0,0.6)",
        color: "white",
        padding: "6px 12px",
        borderRadius: "8px",
        fontSize: "13px",
        letterSpacing: "0.2px",
        zIndex: 99999,
        backdropFilter: "blur(6px)",
      }}
    >
      🧩 Geliştiriliyor — <span style={{ opacity: 0.8 }}>04 Kas 2025</span>
    </div>
  );
}
