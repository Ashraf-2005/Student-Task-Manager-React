function StatusBadge({ status }) {
  const style = {
    padding: "5px 10px",
    borderRadius: "5px",
    color: "white",
    backgroundColor: status === "Completed" ? "green" : "orange"
  };

  return <span style={style}>{status}</span>;
}

export default StatusBadge;