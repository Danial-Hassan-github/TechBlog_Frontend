import axios from "axios";
import { useState } from "react";
import { json } from "react-router-dom";
import { Button } from "reactstrap";

const AddComment=(props)=>{
    // const [comment,setComment]=useState({});
    const [comment,setComment]=useState({
        post:props.post_id,
        user:props.user_id,
        description:""
    })
    const addComment=(e)=>{
        e.preventDefault()
        let formData=new FormData();
        formData.append("description",comment.description);
        // formData.append("user",comment.user);
        // let user=JSON.stringify(props.user)
        // let post=JSON.stringify(props.post)
        // for(var key in user){
        //     formData.append(key,user[key])
        // }
        // for(var postKey in post){
        //     formData.append(key,post[postKey])
        // }
       // formData.append("user",JSON.parse(user));
       // formData.append("post",JSON.parse(post));
        axios.post(`http://localhost:8080/comments/post/${comment.post.post_id}/user/${comment.user.user_id}`,formData).then((success)=>{
            alert("added")
        },(error)=>{
    
        })
    }
    return(
        <>
        <form onSubmit={addComment}>
                  <div className="input-group">
                      <input
                        placeholder="Add Comment"
                        className="form-control"
                        onChange={(e)=>{setComment({...comment,description:e.target.value})}}
                      />
                      <Button color="primary" type="submit">Add</Button>
                    </div>
                  </form>
        </>
    )
}
export default AddComment;