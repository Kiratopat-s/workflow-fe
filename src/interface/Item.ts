
export interface itemStatus {
    status: "APPROVED" | "PENDING" | "REJECTED";
}
export interface itemProps extends itemStatus {
    id: number;
    title: string;
    amount: number;
    quantity: number;
    owner_id: number;
}

export interface ItemRowProps {
    item: itemProps;
    choosedIDs: number[];
    handleCheckboxChange: (id: number) => void;
}

export interface OverviewItemStatus {
    PENDING: number;
    APPROVED: number;
    REJECTED: number;
}

export interface ItemStatusContextType {
    itemStatus: OverviewItemStatus;
    fetchItemStatus: () => Promise<void>;
}