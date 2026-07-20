
export type TimeSlot = {
  _id: string;
  date: string;       // ISO 8601 Date String
  fromTime: string;   // 24-hour format
  toTime: string;     // 24-hour format
  doctor: {
    name: string;
    specialization: string;
    profilePicture: string;
  };
  status: "busy" | "free";
};
