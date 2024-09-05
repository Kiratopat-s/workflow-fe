import TableProduct, { product } from "@/components/TableProduct";

export default function Home() {
  const mockData: product[] = [
    {
      image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
      title: "Monitor",
      amount: "$2500.00",
    },
    {
      image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
      title: "Hard Disk/SSD",
      amount: "$2000.75",
    },
    {
      image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
      title: "Monitor",
      amount: "$2500.00",
    },
    {
      image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
      title: "Hard Disk/SSD",
      amount: "$2000.75",
    },
  ];
  return (
    <main>
      <TableProduct products={mockData} />
    </main>
  );
}
