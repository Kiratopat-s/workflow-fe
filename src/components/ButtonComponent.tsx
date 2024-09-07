function OnClickHandler(event: any) {
  const innerText = event.target.name;
  alert(innerText);
}
export function ButtonComponent({
  name,
  color,
}: {
  name: string;
  color: string;
}) {
  return (
    <button
      name={name}
      onClick={OnClickHandler}
      className={`bg-${color}-500 hover:bg-${color}-600 text-white px-4 py-2 rounded`}
    >
      {name}
    </button>
  );
}
