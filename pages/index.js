export default function Home() {
  const cardStyle = {
    backgroundColor: "#ffe4e1",
    borderRadius: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    maxWidth: "300px",
    textAlign: "center",
  };

  const titleStyle = {
    color: "#ff6f61",
    fontSize: "24px",
    marginBottom: "5px",
  };

  const emojiStyle = {
    fontSize: "60px",
    color: "#ff6f61",
  };
  return (
    <div style={cardStyle}>
      <h1 style={titleStyle}>Te amo meu xuxuzinho</h1>
      <p style={emojiStyle}>❤️</p>
    </div>
  );
}
