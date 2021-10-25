package com.example.demo.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Setter
@Getter
@Entity
public class InformationSessionModel {

    @Id
    @GeneratedValue
    private Long id;

    private String kName;

    private String industry;

    private String day;

    private String contents;

    private String place;

    private String deadline;

    private String URL;

    private String explanation;

    private String tempfile;


}
