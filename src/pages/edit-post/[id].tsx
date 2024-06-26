import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from '../../styles/Home.module.css'
// import axios from 'axios'
import { useRouter } from 'next/router'
import {Post} from '@/types'

type Props ={
   post:Post;
}

export async function getServerSideProps(context:any): Promise<{props: {post: Post}}> {
   const id = context.params.id
   const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`)
   const post = await res.json();
   
   return {
      props: {
         post,
      }
   }
}

const EditPost = ({post}:Props) => {
  const [title,setTitle]=useState(post.title)
  const [content,setContent] =useState(post.content)
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/v1/posts/${post.id}`, {
        method: 'PUT',
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
      console.error('編集に失敗しました', error);
    }
  };
  
  return (
   <div className={styles.container}>
      <h1 className={styles.title}>ブログ編集</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
       <label className={styles.title}>タイトル</label>
       <input 
         type='text'
         className={styles.input} 
         onChange={(e:ChangeEvent<HTMLInputElement>)=>setTitle(e.target.value)}
         value={title}/>
       <label className={styles.label}>本文</label>
       <textarea 
         className={styles.textarea} 
         onChange={(e:ChangeEvent<HTMLTextAreaElement>)=>setContent(e.target.value)}
         value={content}/>
         
       <button type='submit' className={styles.button}>
        編集
       </button>
     </form>
   </div> 
  )
}

export default EditPost