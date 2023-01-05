import React, { useState, useEffect } from 'react';

function Post({author, title, likes, post_id}) {
    const [likesState, setlikesState] = useState(0)
    const [hide, sethide] = useState(false)
    const [state, setstate] = useState(false)
    useEffect(() => {
        setlikesState(likes);
    }, [])

    const Like = () => {
        if(state == false) {
            setstate(true);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ post_id: post_id, user_id: localStorage.getItem('id')})
            };
            fetch('http://localhost:5000/post_likes', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if(data.msg == 1) {
                        setlikesState(likesState+1);
                    } else {
                        setlikesState(likesState-1);
                    }
                    setstate(false);
                })
        }
    }

    const deletePost = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: ''
        };
        fetch('http://localhost:5000/posts/' + post_id, requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.msg == 'OK') sethide(true)
                console.log(data);
        })
    }

    return (
        <div className={hide == false ? "post" : "delete-hide"}>
            <div className="author">Autor: {author}</div>
            <div className="title">{title}</div>
            <div className="likes">
                <div onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        Like();
                    }} className="likes-wrapper">
                    <span className="swords"></span>
                    <span className="likes-amount">{likesState}</span>   
                </div>
            </div>
            <div onClick={(e) => {deletePost(e)}} className={author == localStorage.getItem('username') ? 'delete' : 'delete-hide'}><button>Usuń</button></div>
            <div className="clear"></div>
        </div>
    );
}
    
export default Post;