import Head from "next/head";
import { Post } from "@/types"; 
import Link from "next/link";
import Styles from '../styles/Home.module.css'
import { useRouter } from "next/router";
import React, {useState} from "react";

type Props = {
  posts:Post[]
};


export async function getStaticProps() {
  const res= await fetch("http://localhost:3001/api/v1/posts")
  const posts = await res.json();
  
  console.log(posts)
  return {
    props:{
      posts,
    },
    revalidate:60*60*24,
  }
} 

export default function Home({ posts :initialPosts}: Props) {
  const [posts, setPosts] = useState(initialPosts); // postsの状態を管理
  const router = useRouter();

  const handleDelete = async (postId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/posts/${postId}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error('削除に失敗しました');
      }
  
      // レスポンスが成功した場合、フロントエンドの状態を更新
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  
      // 成功メッセージを表示またはログに記録
      console.log('削除成功');
    } catch (err) {
      // エラーメッセージを表示
      alert('失敗しました: ' + (err as Error).message);
    }
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create-next-app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={Styles.homeContainer}>
        <h1>Rails & Next.js Project</h1>
        <Link href="/create-post" className={Styles.createButton}>
          Create New Post
        </Link>

        <div>
          {posts.map((post: Post) => (
            <div key={post.id} className={Styles.postCard}>
              <Link href={`posts/${post.id}`} className={Styles.PostCardBox}>
                <h2>{post.title}</h2>
              </Link>
              <p>{post.content}</p>
              <Link href={`/edit-post/${post.id}`}>
                <button className={Styles.editButton}>Edit</button>
              </Link>
              <button className={Styles.deleteButton} onClick={() => handleDelete(post.id)}>削除</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}