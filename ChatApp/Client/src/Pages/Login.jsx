export default function Login() {
  return (
    <>
      <h1>Login Form</h1>
      <form>
        <div className="flex justify-between my-6">

          <div className="flex flex-col gap-4">
            <label htmlFor="" className="text-xl my-1">
              FirstName:{" "}
            </label>
            <label htmlFor="" className="text-xl my-1">
              LastName:{" "}
            </label>
            <label htmlFor="" className="text-xl my-1">
              Email:{" "}
            </label>
            <label htmlFor="" className="text-xl my-1">
              Password:{" "}
            </label>
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              className="text-lg border rounded outline-0 px-4 p-1 mx-4"
            />
            <input
              type="text"
              className="text-lg border rounded outline-0 px-4 p-1 mx-4"
            />
            <input
              type="text"
              className="text-lg border rounded outline-0 px-4 p-1 mx-4"
            />
            <input
              type="password"
              className="text-lg border rounded outline-0 px-4 p-1 mx-4"
            />
          </div>

        </div>
        <div className="m-2">
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}
