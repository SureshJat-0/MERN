import { useEffect, useState } from "react";

export default function InputComp({
  title,
  id,
  type,
  sendData,
  childInputReset,
}) {
  let [value, setValue] = useState("");
  useEffect(() => {
    sendData(id, value);
  }, [value]);

  useEffect(() => {
    if (childInputReset) {
      setValue("");
    }
  }, [childInputReset]);

  return (
    <div>
      <label htmlFor={id} className="text-lg m-2">
        {title} :{" "}
      </label>{" "}
      <br />
      <input
        name={id}
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        placeholder={title}
        className="rounded-sm outline-none p-2 m-2 w-[25vw]"
      />
    </div>
  );
}
