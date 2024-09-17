package com.example.posts.post_params.services;

import com.example.posts.post_params.domain.curiosidades.Post;
import com.example.posts.post_params.domain.curiosidades.PostCategory;
import com.example.posts.post_params.domain.curiosidades.PostDTO;
import com.example.posts.post_params.respositories.PostRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public List<Post> getAllPost(){
        return postRepository.findAll();
    }

    public Post addPost(PostDTO postDTO){

        Post post = new Post();
        BeanUtils.copyProperties(postDTO, post);
        post.setCategory(PostCategory.valueOf(postDTO.category()));
        System.out.println(postDTO.category());
        return postRepository.save(post);
    }

    public Post updatePost(Long id, PostDTO postDTO){
        Post post = postRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Post not found!"));

        BeanUtils.copyProperties(postDTO, post);
        post.setCategory(PostCategory.valueOf(postDTO.category()));
        return postRepository.save(post);
    }

    public String deletePost(Long id){
        Post post = postRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Post not found!"));

        postRepository.delete(post);

        return "Post (" + post.getTitle() + ") deleted!";
    }
}
