import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { FaArrowDown } from "react-icons/fa6";

export default function DaysOfWeek({
  getDaysOfWeek,
  setDaysOfWeek,
}: {
  getDaysOfWeek: () => string;
  setDaysOfWeek: (days: string) => void;
}) {
  const [newDays, setNewDays] = useState<string[]>(getDaysOfWeek().split(","));

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center gap-2 rounded-md border border-border p-2">
          <p className="text-sm">Select Days </p>
          <FaArrowDown className="text-md" />{" "}
        </div>
      </PopoverTrigger>
      <PopoverContent>
        {"sun,mon,tue,wed,thu,fri,sat".split(",").map((day, index) => {
          return (
            <div key={day} className="flex items-center gap-2">
              <Checkbox
                id={day}
                defaultChecked={newDays.includes(day)}
                onCheckedChange={() => {
                  let newDaysUpdated: string[];
                  if (newDays.includes(day)) {
                    newDaysUpdated = newDays.filter((newDay) => newDay !== day);
                    setNewDays(newDaysUpdated);
                  } else {
                    newDaysUpdated = [...newDays, day];
                    setNewDays([...newDays, day]);
                  }
                  setDaysOfWeek(newDaysUpdated.join());
                }}
              />
              <label htmlFor={day} className="capitalize">
                {day}
              </label>
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
