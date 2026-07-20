import { useState } from "react";
import CardContent from "../shared/card/CardContent";
import CardSurface from "../shared/card/CardSurface";
import FormPageContainer from "../shared/forms/FormPageContainer";
import Input from "../shared/forms/Input";
import Text from "../shared/text/Text";
import Button from "../shared/clickables/Button";
import Swal from "sweetalert2";
import { useAddPatientMutation } from "../../queries/mutations/useAddPatientMutation";

export default function AddPatientPage() {
  const { mutate: addPatient, isPending } = useAddPatientMutation();

 const [inputsValues, setInputsValues] = useState({
   email: "",
   full_name: "",
   age: "",
   allergies: [] as string[],
 });

 const [allergyInput, setAllergyInput] = useState("");

 const addAllergy = () => {
   const allergy = allergyInput.trim();

   if (!allergy || inputsValues.allergies.includes(allergy)) return;

   setInputsValues((prev) => ({
     ...prev,
     allergies: [...prev.allergies, allergy],
   }));

   setAllergyInput("");
 };

 const removeAllergy = (allergyToRemove: string) => {
   setInputsValues((prev) => ({
     ...prev,
     allergies: prev.allergies.filter((allergy) => allergy !== allergyToRemove),
   }));
 };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputsValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputsValues.email || !inputsValues.full_name || !inputsValues.age) {
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

    addPatient(inputsValues);
  };

  return (
    <FormPageContainer className="">
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
        <img
          src="/img1.png"
          alt="Login image 1"
          className="absolute top-[5%] left-[15%]"
        />
        <img
          src="/img2.png"
          alt="Login image 2"
          className="absolute top-[5%] right-[18%]"
        />

        <img
          src="/img3.png"
          alt="Login image 3"
          className="absolute bottom-[-5%] left-[25%]"
        />
        <img
          src="/img4.png"
          alt="Login image 4"
          className="absolute bottom-[-5%] right-[15%]"
        />
      </div>
      <CardSurface className="min-w-[500px] backdrop-blur-lg bg-body_background_secondary/70">
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
              Add new patient
            </Text>

            <div className="flex flex-col gap-5">
              <Input
                name="full_name"
                type="text"
                placeholder="Enter patient name..."
                label="Full name"
                variant="input_modern"
                className="min-w-full"
                onChange={handleInputChange}
                value={inputsValues.full_name}
              />
              <Input
                name="email"
                type="email"
                placeholder="Enter patient email..."
                label="Email"
                variant="input_modern"
                className="min-w-full"
                onChange={handleInputChange}
                value={inputsValues.email}
              />
                <Input
                name="age"
                type="text"
                placeholder="Enter patient age..."
                label="Age"
                variant="input_modern"
                className="min-w-full"
                onChange={handleInputChange}
                value={inputsValues.age}
              />
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Input
                    name="allergies"
                    type="text"
                    label="Allergies"
                    placeholder="Enter allergy..."
                    variant="input_modern"
                    className="flex-1"
                    required={false}

                    value={allergyInput}
                    // @ts-expect-error No implicit any
                    onChange={(e) => setAllergyInput(e.target?.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addAllergy();
                      }
                    }}
                  />

                  <Button
                    type="button"
                    variant="button_modern_primary"
                    onClick={addAllergy}
                  >
                    Add
                  </Button>
                </div>

                {inputsValues.allergies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {inputsValues.allergies.map((allergy) => (
                      <button
                        key={allergy}
                        type="button"
                        onClick={() => removeAllergy(allergy)}
                        className="px-3 py-1 rounded-full border bg-body_background_secondary hover:opacity-80 transition"
                      >
                        {allergy} ✕
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Button
              variant="button_modern_primary"
              className="mt-6 w-full"
              disabled={!inputsValues.email || !inputsValues.full_name || !inputsValues.age}
              loading={isPending}
              type="submit"
            >
              Add Patient
            </Button>
          </CardContent>
        </form>
      </CardSurface>
    </FormPageContainer>
  );
}
