package com.example.posts.post_params.domain.user;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.dialect.unique.CreateTableUniqueDelegate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import java.util.Collection;
import java.util.List;

@Setter
@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    private Integer age;

    private String login;

    private String password;

    private UserRole role;




    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {


        if(this.role == UserRole.ADMIN) {

            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"),
                    new SimpleGrantedAuthority("ROLE_DOCTOR"),
                    new SimpleGrantedAuthority("ROLE_RECEPTIONIST"),
                    new SimpleGrantedAuthority("ROLE_PATIENT"));

        }else if (this.role == UserRole.GUEST){

            return List.of(new SimpleGrantedAuthority("ROLE_DOCTOR"),
                    new SimpleGrantedAuthority("ROLE_RECEPTIONIST"),
                    new SimpleGrantedAuthority("ROLE_PATIENT"));

        }else{

            return List.of(new SimpleGrantedAuthority("ROLE_PATIENT"));

        }
    }



    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public User(String login, String password, UserRole role) {
        this.login = login;
        this.password = password;
        this.role = role;
    }
}
