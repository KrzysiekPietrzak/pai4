import React, {useState} from 'react';

function DetailsPostComments({content, author, comment_id}) {
    const [hide, sethide] = useState(false)
    const deleteComment = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: ''
        };
        fetch('http://localhost:5000/comments/'+comment_id , requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.msg == 'OK') sethide(true)
                console.log(data);
        })
    }
    return (
        <div className={hide == false ? 'comment' : 'delete-hide'}>
            <div className="content">{content}</div>
            <div className="author">Autor: {author}</div>
            <div onClick={(e) => {deleteComment(e)}} className={author == localStorage.getItem('username') ? 'delete-comment' : 'delete-hide'}><button>X</button></div>
        </div>
    );
}

export default DetailsPostComments;