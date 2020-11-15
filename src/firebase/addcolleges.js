import { firestore } from "firebase";

const AddCOlleges = () => {
  var colleges = [
    {
      name: "Torrens University",
      courses: [
        {
          name: "Diploma of Business",
          annualFees: "22800",
          location: {
            values: ["Adelaide", "Sydney", "Melbourne", "Brisbane", "Online"],
          },
          min_ielts: "5.5",
          req_ielts: "6.0",
          req_PTE: "50",
          min_PTE: "42",
        },
        {
          name: "Bachelor of Business",
          annualFees: "22800",
          location: {
            values: ["Adelaide", "Sydney", "Melbourne", "Brisbane", "Online"],
          },
          min_ielts: "5.5",
          req_ielts: "6.0",
          req_PTE: "50",
          min_PTE: "42",
        },
        {
          name: "Bachelor of Commerce",
          annualFees: "22800",
          location: {
            values: ["Adelaide", "Sydney", "Melbourne", "Brisbane"],
          },
          min_ielts: "5.5",
          req_ielts: "6.0",
          req_PTE: "50",
          min_PTE: "42",
        },
        {
          name: "Master of Business Administration",
          annualFees: "25600",
          location: {
            values: ["Adelaide", "Sydney", "Melbourne", "Brisbane", "Online"],
          },
          min_ielts: "6.0",
          req_ielts: "6.5",
          req_PTE: "58",
          min_PTE: "50",
        },
        {
          name: "Master of Business Information Systems",
          annualFees: "25600",
          location: {
            values: ["Adelaide", "Sydney", "Melbourne", "Brisbane"],
          },
          min_ielts: "6.0",
          req_ielts: "6.5",
          req_PTE: "58",
          min_PTE: "50",
        },
        {
          name: "Master of Professional Accounting",
          annualFees: "25600",
          location: {
            values: ["Adelaide", "Sydney", "Melbourne", "Brisbane"],
          },
          min_ielts: "6.0",
          req_ielts: "6.5",
          req_PTE: "58",
          min_PTE: "50",
        },
        {
          name: "Bachelor of Digital Media (Interaction Design)",
          annualFees: "28200",
          location: {
            values: ["Sydney", "Brisbane"],
          },
          min_ielts: "5.5",
          req_ielts: "6.0",
          req_PTE: "50",
          min_PTE: "42",
        },
        {
          name: "Bachelor of Business (Hospitality Management)",
          annualFees: "24000",
          location: {
            values: ["Sydney", "Online"],
          },
          min_ielts: "5.5",
          req_ielts: "6.0",
          req_PTE: "50",
          min_PTE: "42",
        },
        {
          name: "Bachelor of Applied Public Health",
          annualFees: "26900",
          location: {
            values: ["Adelaide", "Online"],
          },
          min_ielts: "5.5",
          req_ielts: "6.0",
          req_PTE: "50",
          min_PTE: "42",
        },
      ],
    },
    {
      name: "CQ University",
      courses: [
        {
          name: "Bachelor of Business",
          annualFees: "28800",
          location: {
            values: [
              "Brisbane",
              "Bundaberg",
              "Cairns",
              "Gladstone",
              "Mackay",
              "Melbourne",
              "Perth",
              "Rockhampton",
              "Sydney",
              "Townsville",
            ],
          },
          min_ielts: "5.5",
          req_ielts: "6.0",
          req_PTE: "54",
          min_PTE: "46",
        },
        {
          name: "Master of Professional Accounting",
          annualFees: "30600",
          location: {
            values: ["Brisbane", "Melbourne", "Sydney"],
          },
          min_ielts: "5.5",
          req_ielts: "6.0",
          req_PTE: "54",
          min_PTE: "46",
        },
        {
          name: "Master of Business Management",
          annualFees: "29600",
          location: {
            values: ["Brisbane", "Melbourne", "Sydney"],
          },
          min_ielts: "5.5",
          req_ielts: "6.0",
          req_PTE: "54",
          min_PTE: "46",
        },
        {
          name: "Master of Information System",
          annualFees: "31110",
          location: {
            values: ["Brisbane", "Melbourne", "Sydney", "Rockhampton North"],
          },
          min_ielts: "5.5",
          req_ielts: "6.0",
          req_PTE: "54",
          min_PTE: "46",
        },
        {
          name: "Bachelor of Information Technology",
          annualFees: "30480",
          location: {
            values: [
              "Brisbane",
              "Melbourne",
              "Sydney",
              "Rockhampton North",
              "Townsville",
            ],
          },
          min_ielts: "5.5",
          req_ielts: "6.0",
          req_PTE: "54",
          min_PTE: "46",
        },
        {
          name: "Bachelor of Hospitality Management ",
          annualFees: "28800",
          location: {
            values: ["Brisbane", "Melbourne", "Sydney", "Perth"],
          },
          min_ielts: "5.5",
          req_ielts: "6.0",
          req_PTE: "54",
          min_PTE: "46",
        },
      ],
    },
    {
      name: "Southern Cross University",
      courses: [
        {
          name: "Bachelor of Business",
          annualFees: "26800",
          location: {
            values: ["Gold Coast"],
          },
          min_ielts: "5.5",
          req_ielts: "6.0",
          req_PTE: null,
          min_PTE: null,
        },
        {
          name: "Bachelor of Accounting",
          annualFees: "26800",
          location: {
            values: ["Gold Coast", "Lismore", "Papua New Guinea"],
          },
          min_ielts: "5.5",
          req_ielts: "6.0",
          req_PTE: null,
          min_PTE: null,
        },
        {
          name: "Bachelor of Accounting",
          annualFees: "29600",
          location: {
            values: ["Melbourne", "Perth", "Sydney"],
          },
          min_ielts: "5.5",
          req_ielts: "6.0",
          req_PTE: null,
          min_PTE: null,
        },
        {
          name: "MBA",
          annualFees: "29200",
          location: {
            values: ["Gold Coast"],
          },
          min_ielts: "6.5",
          req_ielts: "6.5",
          req_PTE: null,
          min_PTE: null,
        },
        {
          name: "MBA",
          annualFees: "32400",
          location: {
            values: ["Melbourne", "Perth", "Sydney"],
          },
          min_ielts: "6.5",
          req_ielts: "6.5",
          req_PTE: null,
          min_PTE: null,
        },
        {
          name: "Master of Information Technology",
          annualFees: "29200",
          location: {
            values: ["Gold Coast"],
          },
          min_ielts: "6.5",
          req_ielts: "6.0",
          req_PTE: null,
          min_PTE: null,
        },
        {
          name: "Master of Information Technology",
          annualFees: "32400",
          location: {
            values: ["Melbourne", "Perth", "Sydney"],
          },
          min_ielts: "6.5",
          req_ielts: "6.5",
          req_PTE: null,
          min_PTE: null,
        },
        {
          name: "Master of Professional Accounting",
          annualFees: "29200",
          location: {
            values: ["Gold Coast"],
          },
          min_ielts: "6.5",
          req_ielts: "6.5",
          req_PTE: null,
          min_PTE: null,
        },
        {
          name: "Master of Professional Accounting",
          annualFees: "32400",
          location: {
            values: ["Melbourne", "Perth", "Sydney"],
          },
          min_ielts: "6.5",
          req_ielts: "6.5",
          req_PTE: null,
          min_PTE: null,
        },
        {
          name: "Bachelor of Business in Hotel Management",
          annualFees: "27600",
          location: {
            values: ["Brisbane", "Melbourne", "Sydney"],
          },
          min_ielts: "5.5",
          req_ielts: "6.0",
          req_PTE: null,
          min_PTE: null,
        },
        {
          name: "Bachelor of IT",
          annualFees: "26800",
          location: {
            values: ["Gold Coast"],
          },
          min_ielts: "5.5",
          req_ielts: "6.0",
          req_PTE: null,
          min_PTE: null,
        },
        {
          name: "Bachelor of IT",
          annualFees: "29600",
          location: {
            values: ["Melbourne", "Perth", "Sydney"],
          },
          min_ielts: "5.5",
          req_ielts: "6.0",
          req_PTE: null,
          min_PTE: null,
        },
        {
          name: "Bachelor of Nursing",
          annualFees: "27600",
          location: {
            values: ["Gold Coast", "Lismore", "Coffs Harbour"],
          },
          min_ielts: "7.0",
          req_ielts: "7.0",
          req_PTE: null,
          min_PTE: null,
        },
      ],
    },
    {
      name: "University of Southern Queensland",
      courses: [
        {
          name: "Bachelor of Business and Commerce major finance",
          annualFees: "22640",
          location: {
            values: ["Springfield", "Toowoomba"],
          },
          min_ielts: "6.0",
          req_ielts: "6.0",
          req_PTE: null,
          min_PTE: null,
        },
        {
          name: "Bachelor of Science major Information Tech.",
          annualFees: "28800",
          location: {
            values: ["Toowoomba"],
          },
          min_ielts: "5.5",
          req_ielts: "6.0",
          req_PTE: null,
          min_PTE: null,
        },
        {
          name: "MBA",
          annualFees: "27040",
          location: {
            values: ["Springfield", "Toowoomba"],
          },
          min_ielts: "6.5",
          req_ielts: "6.5",
          req_PTE: null,
          min_PTE: null,
        },
        {
          name: "Master of Information System",
          annualFees: "28240",
          location: {
            values: ["Springfield", "Toowoomba"],
          },
          min_ielts: "6.0",
          req_ielts: "6.0",
          req_PTE: null,
          min_PTE: null,
        },
        {
          name: "Master of Professional Accounting",
          annualFees: "27040",
          location: {
            values: ["Springfield", "Toowoomba"],
          },
          min_ielts: "6.0",
          req_ielts: "6.0",
          req_PTE: null,
          min_PTE: null,
        },
      ],
    },
    {
      name: "University of Newcastle",
      courses: [
        {
          name: "Bachelor of Business",
          annualFees: "29260",
          location: {
            values: ["Newcastle city"],
          },
          min_ielts: "6.0",
          req_ielts: "6.0",
          req_PTE: null,
          min_PTE: null,
        },
        {
          name: "Bachelor of Arts",
          annualFees: "28930",
          location: {
            values: ["Newcastle city"],
          },
          min_ielts: "6.0",
          req_ielts: "6.0",
          req_PTE: null,
          min_PTE: null,
        },
        {
          name: "MBA",
          annualFees: "38195",
          location: {
            values: ["Newcastle city"],
          },
          min_ielts: "6.0",
          req_ielts: "6.5",
          req_PTE: null,
          min_PTE: null,
        },
        {
          name: "Bachelor of Commerce",
          annualFees: "29225",
          location: {
            values: ["Newcastle city"],
          },
          min_ielts: "6.0",
          req_ielts: "6.0",
          req_PTE: null,
          min_PTE: null,
        },
        {
          name: "Bachelor of Computer Science",
          annualFees: "34510",
          location: {
            values: ["Newcastle city"],
          },
          min_ielts: "6.0",
          req_ielts: "6.0",
          req_PTE: null,
          min_PTE: null,
        },
        {
          name: "Bachelor of Information Technology",
          annualFees: "34105",
          location: {
            values: ["Newcastle city"],
          },
          min_ielts: "6.0",
          req_ielts: "6.0",
          req_PTE: null,
          min_PTE: null,
        },
        {
          name: "MIT",
          annualFees: "38340",
          location: {
            values: ["Newcastle city"],
          },
          min_ielts: "6.0",
          req_ielts: "6.5",
          req_PTE: null,
          min_PTE: null,
        },
        {
          name: "Bachelor Of Nursing",
          annualFees: "34355",
          location: {
            values: ["Newcastle city"],
          },
          min_ielts: "7.0",
          req_ielts: "7.0",
          req_PTE: null,
          min_PTE: null,
        },
      ],
    },
  ];
  firestore()
    .collection("Colleges")
    .doc("Details")
    .set({ ...colleges });
};

export default AddCOlleges;
