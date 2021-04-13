import React, { useEffect, useState, useCallback } from 'react';

import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

import { loadPosts } from '../../utils/load-post';

import './styles.css'; 

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setallPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(6);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = searchValue 
  ? allPosts.filter(post => {
    return post.title.toLowerCase().includes(searchValue.toLowerCase())
  }) 
  : posts;
  
  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setallPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts)

    setPosts(posts);
    setPage(nextPage);

  }

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  }

  return (
    <section className="container">
      
      <div className="search-container">
        {!!searchValue && (
          <React.Fragment>
            <h3>Pesquisa: { searchValue }</h3>
          </React.Fragment>
        )}

        <TextInput 
          searchValue={searchValue} 
          handleChange={handleChange} 
        />
      </div>

      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}

      {filteredPosts.length === 0 && (
        <p>Whoops: não existe posts no momento! 😭</p>
      )}
      
      <div className="button-container">
       {!searchValue && (
          <Button 
            text='Carregar mais'
            onClickPosts={loadMorePosts} 
            disabled={noMorePosts}
          />
       )}
      </div>
    </section>
  )
} 