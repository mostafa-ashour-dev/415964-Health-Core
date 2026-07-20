import { useState } from "react";
import CardContent from "../shared/card/CardContent";
import CardSurface from "../shared/card/CardSurface";
import FormPageContainer from "../shared/forms/FormPageContainer";
import Input from "../shared/forms/Input";
import Text from "../shared/text/Text";
import Button from "../shared/clickables/Button";
import Swal from "sweetalert2";
import { useLoginMutation } from "../../queries/mutations/useLoginMutation";

export default function LoginPage() {
  const { mutate: login, isPending } = useLoginMutation();

  const [inputsValues, setInputsValues] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputsValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputsValues.email || !inputsValues.password) {
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

    login(inputsValues);
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
              Login to dashboard
            </Text>

            <div className="flex flex-col gap-5">
              <Input
                name="email"
                type="email"
                placeholder="Enter your email..."
                label="Email"
                variant="input_modern"
                className="min-w-full"
                onChange={handleInputChange}
                value={inputsValues.email}
              />

              <Input
                name="password"
                type="password"
                placeholder="Enter your password..."
                label="Password"
                variant="input_modern"
                className="min-w-full"
                onChange={handleInputChange}
                value={inputsValues.password}
              />
            </div>

            <Button
              variant="button_modern_primary"
              className="mt-6 w-full"
              disabled={!inputsValues.email || !inputsValues.password}
              loading={isPending}
              type="submit"
            >
              Login
            </Button>
          </CardContent>
        </form>
      </CardSurface>
    </FormPageContainer>
  );
}
