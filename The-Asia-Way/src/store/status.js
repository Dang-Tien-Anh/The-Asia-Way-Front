// Food status
export const ORDER_ITEM_STATUS = {
    PENDING: "PENDING",     // mới order
    PREPARING: "PREPARING", // đang làm
    DONE: "DONE",           // đã hoàn thành
    SERVED: "SERVED",       // đã phục vụ khách
};

// Status color (order)
export const ORDER_STATUS_COLORS = {
    [ORDER_ITEM_STATUS.PENDING]: "secondary", // gray
    [ORDER_ITEM_STATUS.PREPARING]: "warning", // yellow
    [ORDER_ITEM_STATUS.DONE]: "success",      // green
    [ORDER_ITEM_STATUS.SERVED]: "info",       // blue
};

// Table status
export const TABLE_STATUS = {
    EMPTY: "EMPTY",       // bàn trống
    RESERVED: "RESERVED", // đã đặt trước
    OCCUPIED: "OCCUPIED", // đang có khách
};

// Status color (table)
export const TABLE_STATUS_COLORS = {
    [TABLE_STATUS.EMPTY]: "success",   // green
    [TABLE_STATUS.RESERVED]: "primary",// blue
    [TABLE_STATUS.OCCUPIED]: "warning" // yellow
};
