interface itemStatus {
    status: "APPROVED" | "PENDING" | "REJECTED";
}

interface itemProps extends itemStatus {
    id: number;
    title: string;
    amount: number;
    quantity: number;
}