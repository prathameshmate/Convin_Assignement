import React, { useEffect, useState } from 'react';
import "./Style.css"


const App = () => {

    const [arr, updateArr] = useState([]);
    const [toggle, updateToggle] = useState(true);
    const [ans1, updateAns1] = useState(true);

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const Response = await fetch("https://reqres.in/api/users");
                const result = await Response.json();
                updateArr(result.data)

                updateAns1(false);
            }
            catch (err) {
                alert("Error while fetching API ; " + err);
            }
        }
        fetchAPI();

    }, [])

    const singleUser = async (id) => {
        try {

            const Response = await fetch(`https://reqres.in/api/users/${id}`);
            const result = await Response.json();

            updateToggle(false);

            const nameAccess = document.getElementById("name");
            const user_Info = document.getElementsByClassName("user_Info");
            const imgAccess = document.getElementById("img");
            imgAccess.src = result.data.avatar;
            nameAccess.innerText = `${result.data.first_name} ${result.data.last_name}`
            user_Info[0].innerText = result.data.id;
            user_Info[1].innerText = result.data.first_name;
            user_Info[2].innerText = result.data.last_name;
            user_Info[3].innerText = result.data.email;
        }
        catch (err) {
            alert("Error while fetching API ; " + err);
        }
    }

    return (
        <>
            <div className='container'>

                <div className='container_div'>
                    {
                        (toggle === true) ?

                            <div id='starting_Content'>
                                {
                                    (ans1 === true) ? <h2>API request is in progress...</h2> : <h2>Please Click On Any Button</h2>
                                }
                            </div>

                            :

                            <div id='card' >
                                <div>
                                    <h2>Name =  <span id='name'></span> </h2>
                                </div>
                                <div>
                                    <h2>User Info :- </h2>
                                    <div className='img_Info'>
                                        <div className='img_Container'>
                                            <img id='img' alt="avtar.jpg" />
                                        </div>
                                        <div id='user_Info'>
                                            <h3>User ID :- <span className='user_Info'></span> </h3>
                                            <h3>First Name :- <span className='user_Info'></span> </h3>
                                            <h3>Last Name :- <span className='user_Info'></span> </h3>
                                            <h3>Email :- <span className='user_Info'></span> </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }


                    <div className='btns'>
                        {
                            arr.map((element, index) => {
                                return (
                                    <button className='btn' key={index} onClick={() => { return singleUser(element.id) }}  > {element.id}</button>
                                );

                            })
                        }

                    </div>
                </div>
            </div>
        </>
    );
}
export default App;