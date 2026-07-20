import CardSurface from "../shared/card/CardSurface";
import CardContent from "../shared/card/CardContent";
import Text from "../shared/text/Text";
import type { UserType } from "../../types/user.types";


export type PatientCardProps = UserType & {
  className?: string;
};

export default function PatientCard({
  className = "",
  full_name,
  allergies,
  email,
  age,
}: PatientCardProps) {
  return (
    <CardSurface
      className={`!rounded-[20px] !bg-body_accent_secondary relative ${className}`}
    >
      <CardContent variant="card_content_sm" className="!min-w-[500px] gap-4">
        <div className="flex items-center gap-4">
          <img
            src={"/img5.png"}
            alt={full_name}
            className="w-[60px] h-[60px] rounded-full object-cover"
          />

          <div>
            <Text variant="body_lg" className="font-semibold">
              {full_name}
            </Text>
            <Text
              variant="body_sm"
              className="text-body_accent_primary capitalize"
            >
              {"Patient | " + age + " years"} 
            </Text>
          </div>
        </div>

        <div className="flex gap-10">
          <div className="flex flex-col gap-1">
            <Text variant="body_md" className="">
              Email
            </Text>

            <Text variant="body_lg" className="font-semibold">
              {email}
            </Text>
          </div>

          <div className="flex flex-col gap-1">
         
          </div>

          <div className="flex flex-col gap-1">
            <Text variant="body_md" className="">
              Alergies
            </Text>

            {allergies.map((allergy, index) => {
              return (
                <div key={index} className="py-1 px-4 rounded-full bg-body_accent_primary/10">
                  <Text
                    variant="body_sm"
                    className="text-body_accent_primary capitalize"
                  >
                    {allergy}
                  </Text>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </CardSurface>
  );
}
