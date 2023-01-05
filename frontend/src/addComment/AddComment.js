import React from 'react';
import { useNavigate, useParams } from "react-router-dom";

function AddComment(props) {
    const navigate = useNavigate();
    let { id } = useParams();

    const AddComment_ = (e) => {
        e.preventDefault();
        const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: localStorage.getItem('id'),
                                       author: localStorage.getItem('username'),
                                       post_id: id,
                                       body: e.target.content.value})
        };
            fetch('http://localhost:5000/comments', requestOptions)
                .then(response => response.json())
                .then(data => {console.log(data)
                    alert('Dodano komentarz!')
                    navigate(-1);
                });
    }
    return (
        <div className="main">
            <div className="main-wrapper">
                <div className="add-panel">
                    <form onSubmit={(e) => AddComment_(e)}>
                        <div className="break"></div>
                        <div>
                            <label className="l_textarea" htmlFor="content">Treść komentarza:</label>
                            <textarea className="comment_area"  type="text" name="content" id="content"/>
                        </div>
                        <input type="submit" value="Dodaj komentarz"/>
                        <div className="clear"></div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddComment;