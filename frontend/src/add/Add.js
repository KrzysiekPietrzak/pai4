import React from 'react';
import { useNavigate } from "react-router-dom";

function Add(props) {
    const navigate = useNavigate();

    const AddPost = (e) => {
        e.preventDefault();
        const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: localStorage.getItem('id'),
                                       title: e.target.title.value, 
                                       body: e.target.content.value})
        };
            fetch('http://localhost:5000/posts', requestOptions)
                .then(response => response.json())
                .then(data => {console.log(data)
                    alert('Dodano post!')
                    navigate('/');
                });
    }
    return (
        <div className="main">
            <div className="main-wrapper">
                <div className="add-panel">
                    <form onSubmit={(e) => AddPost(e)}>
                        <div>
                            <label htmlFor="title">Tytuł postu:</label>
                            <input type="text" name="title" id="title"/>
                        </div>
                        <div>
                            <label className="l_textarea" htmlFor="content">Treść:</label>
                            <textarea type="text" name="content" id="content"/>
                        </div>
                        <input type="submit" value="Dodaj post"/>
                        <div className="clear"></div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Add;