package com.example.posts.post_params.respositories;

import com.example.posts.post_params.domain.curiosidades.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
