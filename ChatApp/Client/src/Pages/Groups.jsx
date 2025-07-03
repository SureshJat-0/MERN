import { Link } from "react-router-dom"

export default function Groups() {
    return(
        <div className="flex flex-col w-[25vw] min-h-screen text-center p-4 sticky top-0 bg-zinc-800">
            <h1 className="m-1 text-left">Groups</h1>
            <hr />
            <div className="groups mt-4">

                <div className="group rounded-lg py-2 px-4 text-left hover:bg-zinc-700 cursor-pointer">
                    General
                </div>
                <div className="group rounded-lg py-2 px-4 text-left hover:bg-zinc-700 cursor-pointer">
                    Random
                </div>
                <div className="group rounded-lg py-2 px-4 text-left hover:bg-zinc-700 cursor-pointer">
                    Private
                </div>
            </div>
            <div className="mt-auto text-xl mb-4">
                <Link to='/login' className="mx-4">Login</Link>
                <Link to='/signup' className="mx-4">Signup</Link>
            </div>
        </div>
    )
}