package com.example.posts.post_params.domain.user;

public enum UserRole {

    ADMIN("admin"),

    GUEST("guest"),

    CUSTOMER("customer");

    private String role;

    UserRole(String role){
        this.role = role;
    }

    String getRole(){
        return this.role;
    }
}
