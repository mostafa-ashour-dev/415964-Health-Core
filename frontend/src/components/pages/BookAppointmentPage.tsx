import { useState } from "react";
import CardContent from "../shared/card/CardContent";
import CardSurface from "../shared/card/CardSurface";
import FormPageContainer from "../shared/forms/FormPageContainer";
import Input from "../shared/forms/Input";
import Text from "../shared/text/Text";
import Button from "../shared/clickables/Button";
import GridContainer from "../shared/containers/GridContainer";
import TimeSlotCard, { type TimeSlotCardProps } from "../cards/TimeSlotCard";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useGetDepartments } from "../../queries/get-queries/useGetDepartmentsQuery";
import Spinner from "../shared/animation/Spinner";
import { useGetTimeslots } from "../../queries/get-queries/useGetTimeslotQuery";
import { useGetPatientsQuery } from "../../queries/get-queries/useGetPatientsQuery";
import { useAppointmentMutation } from "../../queries/mutations/useAppointmentMutation";
import useAuth from "../../state/store";

import Swal from "sweetalert2";

export default function BookAppointmentPage() {
  const user = useAuth((state) => state.data?.user);

  const { mutate: book } = useAppointmentMutation();

  const [inputsValues, setInputsValues] = useState({
    patient: "",
    doctor: user?.role === "doctor" ? user._id : "",
    department: user?.role === "doctor" ? user.specialty._id : "",
    timeslot: "",
  });

  const { data: departments, isLoading: isDepartmentsLoading } =
    useGetDepartments();
  const { data: timeslots = [], isLoading: isTimeslotsLoading } =
    useGetTimeslots({ doctor: inputsValues.doctor, status: "free" });
  const { data: patients, isLoading: isPatientsLoading } =
    useGetPatientsQuery();

  const patientsInputOptions = patients?.data?.map((patient) => ({
    label: patient.full_name,
    value: patient._id,
  }));

  const departmentsInputOptions = departments?.data
    ?.filter((department) => department.doctors.length > 0)
    .map((department) => ({
      label: department.name,
      value: department._id,
    }));

  const doctorInputOptions = departments?.data
    ?.find((department) => department._id === inputsValues.department)
    ?.doctors?.map((doctor) => ({
      label: doctor.full_name,
      value: doctor._id,
    }));

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputsValues((prevValues) => {
      const updatedValues = {
        ...prevValues,
        [name]: value,
      };

      if (name === "department") {
        updatedValues.doctor = "";
        updatedValues.timeslot = "";
      }

      return updatedValues;
    });
  };

  const handleChooseTimeSlot = (timeSlotId: string) => {
    setInputsValues((prevValues) => ({
      ...prevValues,
      timeslot: timeSlotId,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !inputsValues.department ||
      !inputsValues.doctor ||
      !inputsValues.timeslot
    ) {
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

    book(inputsValues);
  };

  
  return (
    <>
      {isDepartmentsLoading || isPatientsLoading ? (
        <FormPageContainer
          variant="form_container_float"
          className="z-50 bg-body_background_primary"
        >
          <Spinner className="z-10" />
        </FormPageContainer>
      ) : (
        <FormPageContainer className="">
          <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
            <img
              src="/img1.png"
              alt="Book appointment image 1"
              className="absolute top-[5%] left-[15%]"
            />
            <img
              src="/img2.png"
              alt="Book appointment image 2"
              className="absolute top-[5%] right-[18%]"
            />

            <img
              src="/img3.png"
              alt="Book appointment image 3"
              className="absolute bottom-[-5%] left-[25%]"
            />
            <img
              src="/img4.png"
              alt="Book appointment image 4"
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
                  Book an appointment
                </Text>

                <div className="flex flex-col gap-5">
                  <Input
                    name="patient"
                    type="select"
                    placeholder="Select patient..."
                    label="Patient"
                    options={patientsInputOptions}
                    variant="input_modern"
                    className="min-w-full"
                    onChange={handleInputChange}
                    value={inputsValues.patient}
                  />
                  {user?.role === "admin" && (
                    <>
                      <Input
                        name="department"
                        type="select"
                        placeholder="Select the department..."
                        label="Department"
                        options={departmentsInputOptions}
                        variant="input_modern"
                        className="min-w-full"
                        onChange={handleInputChange}
                        value={inputsValues.department}
                      />

                      <Input
                        name="doctor"
                        type="select"
                        placeholder="Select preferred doctor..."
                        label="Doctor"
                        options={doctorInputOptions}
                        variant="input_modern"
                        className="min-w-full"
                        onChange={handleInputChange}
                        value={inputsValues.doctor}
                      />
                    </>
                  )}

                  <div className="w-full bg-body_accent_secondary border border-body_border_primary p-input rounded-card_classic">
                    <Text variant="body_lg">
                      {timeslots?.data?.length > 0 ? "Selected prefered time slot..." : "No timeslots available"}
                    </Text>

                    <GridContainer
                      data={timeslots?.data}
                      cols={1}
                      scrollable
                      scrollDir="horizontal"
                      loading={isTimeslotsLoading}
                      loadingComponent={<Spinner />}
                      scrollFit
                      renderItem={(item: TimeSlotCardProps, index) => {
                        return (
                          <div
                            key={index}
                            onClick={() => {
                              handleChooseTimeSlot(item._id);
                            }}
                            className="relative cursor-pointer"
                          >
                            {inputsValues.timeslot === item._id && (
                              <CheckCircleIcon className="text-body_accent_primary size-4 absolute top-[10px] right-[10px]" />
                            )}
                            <TimeSlotCard
                              {...(item as TimeSlotCardProps)}
                              variant="time_slot_minimized"
                            />
                          </div>
                        );
                      }}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  variant="button_modern_primary"
                  className="mt-6 w-full"
                  disabled={
                    !inputsValues.department ||
                    !inputsValues.doctor ||
                    !inputsValues.timeslot
                  }
                  type="submit"
                >
                  Book
                </Button>
              </CardContent>
            </form>
          </CardSurface>
        </FormPageContainer>
      )}
    </>
  );
}
