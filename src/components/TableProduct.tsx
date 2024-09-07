"use client";
import { ButtonComponent } from "./ButtonComponent";
export interface product {
  image: string;
  title: string;
  amount: string;
}

interface TableProductProps {
  products: product[];
}

function TableHead({ name }: { name: string }) {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      Image
    </th>
  );
}

function TableDefaultBody({
  child,
  addOnCSS,
}: {
  child: any;
  addOnCSS: string;
}) {
  return (
    <td
      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${addOnCSS}`}
    >
      {child}
    </td>
  );
}

function TableProduct({ products }: TableProductProps) {
  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <TableHead name="Image" />
            <TableHead name="Title" />
            <TableHead name="Amount" />
            <TableHead name="Actions" />
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products ? (
            products.map((product: product, index: number) => {
              return (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-w-full h-28 object-cover rounded"
                    />
                  </td>
                  <TableDefaultBody child={product.title} addOnCSS="" />
                  <TableDefaultBody child={product.amount} addOnCSS="" />
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <ButtonComponent
                        product={product.title}
                        name="Approve"
                        color="green"
                      />
                      <ButtonComponent
                        product={product.title}
                        name="Reject"
                        color="red"
                      />
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </>
  );
}

export default TableProduct;
