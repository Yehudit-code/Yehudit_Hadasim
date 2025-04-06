const mongoose = require('mongoose');
const Supplier = require('./Supplier');

const OrderStatus = {
    PENDING: 'ממתין',
    IN_PROGRESS: 'בתהליך',
    COMPLETED: 'הושלמה'
};

//   module.exports = OrderStatus;

const orderSchema = new mongoose.Schema({
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    dateOrder: {
        type: Date,
        default: Date.now
    },
    status: { type: String, default: OrderStatus.PENDING }, // ממתין / בתהליך / הושלמה
});

module.exports = mongoose.model('Order', orderSchema), OrderStatus;
