function OnClickHandler(event: any) {
  const innerText = event.target.name;
  const product = event.target.getAttribute("data-product");
  alert(`${innerText} ${product}`);
}
export function ButtonComponent({
  name,
  color,
  product,
}: {
  name: string;
  color: string;
  product: string;
}) {
  return (
    <button
      name={name}
      data-product={product}
      onClick={OnClickHandler}
      className={`bg-${color}-500 hover:bg-${color}-600 text-white px-4 py-2 rounded`}
    >
      {name}
    </button>
  );
}
