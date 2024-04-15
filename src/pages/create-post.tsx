import React, { ChangeEvent, FormEvent, useReducer, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'

const CreatePost = () => {
  const [title,setTitle]=useState('')
  const [content,setContent] =useState('')
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/v1/posts", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          content: content
        })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // 成功した場合の処理をここに書く
      router.push("/");
    } catch (error) {
      console.error('投稿に失敗しました', error);
    }
  };
  // const handleSubmit = async (e: FormEvent)=>{
  //   e.preventDefault();
  //   //APIを叩く
  //   try {
  //     await axios.post("http://localhost:3001/api/v1/posts", {
  //       title:title,
  //       content:content,
  //     });
  //     router.push("/");

  //   } catch(error){
  //     alert("Error creating post");
  //     console.error(error);
  //   }
  // };

  return (
   <div className={styles.container}>
      <h1 className={styles.title}>ブログ新規登録</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
       <label className={styles.title}>タイトル</label>
       <input 
         type='text'
         className={styles.input} 
         onChange={(e:ChangeEvent<HTMLInputElement>)=>setTitle(e.target.value)}/>
       <label className={styles.label}>本文</label>
       <textarea 
         className={styles.textarea} 
         onChange={(e:ChangeEvent<HTMLTextAreaElement>)=>setContent(e.target.value)}/>
       <button type='submit' className={styles.button}>
        投稿
       </button>
     </form>
   </div> 
  )
}

export default CreatePost