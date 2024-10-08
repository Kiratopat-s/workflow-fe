import { useAuth } from "@/context/AuthContext";
import { ItemStatus } from "@/enum/Item";
import { ItemRowProps } from "@/interface/Item";
import { Pencil, ShieldCheck } from "lucide-react";
import Link from "next/link";

const ItemRow: React.FC<ItemRowProps> = ({
  item,
  choosedIDs,
  handleCheckboxChange,
}) => {
  const { user } = useAuth();
  return (
    <tr key={item.id} className="hover:bg-base-200">
      <th>
        <label>
          <input
            type="checkbox"
            className="checkbox"
            onChange={() => handleCheckboxChange(item.id)}
            checked={choosedIDs.includes(item.id)}
          />
        </label>
      </th>
      <td>{item.id}</td>
      <td>
        {item.status === ItemStatus.PENDING ? (
          <Link
            href={`/edit/${item.id}`}
            className="cursor-pointer hover:underline flex gap-2 align-baseline"
          >
            <div className="self-center">
              <Pencil className="scale-50 text-warning" />
            </div>
            <p className="self-center">{item.title}</p>
          </Link>
        ) : (
          <div className="cursor-pointer hover:underline flex gap-2 align-baseline">
            <div className="self-center">
              <ShieldCheck className="scale-[70%] text-accent" />
            </div>
            <p className="self-center">{item.title}</p>
          </div>
        )}
        <span className="badge badge-ghost hover:badge-accent badge-sm mr-2 cursor-pointer">
          x {item.quantity}
        </span>
        {item.owner_id === user?.uid ? (
          <span className="badge badge-outline badge-accent badge-sm cursor-pointer">
            Owner
          </span>
        ) : (
          <></>
        )}
      </td>
      <th>
        <p
          className={`font-normal ${
            item.status === ItemStatus.REJECTED
              ? "line-through hover:no-underline"
              : ""
          }`}
        >
          {item.amount.toLocaleString("TH")} THB
        </p>
      </th>
      <th>
        <p
          className={` badge badge-${
            item.status === ItemStatus.APPROVED
              ? "success"
              : item.status === ItemStatus.PENDING
              ? "info"
              : "warning"
          } badge-md text-base-100`}
        >
          {item.status}
        </p>
      </th>
    </tr>
  );
};

export default ItemRow;
