const Notification = ({ message, messageType }) => {
  let selectedStyle;
  const successStyle = {
    color: "green",
    fontStyle: "italic",
    borderRadius: "5px",
    fontSize: "2em",
    border: "0.2em solid green",
  };
  const errorStyle = {
    color: "red",
    fontStyle: "bold",
    borderRadius: "5px",
    fontSize: "2em",
    border: "0.2em dashed red",
  };

  messageType === "error"
    ? (selectedStyle = errorStyle)
    : (selectedStyle = successStyle);

  if (message === null) return null;

  return (
    <div style={selectedStyle} className="notification">
      {message}
    </div>
  );
};

export default Notification;
