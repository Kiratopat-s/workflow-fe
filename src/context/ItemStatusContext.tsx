"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchItemsOverviewStatus } from "@/services/item/Items";
import { useAuth } from "@/context/AuthContext"; // Assuming you have an AuthContext for authentication

interface OverviewItemStatus {
  PENDING: number;
  APPROVED: number;
  REJECTED: number;
}

interface ItemStatusContextType {
  itemStatus: OverviewItemStatus;
  fetchItemStatus: () => Promise<void>;
}

const ItemStatusContext = createContext<ItemStatusContextType | undefined>(
  undefined
);

export const ItemStatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const [itemStatus, setItemStatus] = useState<OverviewItemStatus>({
    PENDING: 0,
    APPROVED: 0,
    REJECTED: 0,
  });

  const fetchItemStatus = async () => {
    try {
      const res = await fetchItemsOverviewStatus();
      setItemStatus(res);
    } catch (error) {
      console.log("Failed to fetch items overview status");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchItemStatus();

      const intervalId = setInterval(fetchItemStatus, 10000);

      return () => clearInterval(intervalId);
    }
  }, [isAuthenticated]);

  return (
    <ItemStatusContext.Provider value={{ itemStatus, fetchItemStatus }}>
      {children}
    </ItemStatusContext.Provider>
  );
};

export const useItemStatus = () => {
  const context = useContext(ItemStatusContext);
  if (!context) {
    throw new Error("useItemStatus must be used within an ItemStatusProvider");
  }
  return context;
};
