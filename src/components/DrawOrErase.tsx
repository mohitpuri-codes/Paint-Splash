interface DrawOrEraseProps {
  title: string;
  onClick: () => void;
  btnState: boolean;
  isActive: boolean;
}

function DrawOrErase({ title, onClick, isActive }: DrawOrEraseProps) {
  return (
    <button
      style={{
        backgroundColor: isActive ? "red" : "green",
        color: "white",
      }}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default DrawOrErase;
