
export interface itemStatus {
    status: "APPROVED" | "PENDING" | "REJECTED";
}
export interface itemProps extends itemStatus {
    id: number;
    title: string;
    amount: number;
    quantity: number;
}

export interface ItemRowProps {
    item: itemProps;
    choosedIDs: number[];
    handleCheckboxChange: (id: number) => void;
}