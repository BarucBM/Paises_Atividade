package com.example.posts.post_params.domain.curiosidades;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "post")
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private PostCategory category;

    @Column(columnDefinition="varchar(10000)")
    private String descriptions;

    @Column(columnDefinition="varchar(10000)")
    private String imageUrl;

    @JsonFormat(pattern="dd/MM/yyyy - HH:mm")
    private LocalDateTime createdAt = LocalDateTime.now();

}
