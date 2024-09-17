package com.example.posts.post_params.domain.curiosidades;

import com.fasterxml.jackson.annotation.JsonValue;

public enum PostCategory {
    CURIOSITY("CURIOSITY"),
    SPORTS("SPORTS"),
    CULTURE("CULTURE");


    private String category;

    PostCategory(String name){
        this.category = name;
    }

    @JsonValue
    String getRole(){
        return this.category;
    }
}
