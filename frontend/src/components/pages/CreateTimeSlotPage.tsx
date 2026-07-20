import { useState } from "react";
import CardContent from "../shared/card/CardContent";
import CardSurface from "../shared/card/CardSurface";
import FormPageContainer from "../shared/forms/FormPageContainer";
import Input from "../shared/forms/Input";
import Text from "../shared/text/Text";
import Button from "../shared/clickables/Button";
import Swal from "sweetalert2";
import { useTimeslotMutation } from "../../queries/mutations/useTimeslotMutation";

interface TimeslotInputValues {
  date: string;
  fromTime: string;
  toTime: string;
}

interface TimeslotDates {
  startDateTime: Date;
  endDateTime: Date;
}

export default function CreateTimeSlotPage() {
  const { mutate: createTimeslot, isPending } = useTimeslotMutation();

  const [inputsValues, setInputsValues] = useState<TimeslotInputValues>({
    date: "",
    fromTime: "",
    toTime: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputsValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const getTimeslotDates = (): TimeslotDates | null => {
    if (!inputsValues.date || !inputsValues.fromTime || !inputsValues.toTime)
      return null;

    const startDateTime = new Date(
      `${inputsValues.date}T${inputsValues.fromTime}`,
    );
    const endDateTime = new Date(`${inputsValues.date}T${inputsValues.toTime}`);

    return { startDateTime, endDateTime };
  };

  const isInvalidTimeRange = (): boolean => {
    const dates = getTimeslotDates();
    if (!dates) return false;
    return dates.endDateTime.getTime() <= dates.startDateTime.getTime();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputsValues.date || !inputsValues.fromTime || !inputsValues.toTime) {
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "error",
        text: "All fields are required",
      });
      return;
    }

    const dates = getTimeslotDates();

    if (dates && dates.startDateTime.getTime() < Date.now()) {
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "error",
        text: "Can't create timeslots in past",
      });
      return;
    }

    if (isInvalidTimeRange()) {
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "error",
        text: "Ending time must be after starting time",
      });
      return;
    }

    createTimeslot(inputsValues);
  };

  return (
    <FormPageContainer className="">
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
        <img
          src="/img1.png"
          alt="Timeslot image 1"
          className="absolute top-[5%] left-[15%]"
        />
        <img
          src="/img2.png"
          alt="Timeslot image 2"
          className="absolute top-[5%] right-[18%]"
        />
        <img
          src="/img3.png"
          alt="Timeslot image 3"
          className="absolute bottom-[-5%] left-[25%]"
        />
        <img
          src="/img4.png"
          alt="Timeslot image 4"
          className="absolute bottom-[-5%] right-[15%]"
        />
      </div>
      <CardSurface className="min-w-[500px] max-w-[500px] backdrop-blur-lg bg-body_background_secondary/70">
        <form onSubmit={handleSubmit}>
          <CardContent
            className="items-stretch justify-center !w-full"
            variant="card_content_lg"
          >
            <Text
              variant="body_3xl"
              as="h1"
              className="text-center font-semibold mb-10"
            >
              Create timeslot
            </Text>

            <div className="flex flex-col gap-5">
              <Input
                name="date"
                type="date"
                placeholder="Enter date..."
                label="Date"
                variant="input_modern"
                className="min-w-full"
                onChange={handleInputChange}
                value={inputsValues.date}
              />

              <div className="grid grid-cols-2 gap-5 w-full">
                <Input
                  name="fromTime"
                  type="time"
                  placeholder="From..."
                  label="Starting time"
                  variant="input_modern"
                  className="w-full"
                  onChange={handleInputChange}
                  value={inputsValues.fromTime}
                />
                <Input
                  name="toTime"
                  type="time"
                  placeholder="To..."
                  label="Ending time"
                  variant="input_modern"
                  className="w-full"
                  onChange={handleInputChange}
                  value={inputsValues.toTime}
                />
              </div>
            </div>

            <Button
              variant="button_modern_primary"
              className="mt-6 w-full"
              disabled={
                !inputsValues.date ||
                !inputsValues.fromTime ||
                !inputsValues.toTime ||
                isInvalidTimeRange()
              }
              loading={isPending}
              type="submit"
            >
              Create Slot
            </Button>
          </CardContent>
        </form>
      </CardSurface>
    </FormPageContainer>
  );
}
