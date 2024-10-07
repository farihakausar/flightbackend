const mongoose = require("mongoose");

const DraftSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    propertyInformation: {
      propertAddress: {
        type: String,
      },
      propertyType: {
        type: String,
      },
      rentalAmount: {
        type: String,
      },
      leaseTerm: {
        type: String,
      },
      occupationDate: {
        type: Date,
      },
    },
    role: {
      type: String,
      enum: ["South Africa Resident", "Foreign Resident", "Business"],
    },
    identificationNumber: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      identify: {
        type: String,
      },
      isVerfied: {
        type: Boolean,
      },
      identifyDocs: {
        type: String,
      },
      identificationNumber: {
        type: String,
      },
      passportNumber: {
        type: String,
      },
      businessRegistrationNumber: {
        type: String,
      },
    },
    employementType: {
      type: String,
      enum: ["Full Time employee", "Self employee", "Pensioner"],
    },
    employeeInformation: {
      CurrentEmployer: {
        type: String,
      },
      payslipDocs: {
        type: String,
      },
      employeeContract: { type: String },
      monthlyBankStatement: {
        type: String,
      },
      PositionJobTitle: {
        type: String,
      },
      EmployeeNumber: {
        type: String,
      },
      NetMonthlyIncome: {
        type: String,
      },
      line: {
        type: String,
      },
      city: {
        type: String,
      },
      YearsEmployed: {
        type: Date,
      },

      FirstName: {
        type: String,
      },
      LastName: {
        type: String,
      },
      Email: {
        type: String,
      },
      BusinessNumber: {
        type: String,
      },
      MobileNumber: {
        type: String,
      },
      payslipPdfFile: {
        type: String,
      },
      employmentContractPdfFile: {
        type: String,
      },
    },
    employmentResult: {
      type: mongoose.Schema.Types.Mixed,
    },
    referenceInformation: {
      type: String,
      enum: ["Tenant", "Home owner", "Living with parents"],
    },
    landLoadInformation: {
      current: {
        first: {
          type: String,
        },
        last: {
          type: String,
        },
        mobileNumber: {
          type: String,
        },
        email: {
          type: String,
        },
        rentalPeriod: {
          type: String,
        },
      },
      previous: {
        first: {
          type: String,
        },
        last: {
          type: String,
        },
        mobileNumber: {
          type: String,
        },
        email: {
          type: String,
        },
        rentalPeriod: {
          type: String,
        },
      },
    },
    occupants: {
      pet: {
        type: String,
      },
      additional: {
        type: String,
      },
    },
  },
  { collection: "Draft", strict: false, timestamps: true }
);

const Draft = mongoose.model("Draft", DraftSchema);

module.exports = {
  Draft,
};
