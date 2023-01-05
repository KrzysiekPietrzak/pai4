import React, {useEffect, useState} from 'react';

function DetailsPostAuthor({title, content, author, post_id, likes}) {
    const [likesState, setlikesState] = useState(0)
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

    return (
        <div className="post">
            <div className="title">{title}</div>
            <div className="content">{content}</div>
            <div className="likes">
                <div className="author">Autor: {author}</div>
                <div onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        Like();
                    }} className="likes-wrapper">
                    <span className="swords"></span>
                    <span className="likes-amount">{likesState}</span>   
                </div>
            </div>
            <div className="clear"></div>
        </div>
    );
}

export default DetailsPostAuthor;