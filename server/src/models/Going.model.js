const mongoose = require('mongoose');

const goingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    barId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Going = mongoose.model('Going', goingSchema);

module.exports = Going;
