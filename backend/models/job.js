const mongoose=require("mongoose")

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: {
      type: String,
      required: [true, "Please add a company name"],
    },
    role: {
      type: String,
      required: [true, "Please add a role/position"],
    },
    status: {
      type: String,
      enum: [
        "Wishlist",
        "Applied",
        "Assessment",
        "Interviewing",
        "Rejected",
        "Offered",
      ],
      default: "Wishlist",
    },
    applicationLink: {
      type: String,
    },
    resumeVersion: {
      type: String, // e.g., 'Backend V2', 'Fullstack React'
      default: "Standard",
    },
    appliedDate: {
      type: Date,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

module.exports = mongoose.model("Job", jobSchema);

