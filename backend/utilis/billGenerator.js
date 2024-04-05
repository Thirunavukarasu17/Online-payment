function generateBill(order) {
    const itemsSum = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const totalAmount = itemsSum + order.deliveryFee + order.containerCharges;

    // Generate bill object
    const bill = {
        orderId: order._id,
        items: order.items,
        itemsSum,
        deliveryFee: order.deliveryFee,
        containerCharges: order.containerCharges,
        totalAmount
    };

    return bill;
}

module.exports = {
    generateBill
};
