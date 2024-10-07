const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    email_address: {
      type: String,
    },
    amount_net: {
      type: String,
    },
    pf_payment_id: {
      type: String,
    },
    m_payment_id: {
      type: String,
    },
    payment_status: {
      type: String,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "Payment", timestamps: true }
);

const paymentStatements = mongoose.model("Payment", paymentSchema);

module.exports = {
  paymentStatements,
};
