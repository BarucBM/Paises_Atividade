package com.example.posts.post_params.controllers;


import com.example.posts.post_params.domain.curiosidades.Post;
import com.example.posts.post_params.domain.curiosidades.PostDTO;
import com.example.posts.post_params.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/post")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping
    public ResponseEntity<List<Post>> getAllPost() {
        return ResponseEntity.status(HttpStatus.OK).body(postService.getAllPost());
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody PostDTO postDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(postService.addPost(postDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody PostDTO postDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(postService.updatePost(id, postDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(postService.deletePost(id));
    }
}
