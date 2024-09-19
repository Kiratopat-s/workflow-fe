"use client";
import {
  OctagonAlert,
  RotateCw,
  Search,
  SearchCheck,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import useDebounce from "@/utils/debounce";
import ItemRow from "@/components/dashboard/ItemRow";
import toast from "react-hot-toast";
import {
  UpdateItemStatus,
  DeleteItems,
  fetchItemsDashboard,
} from "@/services/item/Items";
import { itemProps } from "@/interface/Item";
import { useItemStatus } from "@/context/ItemStatusContext";
import { useAuth } from "@/context/AuthContext";

function Dashboard() {
  const { user } = useAuth();
  const [items, setItems] = useState<itemProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<itemProps[]>([]);
  const { fetchItemStatus } = useItemStatus();

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      )
    );
  }, [debouncedSearchQuery, items]);

  const [choosedIDs, setChoosedIDs] = useState<number[]>([]);

  const handleCheckboxChange = (id: number) => {
    setChoosedIDs((prevIDs) => {
      if (prevIDs.includes(id)) {
        return prevIDs.filter((choosedID) => choosedID !== id);
      } else {
        return [...prevIDs, id];
      }
    });
  };

  const ApproveHandler = async () => {
    if (await UpdateItemStatus({ status: "APPROVED" }, choosedIDs)) {
      await fetchItems();
      setChoosedIDs([]);
    }
  };

  const RejectHandler = async () => {
    if (await UpdateItemStatus({ status: "REJECTED" }, choosedIDs)) {
      await fetchItems();
      setChoosedIDs([]);
    }
  };

  const DeleteHandler = async () => {
    await DeleteItems(choosedIDs);
    await fetchItems();
    setChoosedIDs([]);
  };

  async function fetchItems() {
    const startTimer = Date.now();
    try {
      const res = await fetchItemsDashboard();
      setItems(res);
      toast.success(`Fetched items in ${Date.now() - startTimer}ms`);
      await fetchItemStatus();
    } catch (error) {
      toast.error("Failed to fetch items");
      console.log(error);
    }
  }

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute top-[10%] flex flex-col h-screen w-full justify-start items-center gap-8">
      <div className="w-full max-w-md md:max-w-4xl lg:max-w-6xl overflow-x-auto bg-base-100 p-8 rounded-md shadow-md">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            onChange={handleSearchChange}
            className="grow"
            placeholder="Search"
          />
          <Search />
        </label>
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label className="flex flex-col justify-center">
                  {/* Select all checkbox */}
                  <input
                    type="checkbox"
                    className="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setChoosedIDs(filteredItems.map((item) => item.id));
                      } else {
                        setChoosedIDs([]);
                      }
                    }}
                  />
                </label>
              </th>
              <th className="flex gap-2">
                <div
                  onClick={() => {
                    fetchItems();
                  }}
                  className="btn btn-ghost"
                >
                  <RotateCw />
                </div>
                <div className="relative">
                  <div className="absolute flex gap-2">
                    {choosedIDs.length > 0 && (
                      <>
                        {user?.position === "Admin" && (
                          <>
                            <div
                              onClick={ApproveHandler}
                              className="btn btn-success text-base-300"
                            >
                              <SearchCheck />
                              Approve
                            </div>
                            <div
                              onClick={RejectHandler}
                              className="btn btn-warning text-base-300"
                            >
                              <OctagonAlert />
                              Reject
                            </div>
                          </>
                        )}
                        <div
                          onClick={DeleteHandler}
                          className="btn btn-error text-base-300"
                        >
                          <Trash2 />
                          Delete
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </th>
            </tr>
            <tr>
              <th>
                <p className=" hidden badge badge-info"></p>
                <p className=" hidden badge badge-error"></p>
                <p className=" hidden badge badge-success"></p>
                <p className=" hidden badge badge-warning"></p>
              </th>
              <th>ID</th>
              <th>Title</th>
              <th>Budget</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="h-[20%] overflow-scroll">
            {filteredItems.map((item: itemProps) => (
              <ItemRow
                key={item.id}
                item={item}
                choosedIDs={choosedIDs}
                handleCheckboxChange={handleCheckboxChange}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
