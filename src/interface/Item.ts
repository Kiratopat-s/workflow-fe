export interface itemProps {
    id: number;
    title: string;
    amount: number;
    quantity: number;
    status: "APPROVED" | "PENDING" | "REJECTED";
}

export interface ItemRowProps {
    item: itemProps;
    choosedIDs: number[];
    handleCheckboxChange: (id: number) => void;
}