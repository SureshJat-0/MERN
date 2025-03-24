import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Aside() {

    let [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/data')
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    }, []);

    return(
        <div className="w-[15vw] h-8 min-h-screen text-white">

            {/* {data.map((post, ind) => {
                return <div key={ind}>
                    <h2>{post.id}</h2>
                    <p>{post.content}</p>
                </div>
            })} */}
        </div>
    );
}